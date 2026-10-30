import type { Category, Decision } from "./types";

const WEEK1 = Date.UTC(2026, 8, 7, 12, 0, 0);

type Draft = {
  week: number;
  weekday: number;
  hour?: number;
  member: string;
  category: Category;
  merchant: string;
  amount: number;
  discussed: boolean;
  approvals: string[];
  delay?: number | null;
};

function at(week: number, weekday: number, hour = 18): string {
  return new Date(WEEK1 + ((week - 1) * 7 + weekday) * 86400000 + (hour - 12) * 3600000).toISOString();
}

const DRAFTS: Draft[] = [
  { week: 1, weekday: 0, member: "Alex", category: "groceries", merchant: "Market", amount: 28, discussed: false, approvals: ["Alex"] },
  { week: 1, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 24, discussed: false, approvals: ["Sam"] },
  { week: 1, weekday: 5, member: "Max", category: "games", merchant: "Game shelf", amount: 19, discussed: false, approvals: ["Alex"] },
  { week: 1, weekday: 1, member: "Sam", category: "other", merchant: "Transit", amount: 9, discussed: false, approvals: ["Sam"] },
  { week: 1, weekday: 2, member: "Alex", category: "utilities", merchant: "Power", amount: 86, discussed: true, approvals: ["Alex", "Sam"], delay: 40 },

  { week: 2, weekday: 1, member: "Alex", category: "groceries", merchant: "Market", amount: 33, discussed: false, approvals: ["Alex"] },
  { week: 2, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 31, discussed: false, approvals: ["Sam"] },
  { week: 2, weekday: 6, member: "Max", category: "games", merchant: "Arcade", amount: 22, discussed: false, approvals: ["Alex"] },
  { week: 2, weekday: 0, member: "Sam", category: "groceries", merchant: "Corner shop", amount: 12, discussed: false, approvals: ["Sam"] },
  { week: 2, weekday: 3, member: "Max", category: "other", merchant: "Transit", amount: 15, discussed: false, approvals: ["Alex"] },
  { week: 2, weekday: 2, member: "Alex", category: "other", merchant: "Hardware", amount: 120, discussed: true, approvals: ["Alex", "Sam"], delay: 80 },

  { week: 3, weekday: 2, member: "Alex", category: "groceries", merchant: "Market", amount: 41, discussed: false, approvals: ["Alex"] },
  { week: 3, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 38, discussed: false, approvals: ["Sam"] },
  { week: 3, weekday: 5, member: "Max", category: "games", merchant: "Game shelf", amount: 27, discussed: false, approvals: ["Alex"] },
  { week: 3, weekday: 1, member: "Sam", category: "other", merchant: "Cafe", amount: 11, discussed: false, approvals: ["Sam"] },
  { week: 3, weekday: 0, member: "Alex", category: "rent", merchant: "Rent", amount: 140, discussed: true, approvals: ["Alex", "Sam"], delay: 2 },

  { week: 4, weekday: 0, member: "Alex", category: "groceries", merchant: "Market", amount: 45, discussed: false, approvals: ["Alex"] },
  { week: 4, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 29, discussed: false, approvals: ["Sam"] },
  { week: 4, weekday: 5, member: "Max", category: "games", merchant: "Arcade", amount: 35, discussed: false, approvals: ["Alex"] },
  { week: 4, weekday: 3, member: "Alex", category: "other", merchant: "Pharmacy", amount: 14, discussed: false, approvals: ["Alex"] },
  { week: 4, weekday: 2, member: "Sam", category: "other", merchant: "Chair", amount: 180, discussed: true, approvals: ["Sam", "Alex"], delay: 3 },

  { week: 5, weekday: 1, member: "Alex", category: "groceries", merchant: "Market", amount: 39, discussed: false, approvals: ["Alex"] },
  { week: 5, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 42, discussed: false, approvals: ["Sam"] },
  { week: 5, weekday: 6, member: "Max", category: "games", merchant: "Game shelf", amount: 31, discussed: false, approvals: ["Alex"] },
  { week: 5, weekday: 0, member: "Sam", category: "other", merchant: "Bus", amount: 8, discussed: false, approvals: ["Sam"] },
  { week: 5, weekday: 2, member: "Max", category: "other", merchant: "Clothes", amount: 20, discussed: false, approvals: ["Alex"] },
  { week: 5, weekday: 3, member: "Alex", category: "utilities", merchant: "Power", amount: 110, discussed: true, approvals: ["Alex", "Sam"], delay: 2 },

  { week: 6, weekday: 2, member: "Alex", category: "groceries", merchant: "Market", amount: 44, discussed: false, approvals: ["Alex"] },
  { week: 6, weekday: 4, member: "Sam", category: "fastfood", merchant: "Noodle Bar", amount: 34, discussed: false, approvals: ["Sam"] },
  { week: 6, weekday: 5, member: "Max", category: "games", merchant: "Arcade", amount: 24, discussed: false, approvals: ["Alex"] },
  { week: 6, weekday: 6, member: "Max", category: "other", merchant: "Snack", amount: 6, discussed: false, approvals: ["Max"] },
  { week: 6, weekday: 0, member: "Sam", category: "rent", merchant: "Rent", amount: 155, discussed: true, approvals: ["Sam", "Alex"], delay: 1 },
];

export const SEED: Decision[] = DRAFTS.map((d, i) => ({
  id: `seed-${i + 1}`,
  week: d.week,
  weekday: d.weekday,
  at: at(d.week, d.weekday, d.hour),
  member: d.member,
  category: d.category,
  merchant: d.merchant,
  amount: d.amount,
  discussed: d.discussed,
  approvals: d.approvals,
  secondSignDelayMin: d.delay ?? null,
  source: "sample",
}));
