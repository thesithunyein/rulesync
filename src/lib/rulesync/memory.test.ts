import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  adoptMemory,
  closeMemory,
  houseMemory,
  isHouseMemory,
  outcomeMemory,
  restoreFromLines,
  spendMemory,
  uniqueLines,
} from "./memory.ts";
import { DEFAULT_STATED, type Decision, type Household, type LearnedRule } from "./types.ts";

const house: Household = {
  name: "Ash House",
  members: ["Alex", "Sam", "Max"],
  startedAt: "2026-09-01T00:00:00.000Z",
  sample: true,
};

const spend: Decision = {
  id: "s1",
  week: 1,
  weekday: 1,
  at: "2026-09-01T10:00:00.000Z",
  member: "Alex",
  category: "groceries",
  merchant: "Market",
  amount: 44,
  discussed: false,
  approvals: [],
  secondSignDelayMin: null,
  source: "sample",
};

const rule: LearnedRule = {
  id: "cap-groceries",
  kind: "solo_cap",
  weekDiscovered: 3,
  title: "Groceries actually reaches $45",
  detail: "7 times",
  evidence: "$44 on average",
  confidence: 0.9,
  cap: 45,
  category: "groceries",
};

describe("restoreFromLines", () => {
  it("restores house, spends and adopted caps from recalled lines", () => {
    const restored = restoreFromLines([
      houseMemory(house, { ...DEFAULT_STATED, soloLimit: 18, dualAbove: 100 }),
      spendMemory(spend),
      adoptMemory(rule),
    ]);

    assert.ok(restored);
    assert.equal(restored.house.name, "Ash House");
    assert.equal(restored.stated.soloLimit, 18);
    assert.equal(restored.stated.dualAbove, 100);
    assert.deepEqual(
      restored.decisions.map((d) => d.id),
      ["s1"],
    );
    assert.equal(restored.stated.caps.groceries, 45);
  });

  it("fails closed when recall did not surface the house line", () => {
    assert.equal(restoreFromLines([spendMemory(spend), adoptMemory(rule)]), null);
  });

  it("refuses to restore once a closed mark is in the memory", () => {
    const lines = [houseMemory(house, DEFAULT_STATED), spendMemory(spend), closeMemory(house, DEFAULT_STATED)];
    assert.equal(restoreFromLines(lines), null);
  });

  it("drops spend records without a positive amount", () => {
    const zero = { ...spend, id: "zero", amount: 0 };
    const restored = restoreFromLines([houseMemory(house, DEFAULT_STATED), spendMemory(zero)]);

    assert.ok(restored);
    assert.deepEqual(restored.decisions, []);
  });

  it("restores outcome rows and keeps only valid ones", () => {
    const over = { ...spend, amount: 52 };
    const restored = restoreFromLines([
      houseMemory(house, DEFAULT_STATED),
      outcomeMemory(over, "broke_adopted", 45, "2026-11-04T10:00:00.000Z"),
      "RuleSync outcome. Broken ||{\"id\":\"out-bad\"}",
      "RuleSync outcome. Broken ||not json",
    ]);

    assert.ok(restored);
    assert.equal(restored.outcomes.length, 1);
    assert.equal(restored.outcomes[0]?.kind, "broke_adopted");
    assert.equal(restored.outcomes[0]?.amount, 52);
  });

  it("applies cap revisions in time order even when recall returns them backwards", () => {
    const older = adoptMemory(rule, "2026-11-01T00:00:00.000Z");
    const newer = adoptMemory({ ...rule, cap: 55 }, "2026-11-03T00:00:00.000Z");
    const restored = restoreFromLines([houseMemory(house, DEFAULT_STATED), newer, older]);

    assert.ok(restored);
    assert.equal(restored.stated.caps.groceries, 55);
  });

  it("keeps a cap carried by the newest house row over a stale adopt row", () => {
    const raised = { ...DEFAULT_STATED, caps: { groceries: 55 } };
    const restored = restoreFromLines([
      houseMemory(house, raised, "2026-11-04T09:00:00.000Z"),
      adoptMemory(rule, "2026-11-01T00:00:00.000Z"),
    ]);

    assert.ok(restored);
    assert.equal(restored.stated.caps.groceries, 55);
  });

  it("uses the newest house row when recall returns an older one last", () => {
    const older = { ...DEFAULT_STATED, caps: { groceries: 42 } };
    const newer = { ...DEFAULT_STATED, caps: { groceries: 55 }, soloLimit: 20 };
    const restored = restoreFromLines([
      houseMemory(house, newer, "2026-11-04T09:00:00.000Z"),
      houseMemory(house, older, "2026-11-01T09:00:00.000Z"),
    ]);

    assert.ok(restored);
    assert.equal(restored.stated.caps.groceries, 55);
    assert.equal(restored.stated.soloLimit, 20);
  });

  it("does not duplicate a repeated rhythm adoption", () => {
    const rhythm: LearnedRule = {
      id: "rhythm-groceries-5",
      kind: "rhythm",
      weekDiscovered: 2,
      title: "Saturday is groceries",
      detail: "",
      evidence: "",
      confidence: 1,
      category: "groceries",
      weekday: 5,
    };
    const restored = restoreFromLines([
      houseMemory(house, DEFAULT_STATED),
      adoptMemory(rhythm, "2026-11-01T00:00:00.000Z"),
      adoptMemory(rhythm, "2026-11-02T00:00:00.000Z"),
    ]);

    assert.ok(restored);
    assert.deepEqual(restored.stated.rhythms, ["rhythm-groceries-5"]);
  });
});

describe("outcomeMemory", () => {
  it("pins the record line from the spec", () => {
    const over = { ...spend, amount: 52 };
    assert.equal(
      outcomeMemory(over, "broke_adopted", 45, "2026-11-04T10:00:00.000Z"),
      'RuleSync outcome. Groceries broke the $45 cap at $52. ||{"id":"out-s1","decisionId":"s1","kind":"broke_adopted","category":"groceries","member":"Alex","amount":52,"cap":45,"at":"2026-11-04T10:00:00.000Z"}',
    );
  });
});

describe("uniqueLines", () => {
  it("keeps the first copy of each recalled line and drops blanks", () => {
    const lines = uniqueLines(["a", null, "b", "a", undefined, "b", "c"]);
    assert.deepEqual(lines, ["a", "b", "c"]);
  });
});

describe("isHouseMemory", () => {
  it("recognises the house record and not spend records", () => {
    assert.equal(isHouseMemory(houseMemory(house, DEFAULT_STATED)), true);
    assert.equal(isHouseMemory(spendMemory(spend)), false);
  });
});
