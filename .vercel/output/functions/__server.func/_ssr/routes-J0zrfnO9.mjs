import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-J0zrfnO9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ children, size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "mark shrink-0",
		children
	});
}
function BrandMark({ size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 64 64",
		"aria-hidden": "true",
		className: "shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				rx: "14",
				fill: "#1c1915"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#f6f3ee",
				fillRule: "evenodd",
				d: "M14 15 H38 A9 9 0 0 1 38 33 H14 Z M44 33 m-7.5 0 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#f6f3ee",
				d: "M14 41 H33 L49 55 H14 Z"
			})
		]
	});
}
function HomeMark({ size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 11.5 12 5l8 6.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10.5V19h10v-8.5" })]
	});
}
function RulesMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 7h12" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 12h12" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 17h8" })
	] });
}
function PlusMark({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" })]
	});
}
function CheckMark({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
		size,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12.5 10 17.5 19 7" })
	});
}
function ExportMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 4v10" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 8l4-4 4 4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 15v4h14v-4" })
	] });
}
function ResetMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12a7 7 0 1 0 2-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 4v4h4" })] });
}
function ArrowMark({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 6l6 6-6 6" })]
	});
}
function PersonMark({ size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "8",
			r: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 19c1.2-3 3.2-4.5 6-4.5S16.8 16 18 19" })]
	});
}
function PairMark({ size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "9",
				r: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "9",
				r: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.5 18c.8-2.4 2.2-3.5 4.5-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.5 18c-.8-2.4-2.2-3.5-4.5-3.5" })
		]
	});
}
function CategoryGlyph({ id, size = 18 }) {
	if (id === "groceries") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 9h10l-1 11H8L7 9Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 9V8a3 3 0 0 1 6 0v1" })]
	});
	if (id === "fastfood") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 11h14" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11c.4 5 2.4 8 5 8s4.6-3 5-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 6v3" })
		]
	});
	if (id === "games") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "5",
				width: "14",
				height: "14",
				rx: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 9v6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 12h6" })
		]
	});
	if (id === "rent") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 20V9l7-4 7 4v11" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 20v-6h4v6" })]
	});
	if (id === "utilities") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
		size,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 3 6 13h6l-1 8 8-11h-6L13 3" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
		size,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 12h.01" })]
	});
}
function RuleGlyph({ kind }) {
	if (kind === "rhythm") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 16V9" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16V7" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 16V11" })
	] });
	if (kind === "solo_cap") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {});
	if (kind === "allowance") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 18V6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 18h14" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 18V11" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 18V8" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 18v-4" })
	] });
	if (kind === "false_dual") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "9",
		cy: "12",
		r: "4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "15",
		cy: "12",
		r: "4"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 12h6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 12h6" })] });
}
var WEEK1 = Date.UTC(2026, 8, 7, 12, 0, 0);
function at(week, weekday, hour = 18) {
	return new Date(WEEK1 + ((week - 1) * 7 + weekday) * 864e5 + (hour - 12) * 36e5).toISOString();
}
var SEED = [
	{
		week: 1,
		weekday: 0,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 28,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 1,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 24,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 1,
		weekday: 5,
		member: "Max",
		category: "games",
		merchant: "Game shelf",
		amount: 19,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 1,
		weekday: 1,
		member: "Sam",
		category: "other",
		merchant: "Transit",
		amount: 9,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 1,
		weekday: 2,
		member: "Alex",
		category: "utilities",
		merchant: "Power",
		amount: 86,
		discussed: true,
		approvals: ["Alex", "Sam"],
		delay: 40
	},
	{
		week: 2,
		weekday: 1,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 33,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 2,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 31,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 2,
		weekday: 6,
		member: "Max",
		category: "games",
		merchant: "Arcade",
		amount: 22,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 2,
		weekday: 0,
		member: "Sam",
		category: "groceries",
		merchant: "Corner shop",
		amount: 12,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 2,
		weekday: 3,
		member: "Max",
		category: "other",
		merchant: "Transit",
		amount: 15,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 2,
		weekday: 2,
		member: "Alex",
		category: "other",
		merchant: "Hardware",
		amount: 120,
		discussed: true,
		approvals: ["Alex", "Sam"],
		delay: 80
	},
	{
		week: 3,
		weekday: 2,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 41,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 3,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 38,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 3,
		weekday: 5,
		member: "Max",
		category: "games",
		merchant: "Game shelf",
		amount: 27,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 3,
		weekday: 1,
		member: "Sam",
		category: "other",
		merchant: "Cafe",
		amount: 11,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 3,
		weekday: 0,
		member: "Alex",
		category: "rent",
		merchant: "Rent",
		amount: 140,
		discussed: true,
		approvals: ["Alex", "Sam"],
		delay: 2
	},
	{
		week: 4,
		weekday: 0,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 45,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 4,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 29,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 4,
		weekday: 5,
		member: "Max",
		category: "games",
		merchant: "Arcade",
		amount: 35,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 4,
		weekday: 3,
		member: "Alex",
		category: "other",
		merchant: "Pharmacy",
		amount: 14,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 4,
		weekday: 2,
		member: "Sam",
		category: "other",
		merchant: "Chair",
		amount: 180,
		discussed: true,
		approvals: ["Sam", "Alex"],
		delay: 3
	},
	{
		week: 5,
		weekday: 1,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 39,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 5,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 42,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 5,
		weekday: 6,
		member: "Max",
		category: "games",
		merchant: "Game shelf",
		amount: 31,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 5,
		weekday: 0,
		member: "Sam",
		category: "other",
		merchant: "Bus",
		amount: 8,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 5,
		weekday: 2,
		member: "Max",
		category: "other",
		merchant: "Clothes",
		amount: 20,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 5,
		weekday: 3,
		member: "Alex",
		category: "utilities",
		merchant: "Power",
		amount: 110,
		discussed: true,
		approvals: ["Alex", "Sam"],
		delay: 2
	},
	{
		week: 6,
		weekday: 2,
		member: "Alex",
		category: "groceries",
		merchant: "Market",
		amount: 44,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 6,
		weekday: 4,
		member: "Sam",
		category: "fastfood",
		merchant: "Noodle Bar",
		amount: 34,
		discussed: false,
		approvals: ["Sam"]
	},
	{
		week: 6,
		weekday: 5,
		member: "Max",
		category: "games",
		merchant: "Arcade",
		amount: 24,
		discussed: false,
		approvals: ["Alex"]
	},
	{
		week: 6,
		weekday: 6,
		member: "Max",
		category: "other",
		merchant: "Snack",
		amount: 6,
		discussed: false,
		approvals: ["Max"]
	},
	{
		week: 6,
		weekday: 0,
		member: "Sam",
		category: "rent",
		merchant: "Rent",
		amount: 155,
		discussed: true,
		approvals: ["Sam", "Alex"],
		delay: 1
	}
].map((d, i) => ({
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
	source: "sample"
}));
var CATEGORIES = [
	{
		id: "groceries",
		label: "Groceries"
	},
	{
		id: "fastfood",
		label: "Fast food"
	},
	{
		id: "games",
		label: "Games"
	},
	{
		id: "rent",
		label: "Rent"
	},
	{
		id: "utilities",
		label: "Utilities"
	},
	{
		id: "other",
		label: "Other"
	}
];
var WEEKDAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
var DEFAULT_STATED = {
	soloLimit: 40,
	dualAbove: 200,
	caps: {},
	silenceUnder: false,
	treatFastDualAsSingle: false,
	rhythms: [],
	allowances: []
};
function money(n) {
	return n.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: n % 1 === 0 ? 0 : 2
	});
}
function categoryLabel(id) {
	return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
function weekOf(at, startedAt) {
	const days = Math.floor((Date.parse(at) - Date.parse(startedAt)) / 864e5);
	return Math.max(1, Math.floor(days / 7) + 1);
}
function weekdayFromDate(isoDate) {
	return ((/* @__PURE__ */ new Date(`${isoDate}T12:00:00`)).getDay() + 6) % 7;
}
function isAdopted(rule, stated) {
	if (rule.kind === "solo_cap" && rule.category) return stated.caps[rule.category] != null;
	if (rule.kind === "never_discussed") return stated.silenceUnder;
	if (rule.kind === "false_dual") return stated.treatFastDualAsSingle;
	if (rule.kind === "rhythm") return stated.rhythms.includes(rule.id);
	if (rule.kind === "allowance") return stated.allowances.includes(rule.id);
	return false;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function mean(xs) {
	if (xs.length === 0) return 0;
	return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function stdev(xs) {
	if (xs.length === 0) return 0;
	const m = mean(xs);
	return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length);
}
function blobId(text) {
	let h = 5381;
	for (let i = 0; i < text.length; i++) h = (h << 5) + h ^ text.charCodeAt(i);
	return `mem_${(h >>> 0).toString(16).padStart(8, "0")}`;
}
function prefix(decisions, week) {
	return decisions.filter((d) => d.week <= week);
}
function firstWeek(decisions, maxWeek, ok) {
	const cap = Math.max(1, maxWeek);
	for (let w = 1; w <= cap; w++) if (ok(prefix(decisions, w))) return w;
	return null;
}
function sure(n) {
	return Math.min(1, n / 4);
}
function learnUpTo(decisions, week, stated) {
	const rows = prefix(decisions, week);
	const rules = [];
	const longDay = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	];
	for (const cat of CATEGORIES) {
		if (cat.id === "other") continue;
		const allInCat = rows.filter((d) => d.category === cat.id);
		if (allInCat.length < 3) continue;
		const top = WEEKDAYS.map((_, weekday) => {
			const hits = rows.filter((d) => d.category === cat.id && d.weekday === weekday);
			return {
				weekday,
				hits,
				weeks: new Set(hits.map((d) => d.week)).size
			};
		}).filter((row) => row.weeks >= 3).sort((a, b) => b.weeks - a.weeks)[0];
		if (!top) continue;
		const found = firstWeek(decisions, week, (slice) => {
			return new Set(slice.filter((d) => d.category === cat.id && d.weekday === top.weekday).map((d) => d.week)).size >= 3;
		});
		if (!found) continue;
		const amounts = top.hits.map((d) => d.amount);
		const avg = round2(mean(amounts));
		const spread = round2(stdev(amounts));
		if (allInCat.length === 0 || top.hits.length / allInCat.length < .75) continue;
		if (avg <= 0 || spread / avg > .4) continue;
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
			weekday: top.weekday
		});
	}
	for (const cat of CATEGORIES) {
		const found = firstWeek(decisions, week, (slice) => {
			return slice.filter((d) => d.category === cat.id && !d.discussed && d.approvals.length <= 1).length >= 4;
		});
		if (!found) continue;
		const hits = rows.filter((d) => d.category === cat.id && !d.discussed && d.approvals.length <= 1);
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
			confidence: sure(hits.length)
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
			confidence: sure(small.length)
		});
	}
	const members = [...new Set(rows.map((d) => d.member))];
	for (const member of members) {
		const mine = rows.filter((d) => d.member === member);
		const total = mine.reduce((a, d) => a + d.amount, 0);
		if (total <= 0) continue;
		let best = null;
		for (const cat of CATEGORIES) {
			const hits = mine.filter((d) => d.category === cat.id);
			const sum = hits.reduce((a, d) => a + d.amount, 0);
			const share = sum / total;
			if (hits.length >= 4 && share >= .65 && (!best || share > best.share)) best = {
				category: cat.id,
				share,
				count: hits.length,
				sum
			};
		}
		if (!best) continue;
		const category = best.category;
		const found = firstWeek(decisions, week, (slice) => {
			const person = slice.filter((d) => d.member === member);
			const personTotal = person.reduce((a, d) => a + d.amount, 0);
			const hits = person.filter((d) => d.category === category);
			const sum = hits.reduce((a, d) => a + d.amount, 0);
			return personTotal > 0 && hits.length >= 4 && sum / personTotal >= .65;
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
			confidence: sure(best.count)
		});
	}
	const dualWeek = firstWeek(decisions, week, (slice) => {
		const dual = slice.filter((d) => d.amount >= stated.dualAbove && d.approvals.length >= 2);
		if (dual.length < 4) return false;
		return dual.filter((d) => d.secondSignDelayMin != null && d.secondSignDelayMin <= 3).length / dual.length >= .75;
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
			confidence: sure(dual.length)
		});
	}
	return rules.sort((a, b) => a.weekDiscovered - b.weekDiscovered || a.title.localeCompare(b.title));
}
function judgeSpend(draft, stated, rules) {
	const lines = [];
	const capRule = rules.find((r) => r.kind === "solo_cap" && r.category === draft.category);
	const floor = rules.find((r) => r.id === "under-floor");
	const rhythm = rules.find((r) => r.kind === "rhythm" && r.category === draft.category && r.weekday === draft.weekday);
	const allowance = rules.find((r) => r.kind === "allowance" && r.member === draft.member && r.category === draft.category);
	const dual = rules.find((r) => r.id === "false-dual");
	const adoptedCap = draft.category ? stated.caps[draft.category] : void 0;
	if (stated.silenceUnder && draft.amount < stated.soloLimit && !draft.discussed) return {
		tone: "quiet",
		title: "Let it through",
		lines: [`Spends under ${money(stated.soloLimit)} no longer ask for a conversation.`]
	};
	if (adoptedCap != null && draft.amount <= adoptedCap && draft.approvals.length <= 1) return {
		tone: "match",
		title: "Inside the limit you adopted",
		lines: [`${money(draft.amount)} sits within the ${money(adoptedCap)} you put on the books.`]
	};
	if (capRule?.cap != null && adoptedCap == null && draft.amount > stated.soloLimit && draft.amount <= capRule.cap && draft.approvals.length <= 1) lines.push(`Above the written floor of ${money(stated.soloLimit)}.`, `In line with what you already allow: ${categoryLabel(draft.category).toLowerCase()} up to ${money(capRule.cap)}.`);
	if (adoptedCap != null && draft.amount > adoptedCap && draft.approvals.length <= 1 && draft.amount < stated.dualAbove) lines.push(`Above the ${money(adoptedCap)} cap you adopted for ${categoryLabel(draft.category).toLowerCase()}.`);
	if (draft.amount >= stated.dualAbove && draft.approvals.length < 2) lines.push(`Your written rule still wants two names over ${money(stated.dualAbove)}.`);
	const fastSecond = draft.approvals.length >= 2 && draft.secondSignDelayMin != null && draft.secondSignDelayMin <= 3 && draft.amount >= stated.dualAbove;
	if (fastSecond && stated.treatFastDualAsSingle) lines.push(`Second name in ${draft.secondSignDelayMin} min. You asked to count that as one approval.`);
	else if (fastSecond && dual) lines.push(`Second name in ${draft.secondSignDelayMin} min. That is how the two-name rule actually goes.`);
	if (draft.amount < stated.soloLimit && !draft.discussed && floor && !stated.silenceUnder) lines.push(`Under ${money(stated.soloLimit)}, and not discussed. Same as every small spend so far.`);
	if (rhythm) {
		const extra = stated.rhythms.includes(rhythm.id) ? " You told the house to expect it." : "";
		lines.push(`${rhythm.title}.${extra} About ${money(rhythm.mean ?? 0)} so far.`);
	}
	if (allowance) {
		const extra = stated.allowances.includes(allowance.id) ? " The flag is on." : "";
		lines.push(`${Math.round((allowance.share ?? 0) * 100)}% of ${draft.member}'s money already goes here.${extra}`);
	}
	if (lines.length === 0) return {
		tone: "hold",
		title: "Nothing in memory objects",
		lines: ["Not enough of a pattern yet to confirm this or push back."]
	};
	const breaksWritten = capRule?.cap != null && adoptedCap == null && draft.amount > stated.soloLimit && draft.amount <= capRule.cap && draft.approvals.length <= 1 || adoptedCap != null && draft.amount > adoptedCap && draft.approvals.length <= 1 || fastSecond || draft.amount >= stated.dualAbove && draft.approvals.length < 2;
	return {
		tone: breaksWritten ? "break" : "match",
		title: breaksWritten ? "Written and lived rules disagree" : "This matches the house",
		lines
	};
}
function buildMemories(decisions, houseName, stated, rules) {
	const week = decisions.reduce((m, d) => Math.max(m, d.week), 1);
	const out = [];
	for (const d of decisions) {
		const text = [
			`${d.member} spent ${money(d.amount)} on ${categoryLabel(d.category)} at ${d.merchant}.`,
			`${WEEKDAYS[d.weekday]}.`,
			d.discussed ? "Discussed." : "Not discussed.",
			`Approvals: ${d.approvals.join(", ") || "none"}.`,
			d.secondSignDelayMin != null ? `Second sign after ${d.secondSignDelayMin} min.` : ""
		].filter(Boolean).join(" ");
		out.push({
			id: `dec-${d.id}`,
			namespace: "decision",
			week: d.week,
			text,
			blobId: blobId(text)
		});
	}
	for (const rule of rules) {
		const text = `${rule.title}. ${rule.detail} ${rule.evidence}`;
		out.push({
			id: `rule-${rule.id}`,
			namespace: "rule",
			week: rule.weekDiscovered,
			text,
			blobId: blobId(text)
		});
	}
	const spend = decisions.reduce((a, d) => a + d.amount, 0);
	const report = [
		`${houseName}. ${decisions.length} decisions, ${money(spend)} moved.`,
		`Written floor ${money(stated.soloLimit)}, two names over ${money(stated.dualAbove)}.`,
		rules.length ? `Lived rules: ${rules.map((r) => r.title).join("; ")}.` : "No lived rule yet."
	].join(" ");
	out.push({
		id: `report-${week}`,
		namespace: "report",
		week,
		text: report,
		blobId: blobId(report)
	});
	return out;
}
function headline(rules, stated) {
	const cap = rules.find((r) => r.kind === "solo_cap");
	if (cap?.cap != null && stated.caps[cap.category] == null) return `You wrote ${money(stated.soloLimit)} alone. ${categoryLabel(cap.category)} actually reaches ${money(cap.cap)}.`;
	const dual = rules.find((r) => r.kind === "false_dual");
	if (dual && !stated.treatFastDualAsSingle) return dual.title;
	const rhythm = rules.find((r) => r.kind === "rhythm" && !stated.rhythms.includes(r.id));
	if (rhythm) return rhythm.title;
	if (rules.length === 0) return null;
	return rules[0]?.title ?? null;
}
var STORAGE_KEY = "rulesync-v2";
var SAMPLE_START = new Date(Date.UTC(2026, 8, 7, 12)).toISOString();
function loadSaved() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || !("house" in parsed)) return null;
		return parsed;
	} catch {
		return null;
	}
}
function todayInput() {
	const d = /* @__PURE__ */ new Date();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
}
function RuleSyncApp() {
	const [house, setHouse] = (0, import_react.useState)(null);
	const [stated, setStated] = (0, import_react.useState)(DEFAULT_STATED);
	const [decisions, setDecisions] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("home");
	const [logging, setLogging] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = loadSaved();
		if (saved) {
			setHouse(saved.house);
			setStated({
				...DEFAULT_STATED,
				...saved.stated,
				caps: saved.stated?.caps ?? {}
			});
			setDecisions(saved.decisions ?? []);
		}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const payload = {
			house,
			stated,
			decisions
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	}, [
		house,
		stated,
		decisions,
		hydrated
	]);
	const week = decisions.reduce((m, d) => Math.max(m, d.week), 1);
	const rules = (0, import_react.useMemo)(() => learnUpTo(decisions, week, stated), [
		decisions,
		week,
		stated
	]);
	const spent = decisions.reduce((a, d) => a + d.amount, 0);
	const line = headline(rules, stated);
	const lead = rules.find((r) => r.kind === "solo_cap" && !isAdopted(r, stated)) ?? null;
	function openHouse(next, nextStated, nextDecisions) {
		setHouse(next);
		setStated(nextStated);
		setDecisions(nextDecisions);
		setView("home");
		setLogging(false);
	}
	function adopt(rule) {
		if (isAdopted(rule, stated)) return;
		setStated((s) => {
			if (rule.kind === "solo_cap" && rule.category && rule.cap != null) return {
				...s,
				caps: {
					...s.caps,
					[rule.category]: rule.cap
				}
			};
			if (rule.kind === "never_discussed") return {
				...s,
				silenceUnder: true
			};
			if (rule.kind === "false_dual") return {
				...s,
				treatFastDualAsSingle: true
			};
			if (rule.kind === "rhythm") return {
				...s,
				rhythms: [...s.rhythms, rule.id]
			};
			if (rule.kind === "allowance") return {
				...s,
				allowances: [...s.allowances, rule.id]
			};
			return s;
		});
	}
	function addDecision(next) {
		setDecisions((prev) => [...prev, next]);
		setLogging(false);
		setView("home");
	}
	function startOver() {
		localStorage.removeItem(STORAGE_KEY);
		setHouse(null);
		setStated(DEFAULT_STATED);
		setDecisions([]);
		setView("home");
		setLogging(false);
	}
	function exportFile() {
		if (!house) return;
		const memories = buildMemories(decisions, house.name, stated, rules);
		const blob = new Blob([JSON.stringify({
			house,
			stated,
			decisions,
			rules,
			memories
		}, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "rulesync.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-screen bg-paper" });
	if (!house) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Setup, {
		onStart: (name, members, solo, dual) => openHouse({
			name,
			members,
			startedAt: (/* @__PURE__ */ new Date()).toISOString(),
			sample: false
		}, {
			...DEFAULT_STATED,
			soloLimit: solo,
			dualAbove: dual
		}, []),
		onSample: () => openHouse({
			name: "Ash House",
			members: [
				"Alex",
				"Sam",
				"Max"
			],
			startedAt: SAMPLE_START,
			sample: true
		}, {
			...DEFAULT_STATED,
			soloLimit: 18,
			dualAbove: 100
		}, SEED.map((d) => ({ ...d })))
	});
	const recent = [...decisions].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-screen max-w-lg flex-col px-5 pb-28 pt-8 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "rise flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base tracking-tight text-ink",
							children: "RuleSync"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(view === "home" ? "rules" : "home"),
						className: "press inline-flex min-h-11 items-center gap-2 text-sm text-ink",
						children: [view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesMark, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeMark, {}), view === "home" ? "Rules" : "Home"]
					})]
				}), view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 flex flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rise text-sm text-mist",
							style: { animationDelay: "80ms" },
							children: [house.name, house.sample ? " · sample" : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "rise mt-3 font-display text-6xl leading-none tracking-tight sm:text-7xl",
							style: { animationDelay: "140ms" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { value: spent })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rise mt-3 text-sm text-mist",
							style: { animationDelay: "200ms" },
							children: decisions.length === 0 ? "Nothing logged yet." : `${decisions.length} spends · floor ${money(stated.soloLimit)} · two names over ${money(stated.dualAbove)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rise mt-10",
							style: { animationDelay: "280ms" },
							children: decisions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl leading-tight",
								children: "Log a few spends. A rule appears once the house repeats itself."
							}) : line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => lead ? adopt(lead) : setView("rules"),
								className: "press w-full rounded-3xl bg-ink px-5 py-6 text-left text-paper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl leading-snug",
									children: line
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-paper/70",
									children: lead && !isAdopted(lead, stated) ? "Adopt this" : "See the rules"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl leading-tight",
								children: "The written rules and the lived ones match."
							})
						}),
						recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 divide-y divide-line",
							children: recent.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rise flex items-center justify-between gap-4 py-3",
								style: { animationDelay: `${360 + i * 60}ms` },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-10 items-center justify-center rounded-2xl bg-panel-2 text-ink",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGlyph, { id: d.category })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate",
											children: d.merchant
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-mist",
											children: [
												d.member,
												" · ",
												categoryLabel(d.category)
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "shrink-0 tabular-nums",
									children: money(d.amount)
								})]
							}, d.id))
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesView, {
					stated,
					rules,
					onAdopt: adopt,
					onExport: exportFile,
					onReset: startOver
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-paper via-paper to-transparent px-5 pt-8 pb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setLogging(true),
						className: "press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusMark, {}), "Log a spend"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogSheet, {
				open: logging,
				house,
				stated,
				rules,
				onClose: () => setLogging(false),
				onSave: addDecision
			})
		]
	});
}
function Count({ value }) {
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setN(value);
			return;
		}
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / 800);
			const e = 1 - (1 - p) ** 3;
			setN(value * e);
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [value]);
	const shown = value % 1 === 0 ? Math.round(n) : n;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: money(shown)
	});
}
function Setup({ onStart, onSample }) {
	const [name, setName] = (0, import_react.useState)("");
	const [people, setPeople] = (0, import_react.useState)("You");
	const [solo, setSolo] = (0, import_react.useState)("40");
	const [dual, setDual] = (0, import_react.useState)("200");
	const members = people.split(",").map((p) => p.trim()).filter(Boolean);
	const soloN = Number(solo);
	const dualN = Number(dual);
	const ready = name.trim().length > 0 && members.length > 0 && soloN > 0 && dualN > soloN;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-paper text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen max-w-lg flex-col px-5 pt-16 pb-10 sm:px-6 sm:pt-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rise flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { size: 36 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base tracking-tight text-ink",
						children: "RuleSync"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "rise mt-4 font-display text-5xl leading-[0.95] sm:text-6xl",
					style: { animationDelay: "90ms" },
					children: [
						"The rules you wrote.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"The rules you keep."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rise mt-10 grid gap-3",
					style: { animationDelay: "180ms" },
					onSubmit: (e) => {
						e.preventDefault();
						if (!ready) return;
						onStart(name.trim(), members, soloN, dualN);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "House",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeMark, { size: 14 }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "North House",
								className: "min-h-12 w-full bg-transparent font-display text-2xl outline-none placeholder:text-line"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "People, separated by commas",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairMark, { size: 14 }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: people,
								onChange: (e) => setPeople(e.target.value),
								className: "min-h-12 w-full bg-transparent text-lg outline-none"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Alone, no talk",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, { size: 14 }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "decimal",
									value: solo,
									onChange: (e) => setSolo(e.target.value),
									className: "min-h-12 w-full bg-transparent text-lg tabular-nums outline-none"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Two names above",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairMark, { size: 14 }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "decimal",
									value: dual,
									onChange: (e) => setDual(e.target.value),
									className: "min-h-12 w-full bg-transparent text-lg tabular-nums outline-none"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: !ready,
							className: "press mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowMark, {}), "Open the house"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onSample,
							className: "press min-h-11 text-sm text-mist",
							children: "Or open the sample house"
						})
					]
				})
			]
		})
	});
}
function Field({ label, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block rounded-2xl border border-line bg-panel px-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 text-xs text-mist",
			children: [icon, label]
		}), children]
	});
}
function RulesView({ stated, rules, onAdopt, onExport, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "rise font-display text-4xl",
				children: "Rules"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "rise mt-6 grid grid-cols-2 gap-3",
				style: { animationDelay: "80ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-panel-2 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "flex items-center gap-1.5 text-xs text-mist",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonMark, {}), "Alone"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl",
						children: money(stated.soloLimit)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-panel-2 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "flex items-center gap-1.5 text-xs text-mist",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PairMark, {}), "Two names"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl",
						children: money(stated.dualAbove)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-8 grid gap-3",
				children: [rules.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-mist",
					children: "Nothing has repeated enough to call a rule."
				}), rules.map((rule, i) => {
					const on = isAdopted(rule, stated);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rise rounded-3xl border border-line bg-panel px-5 py-5",
						style: { animationDelay: `${140 + i * 70}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleGlyph, { kind: rule.kind })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl leading-snug",
									children: rule.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-mist",
								children: rule.evidence
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: on,
								onClick: () => onAdopt(rule),
								className: "press mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-accent disabled:text-mist",
								children: [on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckMark, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusMark, {}), on ? "On the books" : "Adopt"]
							})
						]
					}, rule.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex gap-6 text-sm text-mist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onExport,
					className: "press inline-flex min-h-11 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMark, {}), "Export"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onReset,
					className: "press inline-flex min-h-11 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetMark, {}), "Start over"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-mist",
				children: "Stays on this device until you export it."
			})
		]
	});
}
function LogSheet({ open, house, stated, rules, onClose, onSave }) {
	const [amount, setAmount] = (0, import_react.useState)("");
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [member, setMember] = (0, import_react.useState)(house.members[0] ?? "");
	const [category, setCategory] = (0, import_react.useState)("groceries");
	const [date, setDate] = (0, import_react.useState)(todayInput);
	const [discussed, setDiscussed] = (0, import_react.useState)(false);
	const [second, setSecond] = (0, import_react.useState)("");
	const [delay, setDelay] = (0, import_react.useState)("2");
	(0, import_react.useEffect)(() => {
		setMember(house.members[0] ?? "");
	}, [house.members]);
	const n = Number(amount);
	const weekday = weekdayFromDate(date);
	const approvals = second ? [member, second].filter((v, i, arr) => arr.indexOf(v) === i) : [member];
	const verdict = Number.isFinite(n) && n > 0 ? judgeSpend({
		member,
		category,
		amount: n,
		discussed,
		approvals,
		secondSignDelayMin: second ? Number(delay) || 0 : null,
		weekday
	}, stated, rules) : null;
	function save() {
		if (!verdict || !merchant.trim()) return;
		const at = (/* @__PURE__ */ new Date(`${date}T12:00:00`)).toISOString();
		onSave({
			id: `you-${Date.now()}`,
			week: weekOf(at, house.startedAt),
			weekday,
			at,
			member,
			category,
			merchant: merchant.trim(),
			amount: Math.round(n * 100) / 100,
			discussed,
			approvals,
			secondSignDelayMin: second ? Number(delay) || 0 : null,
			source: "you"
		});
		setAmount("");
		setMerchant("");
		setDiscussed(false);
		setSecond("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `fixed inset-0 z-20 ${open ? "" : "pointer-events-none"}`,
		"aria-hidden": !open,
		inert: open ? void 0 : true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			onClick: onClose,
			className: `absolute inset-0 bg-ink/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Log a spend",
			className: `sheet absolute inset-x-0 bottom-0 mx-auto max-h-screen max-w-lg overflow-y-auto rounded-t-3xl bg-panel px-5 pt-4 pb-8 sm:px-6 ${open ? "translate-y-0" : "translate-y-full"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-5 h-1 w-10 rounded-full bg-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-mist",
							children: "Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: "0",
							className: "mt-1 w-full bg-transparent font-display text-6xl tabular-nums outline-none placeholder:text-line"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "press min-h-11 text-sm text-mist",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-mist",
						children: "Where"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: merchant,
						onChange: (e) => setMerchant(e.target.value),
						placeholder: "Market",
						className: "mt-1 min-h-11 w-full bg-transparent text-lg outline-none placeholder:text-line"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: house.members.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMember(person),
						className: `press min-h-11 rounded-full px-4 text-sm ${member === person ? "bg-ink text-paper" : "bg-panel-2 text-ink"}`,
						children: person
					}, person))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-3 gap-2",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setCategory(c.id),
						className: `press flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-xs ${category === c.id ? "bg-ink text-paper" : "bg-panel-2 text-ink"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGlyph, { id: c.id }), c.label]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-mist",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex min-h-11 items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: discussed,
						onChange: (e) => setDiscussed(e.target.checked),
						className: "size-4 accent-accent"
					}), "Talked about it first"]
				}),
				house.members.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-mist",
						children: "Second name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: second,
						onChange: (e) => setSecond(e.target.value),
						className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "None"
						}), house.members.filter((p) => p !== member).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))]
					})]
				}),
				second && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-mist",
						children: "Minutes until they signed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						value: delay,
						onChange: (e) => setDelay(e.target.value),
						className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 tabular-nums"
					})]
				}),
				verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `mt-5 rounded-2xl px-4 py-4 transition-colors duration-300 ${verdict.tone === "break" ? "bg-ink text-paper" : "bg-panel-2 text-ink"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: verdict.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 text-sm ${verdict.tone === "break" ? "text-paper/70" : "text-mist"}`,
						children: verdict.lines[0]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !verdict || !merchant.trim(),
					onClick: save,
					className: "press mt-5 min-h-12 w-full rounded-full bg-accent text-sm font-medium text-accent-ink disabled:opacity-40",
					children: "Save"
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleSyncApp, {});
}
//#endregion
export { Home as component };
