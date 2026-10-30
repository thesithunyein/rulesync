import { env } from "@/lib/env.server";

const NAMESPACE = env("MEMWAL_NAMESPACE") ?? "rulesync";
const RELAYER = env("MEMWAL_SERVER_URL") ?? "https://relayer.memory.walrus.xyz";
const TATUM = "https://sui-mainnet.gateway.tatum.io/graphql";

export type ChainStatus = {
  walrus: boolean;
  tatum: boolean;
  accountId: string | null;
  memories: number;
  suiAddress: string | null;
};

function walrusReady(): boolean {
  return Boolean(env("MEMWAL_PRIVATE_KEY") && env("MEMWAL_ACCOUNT_ID"));
}

async function client() {
  const { MemWal } = await import("@mysten-incubation/memwal");
  return MemWal.create({
    key: env("MEMWAL_PRIVATE_KEY") ?? "",
    accountId: env("MEMWAL_ACCOUNT_ID") ?? "",
    serverUrl: RELAYER,
    namespace: NAMESPACE,
  });
}

export async function chainStatus(): Promise<ChainStatus> {
  const raw = env("SUI_ADDRESS") ?? "";
  const base = {
    tatum: Boolean(env("TATUM_API_KEY")),
    accountId: env("MEMWAL_ACCOUNT_ID") ?? null,
    suiAddress: /^0x[a-fA-F0-9]{64}$/.test(raw) ? raw : null,
  };
  if (!walrusReady()) return { walrus: false, memories: 0, ...base };
  try {
    const mem = await client();
    const page = await mem.listNamespaces();
    const row = page.namespaces.find((ns) => ns.name === NAMESPACE);
    return { walrus: true, memories: row?.memory_count ?? 0, ...base };
  } catch {
    return { walrus: true, memories: 0, ...base };
  }
}

export async function rememberLines(texts: string[]): Promise<{ ok: boolean; wrote: number; error?: string }> {
  if (!walrusReady()) return { ok: false, wrote: 0, error: "Walrus is not configured" };
  const batch = texts.map((t) => t.trim()).filter((t) => t.length > 0 && t.length <= 2000).slice(0, 20);
  if (batch.length === 0) return { ok: false, wrote: 0, error: "Nothing to write" };
  try {
    const mem = await client();
    const done = await mem.rememberBulkAndWait(
      batch.map((text) => ({ text })),
      { timeoutMs: 90_000, idempotencyKey: `rulesync-${batch.length}-${batch[0]?.slice(0, 48)}` },
    );
    const wrote = done.results.filter((r) => r.status === "done").length;
    return { ok: wrote > 0, wrote, error: wrote === 0 ? "Mainnet write failed" : undefined };
  } catch (err) {
    return { ok: false, wrote: 0, error: err instanceof Error ? err.message : "Mainnet write failed" };
  }
}

export async function recallLines(): Promise<{ ok: boolean; lines: string[]; error?: string }> {
  if (!walrusReady()) return { ok: false, lines: [], error: "Walrus is not configured" };
  try {
    const mem = await client();
    const result = await mem.recall({
      query: "RuleSync house spend adopted rule groceries",
      limit: 40,
      namespace: NAMESPACE,
    });
    return { ok: true, lines: result.results.map((hit) => hit.text).filter(Boolean) };
  } catch (err) {
    return { ok: false, lines: [], error: err instanceof Error ? err.message : "Recall failed" };
  }
}

export type SuiRead = {
  ok: boolean;
  balance?: number;
  transfers?: { digest: string; at: string; amount: number }[];
  error?: string;
};

type GqlTx = {
  digest?: string;
  effects?: {
    timestamp?: string;
    balanceChanges?: { nodes?: { amount?: string }[] };
  };
};

export async function readSuiAddress(address: string): Promise<SuiRead> {
  const key = env("TATUM_API_KEY");
  if (!key) return { ok: false, error: "Tatum is not configured" };
  const query = `query($a: SuiAddress!) {
    address(address: $a) {
      balance(coinType: "0x2::sui::SUI") { totalBalance }
      transactions(first: 8, filter: { sentAddress: $a }) {
        nodes { digest effects { timestamp balanceChanges { nodes { amount } } } }
      }
    }
  }`;
  try {
    const res = await fetch(TATUM, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key },
      body: JSON.stringify({ query, variables: { a: address } }),
    });
    if (!res.ok) throw new Error(`Tatum ${res.status}`);
    const json = (await res.json()) as {
      data?: {
        address?: {
          balance?: { totalBalance?: string };
          transactions?: { nodes?: GqlTx[] };
        };
      };
      errors?: { message?: string }[];
    };
    if (json.errors?.length) throw new Error(json.errors[0]?.message ?? "Tatum query failed");
    const row = json.data?.address;
    const transfers = (row?.transactions?.nodes ?? []).flatMap((tx) => {
      const spent = (tx.effects?.balanceChanges?.nodes ?? [])
        .map((n) => Number(n.amount ?? "0"))
        .filter((n) => n < 0);
      if (!tx.digest || spent.length === 0) return [];
      return [
        {
          digest: tx.digest,
          at: tx.effects?.timestamp ?? new Date().toISOString(),
          amount: Math.abs(spent[0]) / 1e9,
        },
      ];
    });
    return {
      ok: true,
      balance: Number(row?.balance?.totalBalance ?? "0") / 1e9,
      transfers,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Tatum query failed" };
  }
}
