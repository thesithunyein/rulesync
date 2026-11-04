import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowMark,
  BrandMark,
  CategoryGlyph,
  CheckMark,
  ExportMark,
  HomeMark,
  PairMark,
  PersonMark,
  PlusMark,
  ResetMark,
  RuleGlyph,
  RulesMark,
} from "@/components/rulesync/marks";
import { SEED } from "@/lib/rulesync/seed";
import {
  getChainStatus,
  listMemories,
  readSui,
  recallHouse,
  rememberLines,
  type ChainStatus,
  type SuiTransfer,
} from "@/lib/rulesync/chain";
import { adoptMemory, decodeMemory, houseMemory, restoreFromLines, spendMemory } from "@/lib/rulesync/memory";
import { buildMemories, headline, judgeSpend, learnUpTo } from "@/lib/rulesync/engine";
import {
  CATEGORIES,
  DEFAULT_STATED,
  categoryLabel,
  isAdopted,
  money,
  weekdayFromDate,
  weekOf,
  type Category,
  type Decision,
  type Household,
  type LearnedRule,
  type StatedRules,
  type Verdict,
} from "@/lib/rulesync/types";

const STORAGE_KEY = "rulesync-v2";
const SAMPLE_START = new Date(Date.UTC(2026, 8, 7, 12)).toISOString();

type Saved = {
  house: Household | null;
  stated: StatedRules;
  decisions: Decision[];
};

type ImportDraft = { id: string; amount: number; merchant: string; at: string };

function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Saved;
    if (!parsed || !("house" in parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function todayInput(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function RuleSyncApp() {
  const [house, setHouse] = useState<Household | null>(null);
  const [stated, setStated] = useState<StatedRules>(DEFAULT_STATED);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [view, setView] = useState<"home" | "rules">("home");
  const [logging, setLogging] = useState(false);
  const [chain, setChain] = useState<ChainStatus | null>(null);
  const [chainNote, setChainNote] = useState("");
  const [suiAddress, setSuiAddress] = useState("");
  const [suiBalance, setSuiBalance] = useState<number | null>(null);
  const [suiTransfers, setSuiTransfers] = useState<SuiTransfer[]>([]);
  const [suiError, setSuiError] = useState("");
  const [draft, setDraft] = useState<ImportDraft | null>(null);
  const houseRef = useRef<Household | null>(null);
  const chainRef = useRef<ChainStatus | null>(null);

  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setHouse(saved.house);
      setStated({ ...DEFAULT_STATED, ...saved.stated, caps: saved.stated?.caps ?? {} });
      setDecisions(saved.decisions ?? []);
    } else {
      setRestoring(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    houseRef.current = house;
    chainRef.current = chain;
  }, [house, chain]);

  useEffect(() => {
    let cancel = false;
    const giveUp = window.setTimeout(() => {
      if (!cancel) setRestoring(false);
    }, 20_000);
    void (async () => {
      try {
        const status = await getChainStatus();
        if (cancel) return;
        setChain(status);
        if (status.suiAddress) setSuiAddress(status.suiAddress);
        if (status.tatum && status.suiAddress) {
          const result = await readSui({ data: { address: status.suiAddress } });
          if (!cancel) {
            if (!result.ok || result.balance == null) {
              setSuiError(result.error ?? "Tatum could not read that address");
            } else {
              setSuiBalance(result.balance);
              setSuiTransfers(result.transfers ?? []);
            }
          }
        }
        if (!status.walrus || houseRef.current) {
          if (!cancel) setRestoring(false);
          return;
        }
        const recalled = await recallHouse();
        if (cancel) return;
        setRestoring(false);
        if (!recalled.ok || houseRef.current) return;
        const restored = restoreFromLines(recalled.lines);
        if (!restored) return;
        setHouse(restored.house);
        setStated(restored.stated);
        setDecisions(restored.decisions);
        setChainNote(`Restored ${restored.house.name} from Walrus`);
      } catch {
        if (!cancel) {
          setChainNote("");
          setRestoring(false);
        }
      } finally {
        window.clearTimeout(giveUp);
      }
    })();
    return () => {
      cancel = true;
      window.clearTimeout(giveUp);
    };
  }, []);

  function publish(texts: string[]) {
    if (texts.length === 0) return;
    void (async () => {
      let ready = chainRef.current?.walrus ?? false;
      if (!chainRef.current) {
        const status = await getChainStatus();
        chainRef.current = status;
        setChain(status);
        ready = status.walrus;
      }
      if (!ready) return;
      let wrote = 0;
      for (let i = 0; i < texts.length; i += 15) {
        const chunk = texts.slice(i, i + 15);
        const result = await rememberLines({ data: { texts: chunk } });
        if (!result.ok) {
          console.warn("RuleSync memory write failed", result.error);
          setChainNote("Mainnet write did not go through");
          return;
        }
        wrote += result.wrote;
      }
      const status = await getChainStatus();
      setChain(status);
      setChainNote(wrote > 0 ? `${wrote} on Mainnet` : "");
    })().catch(() => setChainNote("Mainnet write did not go through"));
  }

  useEffect(() => {
    if (!hydrated) return;
    const payload: Saved = { house, stated, decisions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [house, stated, decisions, hydrated]);

  const week = decisions.reduce((m, d) => Math.max(m, d.week), 1);
  const rules = useMemo(() => learnUpTo(decisions, week, stated), [decisions, week, stated]);
  const spent = decisions.reduce((a, d) => a + d.amount, 0);
  const line = headline(rules, stated);
  const lead = rules.find((r) => r.kind === "solo_cap" && !isAdopted(r, stated)) ?? null;

  function openHouse(next: Household, nextStated: StatedRules, nextDecisions: Decision[]) {
    setHouse(next);
    setStated(nextStated);
    setDecisions(nextDecisions);
    setView("home");
    setLogging(false);
    const onChain = chainRef.current;
    if (next.sample) {
      if (onChain?.walrus && onChain.memories === 0) {
        publish([houseMemory(next, nextStated), ...nextDecisions.map(spendMemory)]);
      }
      return;
    }
    publish([houseMemory(next, nextStated)]);
  }

  function adopt(rule: LearnedRule) {
    if (isAdopted(rule, stated)) return;
    setStated((s) => {
      if (rule.kind === "solo_cap" && rule.category && rule.cap != null) {
        return { ...s, caps: { ...s.caps, [rule.category]: rule.cap } };
      }
      if (rule.kind === "never_discussed") return { ...s, silenceUnder: true };
      if (rule.kind === "false_dual") return { ...s, treatFastDualAsSingle: true };
      if (rule.kind === "rhythm") return { ...s, rhythms: [...s.rhythms, rule.id] };
      if (rule.kind === "allowance") return { ...s, allowances: [...s.allowances, rule.id] };
      return s;
    });
    publish([adoptMemory(rule)]);
  }

  function addDecision(next: Decision) {
    setDecisions((prev) => [...prev, next]);
    setLogging(false);
    setDraft(null);
    setView("home");
    publish([spendMemory(next)]);
  }

  function importTransfer(tx: SuiTransfer) {
    const id = `sui-${tx.digest}`;
    if (decisions.some((d) => d.id === id)) return;
    setDraft({
      id,
      amount: Math.round(tx.amount * 1e6) / 1e6,
      merchant: `Sui send ${tx.digest.slice(0, 6)}`,
      at: tx.at,
    });
    setLogging(true);
  }

  function startOver() {
    localStorage.removeItem(STORAGE_KEY);
    setHouse(null);
    setStated(DEFAULT_STATED);
    setDecisions([]);
    setView("home");
    setLogging(false);
  }

  function exportFile() {
    if (!house) return;
    const memories = buildMemories(decisions, house.name, stated, rules);
    const blob = new Blob(
      [JSON.stringify({ house, stated, decisions, rules, memories }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rulesync.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!hydrated) {
    return <main className="min-h-screen bg-paper" />;
  }

  if (!house && restoring) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <p className="rise font-display text-2xl text-mist">Waking the house from Walrus…</p>
      </main>
    );
  }

  if (!house) {
    return (
      <Setup
        wallet={
          suiBalance != null
            ? `${suiBalance.toLocaleString(undefined, { maximumFractionDigits: 4 })} SUI on this wallet`
            : suiError
        }
        onStart={(name, members, solo, dual) =>
          openHouse(
            { name, members, startedAt: new Date().toISOString(), sample: false },
            { ...DEFAULT_STATED, soloLimit: solo, dualAbove: dual },
            [],
          )
        }
        onSample={() =>
          openHouse(
            {
              name: "Ash House",
              members: ["Alex", "Sam", "Max"],
              startedAt: SAMPLE_START,
              sample: true,
            },
            { ...DEFAULT_STATED, soloLimit: 18, dualAbove: 100 },
            SEED.map((d) => ({ ...d })),
          )
        }
      />
    );
  }

  const recent = [...decisions].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
  const importedDigests = decisions.filter((d) => d.id.startsWith("sui-")).map((d) => d.id.slice(4));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-5 pb-28 pt-8 sm:px-6">
        <header className="rise flex items-center justify-between">
          <p className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-base tracking-tight text-ink">RuleSync</span>
          </p>
          <button
            type="button"
            onClick={() => setView(view === "home" ? "rules" : "home")}
            className="press inline-flex min-h-11 items-center gap-2 text-sm text-ink"
          >
            {view === "home" ? <RulesMark /> : <HomeMark />}
            {view === "home" ? "Rules" : "Home"}
          </button>
        </header>

        {view === "home" ? (
          <section className="mt-10 flex flex-1 flex-col">
            <p className="rise text-sm text-mist" style={{ animationDelay: "80ms" }}>
              {house.name}
              {house.sample ? " · sample" : ""}
            </p>
            <h1
              className="rise mt-3 font-display text-6xl leading-none tracking-tight sm:text-7xl"
              style={{ animationDelay: "140ms" }}
            >
              <Count value={spent} />
            </h1>
            <p className="rise mt-3 text-sm text-mist" style={{ animationDelay: "200ms" }}>
              {decisions.length === 0
                ? "Nothing logged yet."
                : `${decisions.length} spends · floor ${money(stated.soloLimit)} · two names over ${money(stated.dualAbove)}`}
              {chain?.walrus
                ? ` · Mainnet ${chain.memories}`
                : ""}
              {chainNote ? ` · ${chainNote}` : ""}
              {suiBalance != null ? ` · ${suiBalance.toLocaleString(undefined, { maximumFractionDigits: 4 })} SUI` : ""}
            </p>

            <div className="rise mt-10" style={{ animationDelay: "280ms" }}>
              {decisions.length === 0 ? (
                <p className="font-display text-3xl leading-tight">
                  Log a few spends. A rule appears once the house repeats itself.
                </p>
              ) : line ? (
                <button
                  type="button"
                  onClick={() => (lead ? adopt(lead) : setView("rules"))}
                  className="press w-full rounded-3xl bg-ink px-5 py-6 text-left text-paper"
                >
                  <p className="font-display text-2xl leading-snug">{line}</p>
                  <p className="mt-3 text-sm text-paper/70">
                    {lead && !isAdopted(lead, stated) ? "Adopt this" : "See the rules"}
                  </p>
                </button>
              ) : (
                <p className="font-display text-3xl leading-tight">The written rules and the lived ones match.</p>
              )}
            </div>

            {recent.length > 0 && (
              <ul className="mt-10 divide-y divide-line">
                {recent.map((d, i) => (
                  <li
                    key={d.id}
                    className="rise flex items-center justify-between gap-4 py-3"
                    style={{ animationDelay: `${360 + i * 60}ms` }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-panel-2 text-ink">
                        <CategoryGlyph id={d.category} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate">{d.merchant}</p>
                        <p className="text-sm text-mist">
                          {d.member} · {categoryLabel(d.category)}
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 tabular-nums">{money(d.amount)}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <RulesView
            stated={stated}
            rules={rules}
            onAdopt={adopt}
            onExport={exportFile}
            onReset={startOver}
            walrus={Boolean(chain?.walrus)}
            tatum={Boolean(chain?.tatum)}
            accountId={chain?.accountId ?? null}
            memories={chain?.memories ?? 0}
            onWrite={() =>
              publish([
                house ? houseMemory(house, stated) : "",
                ...decisions.map(spendMemory),
                ...rules.filter((rule) => isAdopted(rule, stated)).map(adoptMemory),
              ].filter(Boolean))
            }
            suiAddress={suiAddress}
            onSuiAddress={setSuiAddress}
            suiBalance={suiBalance}
            suiTransfers={suiTransfers}
            suiError={suiError}
            importedDigests={importedDigests}
            onImport={importTransfer}
            onReadSui={() => {
              setSuiError("");
              void readSui({ data: { address: suiAddress.trim() } })
                .then((result) => {
                  if (!result.ok || result.balance == null) {
                    setSuiBalance(null);
                    setSuiTransfers([]);
                    setSuiError(result.error ?? "Tatum could not read that address");
                    return;
                  }
                  setSuiBalance(result.balance);
                  setSuiTransfers(result.transfers ?? []);
                })
                .catch(() => setSuiError("Tatum could not read that address"));
            }}
          />
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-paper via-paper to-transparent px-5 pt-8 pb-6">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={() => {
              setDraft(null);
              setLogging(true);
            }}
            className="press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-ink"
          >
            <PlusMark />
            Log a spend
          </button>
        </div>
      </div>

      <LogSheet
        open={logging}
        house={house}
        stated={stated}
        rules={rules}
        draft={draft}
        onClose={() => {
          setLogging(false);
          setDraft(null);
        }}
        onSave={addDecision}
      />
    </div>
  );
}

function Count({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 800);
      const e = 1 - (1 - p) ** 3;
      setN(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const shown = value % 1 === 0 ? Math.round(n) : n;
  return <span className="tabular-nums">{money(shown)}</span>;
}

function Setup({
  onStart,
  onSample,
  wallet,
}: {
  onStart: (name: string, members: string[], solo: number, dual: number) => void;
  onSample: () => void;
  wallet?: string;
}) {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("You");
  const [solo, setSolo] = useState("40");
  const [dual, setDual] = useState("200");

  const members = people
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const soloN = Number(solo);
  const dualN = Number(dual);
  const ready = name.trim().length > 0 && members.length > 0 && soloN > 0 && dualN > soloN;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-5 pt-16 pb-10 sm:px-6 sm:pt-24">
        <p className="rise flex items-center gap-2.5">
          <BrandMark size={36} />
          <span className="font-display text-base tracking-tight text-ink">RuleSync</span>
        </p>
        <h1 className="rise mt-4 font-display text-4xl leading-none tracking-tighter sm:text-5xl" style={{ animationDelay: "90ms" }}>
          The rules you wrote.
          <br />
          The rules you keep.
        </h1>
        {wallet ? <p className="rise mt-4 text-sm text-mist">{wallet}</p> : null}
        <form
          className="rise mt-10 grid gap-3"
          style={{ animationDelay: "180ms" }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!ready) return;
            onStart(name.trim(), members, soloN, dualN);
          }}
        >
          <Field label="House" icon={<HomeMark size={14} />}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="North House"
              className="min-h-12 w-full bg-transparent font-display text-2xl outline-none placeholder:text-line"
            />
          </Field>
          <Field label="People, separated by commas" icon={<PairMark size={14} />}>
            <input
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="min-h-12 w-full bg-transparent text-lg outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Alone, no talk" icon={<PersonMark size={14} />}>
              <input
                inputMode="decimal"
                value={solo}
                onChange={(e) => setSolo(e.target.value)}
                className="min-h-12 w-full bg-transparent text-lg tabular-nums outline-none"
              />
            </Field>
            <Field label="Two names above" icon={<PairMark size={14} />}>
              <input
                inputMode="decimal"
                value={dual}
                onChange={(e) => setDual(e.target.value)}
                className="min-h-12 w-full bg-transparent text-lg tabular-nums outline-none"
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={!ready}
            className="press mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper disabled:opacity-40"
          >
            <ArrowMark />
            Open the house
          </button>
          <button type="button" onClick={onSample} className="press min-h-11 text-sm text-mist">
            Or open the sample house
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-line bg-panel px-4 py-2">
      <span className="flex items-center gap-1.5 text-xs text-mist">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function RulesView({
  stated,
  rules,
  onAdopt,
  onExport,
  onReset,
  walrus,
  tatum,
  accountId,
  memories,
  onWrite,
  suiAddress,
  onSuiAddress,
  suiBalance,
  suiTransfers,
  suiError,
  importedDigests,
  onImport,
  onReadSui,
}: {
  stated: StatedRules;
  rules: LearnedRule[];
  onAdopt: (rule: LearnedRule) => void;
  onExport: () => void;
  onReset: () => void;
  walrus: boolean;
  tatum: boolean;
  accountId: string | null;
  memories: number;
  onWrite: () => void;
  suiAddress: string;
  onSuiAddress: (value: string) => void;
  suiBalance: number | null;
  suiTransfers: SuiTransfer[];
  suiError: string;
  importedDigests: string[];
  onImport: (tx: SuiTransfer) => void;
  onReadSui: () => void;
}) {
  return (
    <section className="mt-10">
      <h1 className="rise font-display text-4xl">Rules</h1>
      <dl className="rise mt-6 grid grid-cols-2 gap-3" style={{ animationDelay: "80ms" }}>
        <div className="rounded-2xl bg-panel-2 px-4 py-4">
          <dt className="flex items-center gap-1.5 text-xs text-mist">
            <PersonMark />
            Alone
          </dt>
          <dd className="mt-1 font-display text-2xl">{money(stated.soloLimit)}</dd>
        </div>
        <div className="rounded-2xl bg-panel-2 px-4 py-4">
          <dt className="flex items-center gap-1.5 text-xs text-mist">
            <PairMark />
            Two names
          </dt>
          <dd className="mt-1 font-display text-2xl">{money(stated.dualAbove)}</dd>
        </div>
      </dl>
      <ul className="mt-8 grid gap-3">
        {rules.length === 0 && (
          <li className="text-sm text-mist">Nothing has repeated enough to call a rule.</li>
        )}
        {rules.map((rule, i) => {
          const on = isAdopted(rule, stated);
          return (
            <li
              key={rule.id}
              className="rise rounded-3xl border border-line bg-panel px-5 py-5"
              style={{ animationDelay: `${140 + i * 70}ms` }}
            >
              <div className="flex gap-3">
                <span className="mt-1 text-accent">
                  <RuleGlyph kind={rule.kind} />
                </span>
                <h2 className="font-display text-2xl leading-snug">{rule.title}</h2>
              </div>
              <p className="mt-2 text-sm text-mist">{rule.evidence}</p>
              <button
                type="button"
                disabled={on}
                onClick={() => onAdopt(rule)}
                className="press mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-accent disabled:text-mist"
              >
                {on ? <CheckMark /> : <PlusMark />}
                {on ? "On the books" : "Adopt"}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 flex flex-wrap gap-x-6 text-sm text-mist">
        {walrus && (
          <button type="button" onClick={onWrite} className="press min-h-11">
            Write to Mainnet
          </button>
        )}
        <button type="button" onClick={onExport} className="press inline-flex min-h-11 items-center gap-2">
          <ExportMark />
          Export
        </button>
        <button type="button" onClick={onReset} className="press inline-flex min-h-11 items-center gap-2">
          <ResetMark />
          Start over
        </button>
      </div>
      <p className="mt-2 text-xs text-mist">
        {walrus
          ? `Mainnet ${memories}${accountId ? ` · ${accountId.slice(0, 10)}…` : ""}`
          : "Stays on this device until you export it."}
      </p>
      {tatum && (
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            onReadSui();
          }}
        >
          <Field label="Sui address">
            <input
              value={suiAddress}
              onChange={(e) => onSuiAddress(e.target.value)}
              placeholder="0x"
              spellCheck={false}
              className="min-h-12 w-full bg-transparent text-sm outline-none placeholder:text-line"
            />
          </Field>
          <button type="submit" className="press mt-3 min-h-11 text-sm text-accent">
            Read with Tatum
          </button>
          {suiError && <p className="mt-2 text-sm text-mist">{suiError}</p>}
          {suiBalance != null && (
            <p className="mt-3 font-display text-2xl">
              {suiBalance.toLocaleString(undefined, { maximumFractionDigits: 4 })} SUI
            </p>
          )}
          {suiTransfers.length > 0 && (
            <>
              <p className="mt-4 text-xs text-mist">Sent transfers, read by Tatum. Import one to make it a spend the house remembers.</p>
              <ul className="mt-2 divide-y divide-line text-sm">
                {suiTransfers.slice(0, 6).map((tx) => {
                  const imported = importedDigests.includes(tx.digest);
                  return (
                    <li key={tx.digest} className="flex items-center justify-between gap-4 py-3">
                      <span className="truncate text-mist">{tx.digest.slice(0, 10)}</span>
                      <span className="flex items-center gap-3">
                        <span className="tabular-nums">
                          {tx.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })} SUI
                        </span>
                        {imported ? (
                          <span className="flex items-center gap-1 text-xs text-mist">
                            <CheckMark />
                            Imported
                          </span>
                        ) : (
                          <button type="button" onClick={() => onImport(tx)} className="press min-h-11 text-xs text-accent">
                            Import
                          </button>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </form>
      )}
      {walrus && <MemoryPanel count={memories} />}
    </section>
  );
}

function MemoryPanel({ count }: { count: number }) {
  const [lines, setLines] = useState<string[] | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    let cancel = false;
    setLines(null);
    setNote("");
    void listMemories()
      .then((result) => {
        if (cancel) return;
        if (!result.ok) {
          setLines([]);
          setNote(result.error ?? "Walrus did not answer");
          return;
        }
        setLines(result.lines);
      })
      .catch(() => {
        if (cancel) return;
        setLines([]);
        setNote("Walrus did not answer");
      });
    return () => {
      cancel = true;
    };
  }, [count]);

  const shown = (lines ?? []).filter((text) => {
    const row = decodeMemory(text);
    if (row?.kind !== "spend") return true;
    const amount = (row.payload as { amount?: number })?.amount;
    return typeof amount === "number" && amount > 0;
  });
  const rows = shown.slice(0, 12).map((text, i) => {
    const cut = text.lastIndexOf("||");
    const sentence = (cut > 0 ? text.slice(0, cut) : text).replace(/^RuleSync \w+\.\s*/, "");
    const decoded = decodeMemory(text);
    return { key: `${decoded?.kind ?? "row"}-${i}`, kind: decoded?.kind ?? "row", sentence };
  });

  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl">Memory on Walrus</h2>
        <p className="text-xs text-mist">{count} on Mainnet</p>
      </div>
      {lines === null ? (
        <p className="mt-3 text-sm text-mist">Reading Walrus…</p>
      ) : rows.length === 0 ? (
        <p className="mt-3 text-sm text-mist">{note || "Nothing on Walrus yet."}</p>
      ) : (
        <>
          <ul className="mt-3 divide-y divide-line">
            {rows.map((row) => (
              <li key={row.key} className="flex gap-3 py-3 text-sm">
                <span className="mt-0.5 h-fit shrink-0 rounded-full bg-panel-2 px-2 py-0.5 text-xs text-mist">{row.kind}</span>
                <span className="min-w-0">{row.sentence}</span>
              </li>
            ))}
          </ul>
          {shown.length > rows.length && (
            <p className="mt-2 text-xs text-mist">
              Showing {rows.length} of {shown.length} recalled rows.
            </p>
          )}
        </>
      )}
    </section>
  );
}

function LogSheet({
  open,
  house,
  stated,
  rules,
  draft,
  onClose,
  onSave,
}: {
  open: boolean;
  house: Household;
  stated: StatedRules;
  rules: LearnedRule[];
  draft: ImportDraft | null;
  onClose: () => void;
  onSave: (d: Decision) => void;
}) {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [member, setMember] = useState(house.members[0] ?? "");
  const [category, setCategory] = useState<Category>("groceries");
  const [date, setDate] = useState(todayInput);
  const [discussed, setDiscussed] = useState(false);
  const [second, setSecond] = useState("");
  const [delay, setDelay] = useState("2");

  useEffect(() => {
    setMember(house.members[0] ?? "");
  }, [house.members]);

  useEffect(() => {
    if (!open || !draft) return;
    setAmount(String(draft.amount));
    setMerchant(draft.merchant);
    const day = new Date(draft.at);
    setDate(Number.isNaN(day.getTime()) ? todayInput() : day.toISOString().slice(0, 10));
    setCategory("other");
    setDiscussed(false);
    setSecond("");
  }, [open, draft]);

  const n = Number(amount);
  const weekday = weekdayFromDate(date);
  const approvals = second ? [member, second].filter((v, i, arr) => arr.indexOf(v) === i) : [member];
  const verdict: Verdict | null =
    Number.isFinite(n) && n > 0
      ? judgeSpend(
          {
            member,
            category,
            amount: n,
            discussed,
            approvals,
            secondSignDelayMin: second ? Number(delay) || 0 : null,
            weekday,
          },
          stated,
          rules,
        )
      : null;

  function save() {
    if (!verdict || !merchant.trim()) return;
    const at = new Date(`${date}T12:00:00`).toISOString();
    onSave({
      id: draft?.id ?? `you-${Date.now()}`,
      week: weekOf(at, house.startedAt),
      weekday,
      at,
      member,
      category,
      merchant: merchant.trim(),
      amount: Math.round(n * 1e6) / 1e6,
      discussed,
      approvals,
      secondSignDelayMin: second ? Number(delay) || 0 : null,
      source: "you",
    });
    setAmount("");
    setMerchant("");
    setDiscussed(false);
    setSecond("");
  }

  return (
    <div
      className={`fixed inset-0 z-20 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={open ? undefined : true}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Log a spend"
        className={`sheet absolute inset-x-0 bottom-0 mx-auto max-h-screen max-w-lg overflow-y-auto rounded-t-3xl bg-panel px-5 pt-4 pb-8 sm:px-6 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
        <div className="flex items-start justify-between gap-3">
          <label className="block flex-1">
            <span className="text-xs text-mist">Amount</span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="mt-1 w-full bg-transparent font-display text-6xl tabular-nums outline-none placeholder:text-line"
            />
          </label>
          <button type="button" onClick={onClose} className="press min-h-11 text-sm text-mist">
            Close
          </button>
        </div>
        <label className="mt-2 block">
          <span className="text-xs text-mist">Where</span>
          <input
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="Market"
            className="mt-1 min-h-11 w-full bg-transparent text-lg outline-none placeholder:text-line"
          />
        </label>
        {draft && (
          <p className="mt-2 text-xs text-mist">
            Prefilled from a Tatum transfer, in SUI. Set who spent it and what it was for.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {house.members.map((person) => (
            <button
              key={person}
              type="button"
              onClick={() => setMember(person)}
              className={`press min-h-11 rounded-full px-4 text-sm ${
                member === person ? "bg-ink text-paper" : "bg-panel-2 text-ink"
              }`}
            >
              {person}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`press flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-xs ${
                category === c.id ? "bg-ink text-paper" : "bg-panel-2 text-ink"
              }`}
            >
              <CategoryGlyph id={c.id} />
              {c.label}
            </button>
          ))}
        </div>
        <label className="mt-3 block text-sm">
          <span className="text-xs text-mist">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3"
          />
        </label>
        <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={discussed}
            onChange={(e) => setDiscussed(e.target.checked)}
            className="size-4 accent-accent"
          />
          Talked about it first
        </label>
        {house.members.length > 1 && (
          <label className="mt-2 block text-sm">
            <span className="text-xs text-mist">Second name</span>
            <select
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3"
            >
              <option value="">None</option>
              {house.members
                .filter((p) => p !== member)
                .map((p) => (
                  <option key={p}>{p}</option>
                ))}
            </select>
          </label>
        )}
        {second && (
          <label className="mt-3 block text-sm">
            <span className="text-xs text-mist">Minutes until they signed</span>
            <input
              inputMode="numeric"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 tabular-nums"
            />
          </label>
        )}
        {verdict && (
          <div
            className={`mt-5 rounded-2xl px-4 py-4 transition-colors duration-300 ${
              verdict.tone === "break" ? "bg-ink text-paper" : "bg-panel-2 text-ink"
            }`}
          >
            <p className="text-sm font-medium">{verdict.title}</p>
            <p className={`mt-1 text-sm ${verdict.tone === "break" ? "text-paper/70" : "text-mist"}`}>
              {verdict.lines[0]}
            </p>
          </div>
        )}
        <button
          type="button"
          disabled={!verdict || !merchant.trim()}
          onClick={save}
          className="press mt-5 min-h-12 w-full rounded-full bg-accent text-sm font-medium text-accent-ink disabled:opacity-40"
        >
          Save
        </button>
      </div>
    </div>
  );
}
