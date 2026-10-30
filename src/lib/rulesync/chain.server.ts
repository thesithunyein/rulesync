import { env } from "@/lib/env.server";

const NAMESPACE = env("MEMWAL_NAMESPACE") ?? "rulesync";
const RELAYER = env("MEMWAL_SERVER_URL") ?? "https://relayer.memory.walrus.xyz";
const TATUM = "https://sui-mainnet.gateway.tatum.io";

export type ChainStatus = {
  walrus: boolean;
  tatum: boolean;
  accountId: string | null;
  memories: number;
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
  const tatum = Boolean(env("TATUM_API_KEY"));
  const accountId = env("MEMWAL_ACCOUNT_ID") ?? null;
  if (!walrusReady()) return { walrus: false, tatum, accountId, memories: 0 };
  try {
    const mem = await client();
    const page = await mem.listNamespaces();
    const row = page.namespaces.find((ns) => ns.name === NAMESPACE);
    return { walrus: true, tatum, accountId, memories: row?.memory_count ?? 0 };
  } catch {
    return { walrus: true, tatum, accountId, memories: 0 };
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

type BalanceChange = {
  owner?: { AddressOwner?: string } | string;
  coinType?: string;
  amount?: string;
};

type TxBlock = {
  digest?: string;
  timestampMs?: string;
  balanceChanges?: BalanceChange[];
};

function ownerAddress(owner: BalanceChange["owner"]): string {
  if (!owner) return "";
  if (typeof owner === "string") return owner.toLowerCase();
  return (owner.AddressOwner ?? "").toLowerCase();
}

export type SuiRead = {
  ok: boolean;
  balance?: number;
  transfers?: { digest: string; at: string; amount: number }[];
  error?: string;
};

export async function readSuiAddress(address: string): Promise<SuiRead> {
  const key = env("TATUM_API_KEY");
  if (!key) return { ok: false, error: "Tatum is not configured" };
  const rpc = async (method: string, params: unknown): Promise<unknown> => {
    const res = await fetch(TATUM, {
      method: "POST",
      headers: { "content-type": "application/json", "gateway-api-key": key },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    });
    if (!res.ok) throw new Error(`Tatum ${res.status}`);
    const json = (await res.json()) as { result?: unknown; error?: { message?: string } };
    if (json.error) throw new Error(json.error.message ?? "Tatum RPC failed");
    return json.result;
  };
  try {
    const balance = (await rpc("suix_getBalance", [address])) as { totalBalance?: string };
    const history = (await rpc("suix_queryTransactionBlocks", [
      { filter: { FromAddress: address }, options: { showBalanceChanges: true } },
      null,
      12,
      true,
    ])) as { data?: TxBlock[] };
    const want = address.toLowerCase();
    const transfers = (history.data ?? []).flatMap((tx) => {
      const change = (tx.balanceChanges ?? []).find((row) => {
        const coin = row.coinType ?? "";
        const amount = Number(row.amount ?? "0");
        return ownerAddress(row.owner) === want && coin.endsWith("::sui::SUI") && amount < 0;
      });
      if (!change || !tx.digest) return [];
      return [
        {
          digest: tx.digest,
          at: tx.timestampMs ? new Date(Number(tx.timestampMs)).toISOString() : new Date().toISOString(),
          amount: Math.abs(Number(change.amount)) / 1e9,
        },
      ];
    });
    return {
      ok: true,
      balance: Number(balance.totalBalance ?? "0") / 1e9,
      transfers,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Tatum RPC failed" };
  }
}
