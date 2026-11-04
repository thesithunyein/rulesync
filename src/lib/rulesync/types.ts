export type Category =
  | "groceries"
  | "fastfood"
  | "games"
  | "rent"
  | "utilities"
  | "other";

export type Decision = {
  id: string;
  week: number;
  weekday: number;
  at: string;
  member: string;
  category: Category;
  merchant: string;
  amount: number;
  discussed: boolean;
  approvals: string[];
  secondSignDelayMin: number | null;
  source: "sample" | "you";
};

export type Household = {
  name: string;
  members: string[];
  startedAt: string;
  sample: boolean;
};

export type StatedRules = {
  soloLimit: number;
  dualAbove: number;
  caps: Partial<Record<Category, number>>;
  silenceUnder: boolean;
  treatFastDualAsSingle: boolean;
  rhythms: string[];
  allowances: string[];
};

export type RuleKind =
  | "solo_cap"
  | "never_discussed"
  | "rhythm"
  | "allowance"
  | "false_dual";

export type LearnedRule = {
  id: string;
  kind: RuleKind;
  weekDiscovered: number;
  title: string;
  detail: string;
  evidence: string;
  confidence: number;
  cap?: number;
  mean?: number;
  share?: number;
  category?: Category;
  member?: string;
  weekday?: number;
};

export type MemoryRecord = {
  id: string;
  namespace: "decision" | "rule" | "report" | "adopted";
  week: number;
  text: string;
  blobId: string;
};

export type Verdict = {
  tone: "break" | "match" | "quiet" | "hold";
  title: string;
  lines: string[];
  outcome: OutcomeKind;
};

export type OutcomeKind = "broke_adopted" | "broke_written" | "matched";

export type Outcome = {
  id: string;
  decisionId: string;
  kind: OutcomeKind;
  category: Category;
  member: string;
  amount: number;
  cap: number | null;
  at: string;
};

export type SpendDraft = {
  member: string;
  category: Category;
  amount: number;
  discussed: boolean;
  approvals: string[];
  secondSignDelayMin: number | null;
  weekday: number;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "groceries", label: "Groceries" },
  { id: "fastfood", label: "Fast food" },
  { id: "games", label: "Games" },
  { id: "rent", label: "Rent" },
  { id: "utilities", label: "Utilities" },
  { id: "other", label: "Other" },
];

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DEFAULT_STATED: StatedRules = {
  soloLimit: 40,
  dualAbove: 200,
  caps: {},
  silenceUnder: false,
  treatFastDualAsSingle: false,
  rhythms: [],
  allowances: [],
};

export function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : n < 1 ? 4 : 2,
  });
}

export function categoryLabel(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function weekOf(at: string, startedAt: string): number {
  const days = Math.floor((Date.parse(at) - Date.parse(startedAt)) / 86400000);
  return Math.max(1, Math.floor(days / 7) + 1);
}

export function weekdayFromDate(isoDate: string): number {
  const js = new Date(`${isoDate}T12:00:00`).getDay();
  return (js + 6) % 7;
}

export function isAdopted(rule: LearnedRule, stated: StatedRules): boolean {
  if (rule.kind === "solo_cap" && rule.category) return stated.caps[rule.category] != null;
  if (rule.kind === "never_discussed") return stated.silenceUnder;
  if (rule.kind === "false_dual") return stated.treatFastDualAsSingle;
  if (rule.kind === "rhythm") return stated.rhythms.includes(rule.id);
  if (rule.kind === "allowance") return stated.allowances.includes(rule.id);
  return false;
}
