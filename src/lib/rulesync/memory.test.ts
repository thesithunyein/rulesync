import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  adoptMemory,
  houseMemory,
  isHouseMemory,
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
