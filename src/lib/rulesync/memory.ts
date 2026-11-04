import { DEFAULT_STATED, type Decision, type Household, type LearnedRule, type StatedRules } from "./types.ts";

const MARK = "||";

export function encodeMemory(kind: "house" | "spend" | "adopt", sentence: string, payload: unknown): string {
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

export function houseMemory(house: Household, stated: StatedRules): string {
  return encodeMemory(
    "house",
    `${house.name} with ${house.members.join(", ")}. Alone ${stated.soloLimit}. Two names ${stated.dualAbove}.`,
    { house, soloLimit: stated.soloLimit, dualAbove: stated.dualAbove },
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

export function adoptMemory(rule: LearnedRule): string {
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
    },
  );
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
} | null {
  let house: Household | null = null;
  let closed = false;
  let stated = { ...DEFAULT_STATED };
  const decisions = new Map<string, Decision>();
  const adoptions: Array<{
    id: string;
    kind: LearnedRule["kind"];
    category?: LearnedRule["category"];
    cap?: number;
  }> = [];
  for (const line of lines) {
    const row = decodeMemory(line);
    if (!row) continue;
    if (row.kind === "house") {
      const payload = row.payload as {
        house?: Household;
        soloLimit?: number;
        dualAbove?: number;
        closedAt?: string;
      };
      if (payload.closedAt) closed = true;
      if (payload.house?.name && Array.isArray(payload.house.members)) {
        house = payload.house;
        stated = {
          ...stated,
          soloLimit: payload.soloLimit ?? stated.soloLimit,
          dualAbove: payload.dualAbove ?? stated.dualAbove,
        };
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
      };
      if (rule.id && rule.kind) adoptions.push({ id: rule.id, kind: rule.kind, category: rule.category, cap: rule.cap });
    }
  }
  if (!house || closed) return null;
  for (const rule of adoptions) {
    if (rule.kind === "solo_cap" && rule.category && rule.cap != null) {
      stated = { ...stated, caps: { ...stated.caps, [rule.category]: rule.cap } };
    }
    if (rule.kind === "never_discussed") stated = { ...stated, silenceUnder: true };
    if (rule.kind === "false_dual") stated = { ...stated, treatFastDualAsSingle: true };
    if (rule.kind === "rhythm") stated = { ...stated, rhythms: [...stated.rhythms, rule.id] };
    if (rule.kind === "allowance") stated = { ...stated, allowances: [...stated.allowances, rule.id] };
  }
  return { house, stated, decisions: [...decisions.values()] };
}
