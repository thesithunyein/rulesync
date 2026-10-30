import type {
  Category,
  Decision,
  LearnedRule,
  MemoryRecord,
  SpendDraft,
  StatedRules,
  Verdict,
} from "./types";
import { CATEGORIES, categoryLabel, money, WEEKDAYS } from "./types";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function stdev(xs: number[]): number {
  if (xs.length === 0) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length);
}

function blobId(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) + h) ^ text.charCodeAt(i);
  }
  return `mem_${(h >>> 0).toString(16).padStart(8, "0")}`;
}

function prefix(decisions: Decision[], week: number): Decision[] {
  return decisions.filter((d) => d.week <= week);
}

function firstWeek(
  decisions: Decision[],
  maxWeek: number,
  ok: (rows: Decision[]) => boolean,
): number | null {
  const cap = Math.max(1, maxWeek);
  for (let w = 1; w <= cap; w++) {
    if (ok(prefix(decisions, w))) return w;
  }
  return null;
}

function sure(n: number): number {
  return Math.min(1, n / 4);
}

export function learnUpTo(
  decisions: Decision[],
  week: number,
  stated: StatedRules,
): LearnedRule[] {
  const rows = prefix(decisions, week);
  const rules: LearnedRule[] = [];
  const longDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for (const cat of CATEGORIES) {
    if (cat.id === "other") continue;
    const allInCat = rows.filter((d) => d.category === cat.id);
    if (allInCat.length < 3) continue;
    const weekdayHits = WEEKDAYS.map((_, weekday) => {
      const hits = rows.filter((d) => d.category === cat.id && d.weekday === weekday);
      const weeks = new Set(hits.map((d) => d.week));
      return { weekday, hits, weeks: weeks.size };
    })
      .filter((row) => row.weeks >= 3)
      .sort((a, b) => b.weeks - a.weeks);

    const top = weekdayHits[0];
    if (!top) continue;
    const found = firstWeek(decisions, week, (slice) => {
      const weeks = new Set(
        slice
          .filter((d) => d.category === cat.id && d.weekday === top.weekday)
          .map((d) => d.week),
      );
      return weeks.size >= 3;
    });
    if (!found) continue;
    const amounts = top.hits.map((d) => d.amount);
    const avg = round2(mean(amounts));
    const spread = round2(stdev(amounts));
    if (allInCat.length === 0 || top.hits.length / allInCat.length < 0.75) continue;
    if (avg <= 0 || spread / avg > 0.4) continue;
    rules.push({
      id: `rhythm-${cat.id}-${top.weekday}`,
      kind: "rhythm",
      weekDiscovered: found,
      title: `${longDay[top.weekday]} is ${cat.label.toLowerCase()}`,
      detail: `${top.weeks} different weeks. Nobody wrote it down.`,
      evidence: `${money(avg)} on average, give or take ${money(spread)}.`,
      confidence: sure(top.weeks),
      mean: avg,
      category: cat.id,
      weekday: top.weekday,
    });
  }

  for (const cat of CATEGORIES) {
    const found = firstWeek(decisions, week, (slice) => {
      return (
        slice.filter(
          (d) => d.category === cat.id && !d.discussed && d.approvals.length <= 1,
        ).length >= 4
      );
    });
    if (!found) continue;
    const hits = rows.filter(
      (d) => d.category === cat.id && !d.discussed && d.approvals.length <= 1,
    );
    const cap = round2(Math.max(...hits.map((d) => d.amount)));
    if (cat.id === "other" || cap < stated.soloLimit * 1.5) continue;
    rules.push({
      id: `cap-${cat.id}`,
      kind: "solo_cap",
      weekDiscovered: found,
      category: cat.id,
      cap,
      title: `${cat.label} actually reaches ${money(cap)}, with no discussion`,
      detail: `The written floor is still ${money(stated.soloLimit)}.`,
      evidence: `${hits.length} times, and nobody stopped to talk about it.`,
      confidence: sure(hits.length),
    });
  }

  const floorWeek = firstWeek(decisions, week, (slice) => {
    const small = slice.filter((d) => d.amount < stated.soloLimit);
    return small.length >= 4 && small.every((d) => !d.discussed);
  });
  if (floorWeek) {
    const small = rows.filter((d) => d.amount < stated.soloLimit);
    rules.push({
      id: "under-floor",
      kind: "never_discussed",
      weekDiscovered: floorWeek,
      title: `Nothing under ${money(stated.soloLimit)} gets a conversation`,
      detail: "The number on the setup screen is not doing any work.",
      evidence: `${small.length} small spends. Zero discussions.`,
      confidence: sure(small.length),
    });
  }

  const members = [...new Set(rows.map((d) => d.member))];
  for (const member of members) {
    const mine = rows.filter((d) => d.member === member);
    const total = mine.reduce((a, d) => a + d.amount, 0);
    if (total <= 0) continue;
    let best: { category: Category; share: number; count: number; sum: number } | null = null;
    for (const cat of CATEGORIES) {
      const hits = mine.filter((d) => d.category === cat.id);
      const sum = hits.reduce((a, d) => a + d.amount, 0);
      const share = sum / total;
      if (hits.length >= 4 && share >= 0.65 && (!best || share > best.share)) {
        best = { category: cat.id, share, count: hits.length, sum };
      }
    }
    if (!best) continue;
    const category = best.category;
    const found = firstWeek(decisions, week, (slice) => {
      const person = slice.filter((d) => d.member === member);
      const personTotal = person.reduce((a, d) => a + d.amount, 0);
      const hits = person.filter((d) => d.category === category);
      const sum = hits.reduce((a, d) => a + d.amount, 0);
      return personTotal > 0 && hits.length >= 4 && sum / personTotal >= 0.65;
    });
    if (!found) continue;
    rules.push({
      id: `allow-${member}-${category}`,
      kind: "allowance",
      weekDiscovered: found,
      member,
      category,
      share: best.share,
      title: `${Math.round(best.share * 100)}% of ${member}'s money goes to ${categoryLabel(category).toLowerCase()}`,
      detail: "Not a budget line anyone set. It is just what keeps happening.",
      evidence: `${money(best.sum)} of ${money(total)} across ${best.count} purchases.`,
      confidence: sure(best.count),
    });
  }

  const dualWeek = firstWeek(decisions, week, (slice) => {
    const dual = slice.filter((d) => d.amount >= stated.dualAbove && d.approvals.length >= 2);
    if (dual.length < 4) return false;
    const fast = dual.filter((d) => d.secondSignDelayMin != null && d.secondSignDelayMin <= 3);
    return fast.length / dual.length >= 0.75;
  });
  if (dualWeek) {
    const dual = rows.filter((d) => d.amount >= stated.dualAbove && d.approvals.length >= 2);
    const fast = dual.filter((d) => d.secondSignDelayMin != null && d.secondSignDelayMin <= 3);
    rules.push({
      id: "false-dual",
      kind: "false_dual",
      weekDiscovered: dualWeek,
      title: `Two names over ${money(stated.dualAbove)} is not really two people`,
      detail: "The second name shows up, and the money is already gone.",
      evidence: `Second signature within 3 minutes in ${fast.length} of ${dual.length}.`,
      confidence: sure(dual.length),
    });
  }

  return rules.sort((a, b) => a.weekDiscovered - b.weekDiscovered || a.title.localeCompare(b.title));
}

export function judgeSpend(
  draft: SpendDraft,
  stated: StatedRules,
  rules: LearnedRule[],
): Verdict {
  const lines: string[] = [];
  const capRule = rules.find((r) => r.kind === "solo_cap" && r.category === draft.category);
  const floor = rules.find((r) => r.id === "under-floor");
  const rhythm = rules.find(
    (r) => r.kind === "rhythm" && r.category === draft.category && r.weekday === draft.weekday,
  );
  const allowance = rules.find(
    (r) => r.kind === "allowance" && r.member === draft.member && r.category === draft.category,
  );
  const dual = rules.find((r) => r.id === "false-dual");
  const adoptedCap = draft.category ? stated.caps[draft.category] : undefined;

  if (stated.silenceUnder && draft.amount < stated.soloLimit && !draft.discussed) {
    return {
      tone: "quiet",
      title: "Let it through",
      lines: [`Spends under ${money(stated.soloLimit)} no longer ask for a conversation.`],
    };
  }

  if (adoptedCap != null && draft.amount <= adoptedCap && draft.approvals.length <= 1) {
    return {
      tone: "match",
      title: "Inside the limit you adopted",
      lines: [`${money(draft.amount)} sits within the ${money(adoptedCap)} you put on the books.`],
    };
  }

  if (
    capRule?.cap != null &&
    adoptedCap == null &&
    draft.amount > stated.soloLimit &&
    draft.amount <= capRule.cap &&
    draft.approvals.length <= 1
  ) {
    lines.push(
      `Above the written floor of ${money(stated.soloLimit)}.`,
      `In line with what you already allow: ${categoryLabel(draft.category).toLowerCase()} up to ${money(capRule.cap)}.`,
    );
  }

  if (adoptedCap != null && draft.amount > adoptedCap && draft.approvals.length <= 1 && draft.amount < stated.dualAbove) {
    lines.push(`Above the ${money(adoptedCap)} cap you adopted for ${categoryLabel(draft.category).toLowerCase()}.`);
  }

  if (draft.amount >= stated.dualAbove && draft.approvals.length < 2) {
    lines.push(`Your written rule still wants two names over ${money(stated.dualAbove)}.`);
  }

  const fastSecond =
    draft.approvals.length >= 2 &&
    draft.secondSignDelayMin != null &&
    draft.secondSignDelayMin <= 3 &&
    draft.amount >= stated.dualAbove;

  if (fastSecond && stated.treatFastDualAsSingle) {
    lines.push(`Second name in ${draft.secondSignDelayMin} min. You asked to count that as one approval.`);
  } else if (fastSecond && dual) {
    lines.push(`Second name in ${draft.secondSignDelayMin} min. That is how the two-name rule actually goes.`);
  }

  if (draft.amount < stated.soloLimit && !draft.discussed && floor && !stated.silenceUnder) {
    lines.push(`Under ${money(stated.soloLimit)}, and not discussed. Same as every small spend so far.`);
  }

  if (rhythm) {
    const extra = stated.rhythms.includes(rhythm.id) ? " You told the house to expect it." : "";
    lines.push(`${rhythm.title}.${extra} About ${money(rhythm.mean ?? 0)} so far.`);
  }

  if (allowance) {
    const extra = stated.allowances.includes(allowance.id) ? " The flag is on." : "";
    lines.push(
      `${Math.round((allowance.share ?? 0) * 100)}% of ${draft.member}'s money already goes here.${extra}`,
    );
  }

  if (lines.length === 0) {
    return {
      tone: "hold",
      title: "Nothing in memory objects",
      lines: ["Not enough of a pattern yet to confirm this or push back."],
    };
  }

  const breaksWritten =
    (capRule?.cap != null &&
      adoptedCap == null &&
      draft.amount > stated.soloLimit &&
      draft.amount <= capRule.cap &&
      draft.approvals.length <= 1) ||
    (adoptedCap != null && draft.amount > adoptedCap && draft.approvals.length <= 1) ||
    fastSecond ||
    (draft.amount >= stated.dualAbove && draft.approvals.length < 2);

  return {
    tone: breaksWritten ? "break" : "match",
    title: breaksWritten ? "Written and lived rules disagree" : "This matches the house",
    lines,
  };
}

export function buildMemories(
  decisions: Decision[],
  houseName: string,
  stated: StatedRules,
  rules: LearnedRule[],
): MemoryRecord[] {
  const week = decisions.reduce((m, d) => Math.max(m, d.week), 1);
  const out: MemoryRecord[] = [];

  for (const d of decisions) {
    const text = [
      `${d.member} spent ${money(d.amount)} on ${categoryLabel(d.category)} at ${d.merchant}.`,
      `${WEEKDAYS[d.weekday]}.`,
      d.discussed ? "Discussed." : "Not discussed.",
      `Approvals: ${d.approvals.join(", ") || "none"}.`,
      d.secondSignDelayMin != null ? `Second sign after ${d.secondSignDelayMin} min.` : "",
    ]
      .filter(Boolean)
      .join(" ");
    out.push({
      id: `dec-${d.id}`,
      namespace: "decision",
      week: d.week,
      text,
      blobId: blobId(text),
    });
  }

  for (const rule of rules) {
    const text = `${rule.title}. ${rule.detail} ${rule.evidence}`;
    out.push({
      id: `rule-${rule.id}`,
      namespace: "rule",
      week: rule.weekDiscovered,
      text,
      blobId: blobId(text),
    });
  }

  const spend = decisions.reduce((a, d) => a + d.amount, 0);
  const report = [
    `${houseName}. ${decisions.length} decisions, ${money(spend)} moved.`,
    `Written floor ${money(stated.soloLimit)}, two names over ${money(stated.dualAbove)}.`,
    rules.length ? `Lived rules: ${rules.map((r) => r.title).join("; ")}.` : "No lived rule yet.",
  ].join(" ");
  out.push({
    id: `report-${week}`,
    namespace: "report",
    week,
    text: report,
    blobId: blobId(report),
  });

  return out;
}

export function headline(rules: LearnedRule[], stated: StatedRules): string | null {
  const cap = rules.find((r) => r.kind === "solo_cap");
  if (cap?.cap != null && stated.caps[cap.category!] == null) {
    return `You wrote ${money(stated.soloLimit)} alone. ${categoryLabel(cap.category!)} actually reaches ${money(cap.cap)}.`;
  }
  const dual = rules.find((r) => r.kind === "false_dual");
  if (dual && !stated.treatFastDualAsSingle) return dual.title;
  const rhythm = rules.find((r) => r.kind === "rhythm" && !stated.rhythms.includes(r.id));
  if (rhythm) return rhythm.title;
  if (rules.length === 0) return null;
  return rules[0]?.title ?? null;
}
