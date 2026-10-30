import type { ReactNode } from "react";
import type { Category, RuleKind } from "@/lib/rulesync/types";

function Mark({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mark shrink-0"
    >
      {children}
    </svg>
  );
}

export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <rect width="64" height="64" rx="14" fill="#1c1915" />
      <path
        fill="#f6f3ee"
        fillRule="evenodd"
        d="M14 15 H38 A9 9 0 0 1 38 33 H14 Z M44 33 m-7.5 0 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0"
      />
      <path fill="#f6f3ee" d="M14 41 H33 L49 55 H14 Z" />
    </svg>
  );
}

export function HomeMark({ size = 18 }: { size?: number }) {
  return (
    <Mark size={size}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M7 10.5V19h10v-8.5" />
    </Mark>
  );
}

export function RulesMark() {
  return (
    <Mark>
      <path d="M6 7h12" />
      <path d="M6 12h12" />
      <path d="M6 17h8" />
    </Mark>
  );
}

export function PlusMark({ size = 16 }: { size?: number }) {
  return (
    <Mark size={size}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Mark>
  );
}

export function CheckMark({ size = 16 }: { size?: number }) {
  return (
    <Mark size={size}>
      <path d="M5 12.5 10 17.5 19 7" />
    </Mark>
  );
}

export function ExportMark() {
  return (
    <Mark>
      <path d="M12 4v10" />
      <path d="M8 8l4-4 4 4" />
      <path d="M5 15v4h14v-4" />
    </Mark>
  );
}

export function ResetMark() {
  return (
    <Mark>
      <path d="M5 12a7 7 0 1 0 2-5" />
      <path d="M5 4v4h4" />
    </Mark>
  );
}

export function ArrowMark({ size = 16 }: { size?: number }) {
  return (
    <Mark size={size}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Mark>
  );
}

export function PersonMark({ size = 18 }: { size?: number }) {
  return (
    <Mark size={size}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19c1.2-3 3.2-4.5 6-4.5S16.8 16 18 19" />
    </Mark>
  );
}

export function PairMark({ size = 18 }: { size?: number }) {
  return (
    <Mark size={size}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3.5 18c.8-2.4 2.2-3.5 4.5-3.5" />
      <path d="M20.5 18c-.8-2.4-2.2-3.5-4.5-3.5" />
    </Mark>
  );
}

export function CategoryGlyph({ id, size = 18 }: { id: Category; size?: number }) {
  if (id === "groceries") {
    return (
      <Mark size={size}>
        <path d="M7 9h10l-1 11H8L7 9Z" />
        <path d="M9 9V8a3 3 0 0 1 6 0v1" />
      </Mark>
    );
  }
  if (id === "fastfood") {
    return (
      <Mark size={size}>
        <path d="M5 11h14" />
        <path d="M7 11c.4 5 2.4 8 5 8s4.6-3 5-8" />
        <path d="M12 6v3" />
      </Mark>
    );
  }
  if (id === "games") {
    return (
      <Mark size={size}>
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M12 9v6" />
        <path d="M9 12h6" />
      </Mark>
    );
  }
  if (id === "rent") {
    return (
      <Mark size={size}>
        <path d="M5 20V9l7-4 7 4v11" />
        <path d="M10 20v-6h4v6" />
      </Mark>
    );
  }
  if (id === "utilities") {
    return (
      <Mark size={size}>
        <path d="M13 3 6 13h6l-1 8 8-11h-6L13 3" />
      </Mark>
    );
  }
  return (
    <Mark size={size}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 12h.01" />
    </Mark>
  );
}

export function RuleGlyph({ kind }: { kind: RuleKind }) {
  if (kind === "rhythm") {
    return (
      <Mark>
        <path d="M6 16V9" />
        <path d="M12 16V7" />
        <path d="M18 16V11" />
      </Mark>
    );
  }
  if (kind === "solo_cap") return <PersonMark />;
  if (kind === "allowance") {
    return (
      <Mark>
        <path d="M5 18V6" />
        <path d="M5 18h14" />
        <path d="M9 18V11" />
        <path d="M13 18V8" />
        <path d="M17 18v-4" />
      </Mark>
    );
  }
  if (kind === "false_dual") {
    return (
      <Mark>
        <circle cx="9" cy="12" r="4" />
        <circle cx="15" cy="12" r="4" />
      </Mark>
    );
  }
  return (
    <Mark>
      <path d="M4 12h6" />
      <path d="M14 12h6" />
    </Mark>
  );
}
