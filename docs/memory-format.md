# Memory format

RuleSync stores its state as one line per record in a Walrus Memory namespace. This file is normative. A change to a payload field, a kind, or an ordering rule is a change to this spec, not a test edit.

## Grammar

```
RuleSync <kind>. <sentence> ||<json>
```

- `RuleSync ` and the kind are part of the record; recall uses the sentence and the app parses the JSON after the last `||`.
- One record per line. Records are append-only. No record is edited or removed.
- Unknown kinds, malformed JSON, and records that fail validation are ignored. They never abort a restore.
- Every house uses its own namespace: `rulesync-<ten character id>`.
- Amounts are USD numbers. No card numbers, full names of people outside the house, or keys are ever written.

## Kinds

| Kind | Written when | Identity |
|---|---|---|
| `house` | A house is created or closed | one per house; the last decoded row wins |
| `spend` | A spend is saved or imported | `id` is the decision id; a repeat replaces the earlier payload |
| `adopt` | A rule is adopted or a cap is revised | `id` is the rule id; a repeat is a revision |
| `outcome` | A spend is judged | `id` is `out-<decisionId>`; one outcome per spend |

## Restore rules

1. A restore needs a `house` row. Without one it fails closed.
2. Any `house` row with `closedAt` makes the whole restore fail closed. A closed house is final.
3. `spend` rows with a missing id or a non-positive amount are ignored.
4. `adopt` rows are applied in ascending `at`. Rows without `at` apply first, in recall order. This makes a cap revision deterministic even when recall returns rows out of order.
5. `outcome` rows are kept by id, so a retry cannot double count.
6. Rules that were never adopted are recomputed from spends. Only decisions and outcomes come from memory.

## Payloads

House:

```json
{"house":{"name":"Ash House","members":["Alex","Sam","Max"],"startedAt":"2026-09-01T00:00:00.000Z","sample":true},"soloLimit":18,"dualAbove":100}
```

Closed house adds `"closedAt":"<iso>"`.

Spend: the full `Decision` object.

Adopt:

```json
{"id":"cap-groceries","kind":"solo_cap","category":"groceries","cap":45,"at":"2026-11-04T10:00:00.000Z"}
```

Outcome:

```json
{"id":"out-s1","decisionId":"s1","kind":"broke_adopted","category":"groceries","member":"Alex","amount":52,"cap":45,"at":"2026-11-04T10:00:00.000Z"}
```

`kind` is one of `broke_adopted`, `broke_written`, or `matched`. `cap` is the cap in force when the spend was judged, or `null`. Cap health counts only outcomes whose `cap` equals the cap currently on the books, so raising a cap starts a new count.

## Pinned fixture

Decision `s1` for Alex, groceries, `$52`, judged against an adopted `$45` cap:

```
RuleSync outcome. Groceries broke the $45 cap at $52. ||{"id":"out-s1","decisionId":"s1","kind":"broke_adopted","category":"groceries","member":"Alex","amount":52,"cap":45,"at":"2026-11-04T10:00:00.000Z"}
```

The test suite pins this string. If the encoder changes, this line changes first.
