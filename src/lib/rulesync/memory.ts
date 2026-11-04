import {
  CATEGORIES,
  DEFAULT_STATED,
  categoryLabel,
  money,
  type Category,
  type Decision,
  type Household,
  type LearnedRule,
  type Outcome,
  type OutcomeKind,
  type StatedRules,
} from "./types.ts";

const MARK = "||";

export function encodeMemory(
  kind: "house" | "spend" | "adopt" | "outcome",
  sentence: string,
  payload: unknown,
): string {
  return `RuleSync ${kind}. ${sentence} ${MARK}${JSON.stringify(payload)}`;
}

export function decodeMemory(text: string): { kind: string; payload: unknown } | null {
  const cut = text.lastIndexOf(MARK);
  if (cut < 0 || !text.startsWith("RuleSync ")) return null;
  const head = text.slice(0, cut);
  const kind = head.slice("RuleSync ".length).split(".")[0]?.trim();
  if (!kind) return null;
  try {
    return { kind, payload: JSON.parse(text.slice(cut + MARK.length)) };
  } catch {
    return null;
  }
}

export function houseMemory(house: Household, stated: StatedRules, at = new Date().toISOString()): string {
  return encodeMemory(
    "house",
    `${house.name} with ${house.members.join(", ")}. Alone ${stated.soloLimit}. Two names ${stated.dualAbove}.`,
    { house, soloLimit: stated.soloLimit, dualAbove: stated.dualAbove, caps: stated.caps, at },
  );
}

export function closeMemory(house: Household, stated: StatedRules): string {
  return encodeMemory(
    "house",
    `${house.name} with ${house.members.join(", ")}. Alone ${stated.soloLimit}. Two names ${stated.dualAbove}.`,
    {
      house,
      soloLimit: stated.soloLimit,
      dualAbove: stated.dualAbove,
      closedAt: new Date().toISOString(),
    },
  );
}

export function spendMemory(d: Decision): string {
  return encodeMemory(
    "spend",
    `${d.member} spent ${d.amount} on ${d.category} at ${d.merchant}. Discussed ${d.discussed}.`,
    d,
  );
}

export function adoptMemory(rule: LearnedRule, at = new Date().toISOString()): string {
  return encodeMemory(
    "adopt",
    `Adopted ${rule.kind} ${rule.title}.`,
    {
      id: rule.id,
      kind: rule.kind,
      category: rule.category,
      cap: rule.cap,
      member: rule.member,
      weekday: rule.weekday,
      at,
    },
  );
}

export function outcomeLine(o: Outcome): string {
  const label = categoryLabel(o.category);
  const sentence =
    o.kind === "broke_adopted"
      ? `${label} broke the ${money(o.cap ?? 0)} cap at ${money(o.amount)}.`
      : o.kind === "broke_written"
        ? `${label} broke a written rule at ${money(o.amount)}.`
        : `${label} matched the rules at ${money(o.amount)}.`;
  return encodeMemory("outcome", sentence, {
    id: o.id,
    decisionId: o.decisionId,
    kind: o.kind,
    category: o.category,
    member: o.member,
    amount: o.amount,
    cap: o.cap,
    at: o.at,
  });
}

export function outcomeMemory(
  d: Decision,
  kind: OutcomeKind,
  cap: number | null,
  at = new Date().toISOString(),
): string {
  return outcomeLine({
    id: `out-${d.id}`,
    decisionId: d.id,
    kind,
    category: d.category,
    member: d.member,
    amount: d.amount,
    cap,
    at,
  });
}

export function isHouseMemory(text: string): boolean {
  return text.startsWith("RuleSync house.");
}

export function uniqueLines(lines: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    if (!line || seen.has(line)) continue;
    seen.add(line);
    out.push(line);
  }
  return out;
}

export function restoreFromLines(lines: string[]): {
  house: Household;
  stated: StatedRules;
  decisions: Decision[];
  outcomes: Outcome[];
} | null {
  let house: Household | null = null;
  let closed = false;
  let stated = { ...DEFAULT_STATED };
  let newestHouse: { soloLimit?: number; dualAbove?: number; caps?: StatedRules["caps"]; at: string } | null = null;
  const houseCaps: StatedRules["caps"] = {};
  const decisions = new Map<string, Decision>();
  const outcomes = new Map<string, Outcome>();
  const adoptions: Array<{
    id: string;
    kind: LearnedRule["kind"];
    category?: LearnedRule["category"];
    cap?: number;
    at?: string;
  }> = [];
  const kinds: OutcomeKind[] = ["broke_adopted", "broke_written", "matched"];
  for (const line of lines) {
    const row = decodeMemory(line);
    if (!row) continue;
    if (row.kind === "house") {
      const payload = row.payload as {
        house?: Household;
        soloLimit?: number;
        dualAbove?: number;
        caps?: StatedRules["caps"];
        at?: string;
        closedAt?: string;
      };
      if (payload.closedAt) closed = true;
      if (payload.house?.name && Array.isArray(payload.house.members)) {
        house = payload.house;
        const at = typeof payload.at === "string" ? payload.at : "";
        if (!newestHouse || at > newestHouse.at) {
          newestHouse = { soloLimit: payload.soloLimit, dualAbove: payload.dualAbove, caps: payload.caps, at };
        }
      }
    }
    if (row.kind === "spend") {
      const d = row.payload as Decision;
      if (d?.id && typeof d.amount === "number" && d.amount > 0) decisions.set(d.id, d);
    }
    if (row.kind === "adopt") {
      const rule = row.payload as {
        id?: string;
        kind?: LearnedRule["kind"];
        category?: LearnedRule["category"];
        cap?: number;
        at?: string;
      };
      if (rule.id && rule.kind) {
        adoptions.push({
          id: rule.id,
          kind: rule.kind,
          category: rule.category,
          cap: rule.cap,
          at: rule.at,
        });
      }
    }
    if (row.kind === "outcome") {
      const o = row.payload as Partial<Outcome>;
      if (
        o?.id &&
        o.decisionId &&
        o.kind &&
        kinds.includes(o.kind) &&
        typeof o.amount === "number" &&
        o.amount > 0 &&
        typeof o.at === "string"
      ) {
        const category = CATEGORIES.some((c) => c.id === o.category) ? (o.category as Outcome["category"]) : "other";
        outcomes.set(o.id, {
          id: o.id,
          decisionId: o.decisionId,
          kind: o.kind,
          category,
          member: typeof o.member === "string" ? o.member : "",
          amount: o.amount,
          cap: typeof o.cap === "number" ? o.cap : null,
          at: o.at,
        });
      }
    }
  }
  if (!house || closed) return null;
  stated = {
    ...stated,
    soloLimit: newestHouse?.soloLimit ?? stated.soloLimit,
    dualAbove: newestHouse?.dualAbove ?? stated.dualAbove,
  };
  for (const [category, cap] of Object.entries(newestHouse?.caps ?? {})) {
    if (typeof cap === "number") houseCaps[category as Category] = cap;
  }
  stated = { ...stated, caps: houseCaps };
  for (const rule of [...adoptions].sort((a, b) => (a.at ?? "").localeCompare(b.at ?? ""))) {
    if (rule.kind === "solo_cap" && rule.category && rule.cap != null) {
      if (houseCaps[rule.category] == null) {
        stated = { ...stated, caps: { ...stated.caps, [rule.category]: rule.cap } };
      }
    }
    if (rule.kind === "never_discussed") stated = { ...stated, silenceUnder: true };
    if (rule.kind === "false_dual") stated = { ...stated, treatFastDualAsSingle: true };
    if (rule.kind === "rhythm" && !stated.rhythms.includes(rule.id)) {
      stated = { ...stated, rhythms: [...stated.rhythms, rule.id] };
    }
    if (rule.kind === "allowance" && !stated.allowances.includes(rule.id)) {
      stated = { ...stated, allowances: [...stated.allowances, rule.id] };
    }
  }
  return { house, stated, decisions: [...decisions.values()], outcomes: [...outcomes.values()] };
}
