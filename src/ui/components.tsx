import type { ReactNode } from "react";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-xl flex-col px-4 pb-10 pt-5">
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "soft";
  disabled?: boolean;
  full?: boolean;
}) {
  const base =
    "rounded-2xl px-5 py-3 text-base font-semibold transition active:translate-y-px disabled:opacity-40";
  const styles = {
    primary: "bg-teal text-ink shadow-lg shadow-teal/20",
    soft: "bg-card-2 text-fog border border-line",
    ghost: "text-fog-soft hover:text-fog",
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-card p-4 ${className}`}
    >
      {children}
    </div>
  );
}

/** Horizontal readiness bar, 0..100. */
export function ReadinessBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const color =
    value >= 80 ? "bg-good" : value >= 60 ? "bg-teal" : value >= 40 ? "bg-warn" : "bg-bad";
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-fog-soft">{label}</span>
          <span className="tabular-nums text-fog">{value}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${Math.max(2, value)}%` }}
        />
      </div>
    </div>
  );
}
