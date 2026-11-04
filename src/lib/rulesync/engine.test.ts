import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { capHealth, capProposal, judgeSpend } from "./engine.ts";
import { DEFAULT_STATED, type Outcome, type SpendDraft } from "./types.ts";

const stated = { ...DEFAULT_STATED, soloLimit: 40, dualAbove: 200, caps: { groceries: 45 } };

const draft: SpendDraft = {
  member: "Alex",
  category: "groceries",
  amount: 52,
  discussed: false,
  approvals: ["Alex"],
  secondSignDelayMin: null,
  weekday: 1,
};

const judged = (id: string, amount: number, cap: number | null, at: string): Outcome => ({
  id,
  decisionId: id,
  kind: "broke_adopted",
  category: "groceries",
  member: "Alex",
  amount,
  cap,
  at,
});

describe("judgeSpend outcome", () => {
  it("marks a spend above an adopted cap as broke_adopted", () => {
    const verdict = judgeSpend(draft, stated, []);
    assert.equal(verdict.tone, "break");
    assert.equal(verdict.outcome, "broke_adopted");
  });

  it("marks a spend inside an adopted cap as matched", () => {
    const verdict = judgeSpend({ ...draft, amount: 42 }, stated, []);
    assert.equal(verdict.tone, "match");
    assert.equal(verdict.outcome, "matched");
  });

  it("does not call a fast second name a break once the house adopted the flag", () => {
    const verdict = judgeSpend(
      { ...draft, amount: 250, approvals: ["Alex", "Sam"], secondSignDelayMin: 1 },
      { ...stated, treatFastDualAsSingle: true },
      [],
    );
    assert.equal(verdict.outcome, "matched");
  });
});

describe("capHealth", () => {
  it("counts only breaks against the cap in force", () => {
    const outcomes = [
      judged("a", 52, 45, "2026-11-01T10:00:00.000Z"),
      judged("b", 48, 45, "2026-11-02T10:00:00.000Z"),
      judged("c", 58, 55, "2026-11-03T10:00:00.000Z"),
    ];

    const at45 = capHealth(outcomes, "groceries", 45);
    assert.equal(at45.breaks, 2);
    assert.equal(at45.worst, 52);
    assert.equal(at45.lastAt, "2026-11-02T10:00:00.000Z");

    const at55 = capHealth(outcomes, "groceries", 55);
    assert.equal(at55.breaks, 1);
    assert.equal(at55.worst, 58);
  });
});

describe("capProposal", () => {
  it("stays quiet until the cap has broken twice", () => {
    const once = capHealth([judged("a", 52, 45, "2026-11-01T10:00:00.000Z")], "groceries", 45);
    assert.equal(capProposal("groceries", once), null);
  });

  it("raises to the next five above the worst break", () => {
    const health = capHealth(
      [
        judged("a", 52, 45, "2026-11-01T10:00:00.000Z"),
        judged("b", 48, 45, "2026-11-02T10:00:00.000Z"),
      ],
      "groceries",
      45,
    );
    const proposal = capProposal("groceries", health);
    assert.ok(proposal);
    assert.equal(proposal.cap, 55);
    assert.match(proposal.text, /\$45 cap 2 times/);
  });
});
