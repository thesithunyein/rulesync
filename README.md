# RuleSync

Shared household spending that learns the difference between the rule you wrote and the rule you keep.

You set a floor. The house spends. RuleSync notices when groceries always go through alone, when one weekday keeps repeating, or when a second name shows up too fast to count. Adopt the rule, and the next spend is judged against it.

Built for the [Tatum × Walrus Total Recall](https://tatum.io/hackathon/total-recall) hackathon, Consumer Finance track.

## Run

```bash
npm install
npm run dev
```

Open the app and either start a house or load the sample house. The sample is six weeks of spends for Alex, Sam, and Max, with a written solo floor of $18.

```bash
npm run typecheck
npm run build
```

## Try the loop

1. Open the sample house.
2. The home line states the gap. The written floor is $18. Groceries actually reach $45.
3. Adopt that rule.
4. Open Rules. It is on the books.
5. Log a grocery above the new cap. The verdict breaks.
6. Export writes `rulesync.json` with the house, the spends, the rules, and the memory records.

An empty house learns the same way once a pattern repeats. Nothing is pre-seeded unless you open the sample.

## What it learns

| Pattern | What has to be true |
|---|---|
| Solo cap | One category, one name, never discussed, and the top is at least 1.5× the written floor |
| Rhythm | One weekday holds at least 75% of a category, and the amounts stay tight |
| Allowance | One person makes at least 65% of a category |
| False dual | A second name arrives too fast to be a real approval |
| Never discussed | Spends under the floor that nobody talked about |

The engine is in [src/lib/rulesync/engine.ts](src/lib/rulesync/engine.ts). The screen is in [src/components/rulesync/app.tsx](src/components/rulesync/app.tsx).

## Where the data lives

Spends, stated rules, and adopted rules stay on this device under the `rulesync-v2` key. Export is the copy you can take with you.

Mainnet memory is the next layer, not this commit. Each spend and each adopt will call Walrus Memory `remember` on `https://relayer.memory.walrus.xyz`, and a fresh session will `recall` them back. Household balances will be read with Tatum Sui RPC at `https://sui-mainnet.gateway.tatum.io`. Keys stay on the server. Names are in [.env.example](.env.example).

## Stack

TanStack Start, React 19, Tailwind CSS 4. Type is [TikTok Sans](https://fonts.google.com/specimen/TikTok+Sans).
