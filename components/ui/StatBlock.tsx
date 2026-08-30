type Props = {
  value: string;
  label: string;
  size?: "small" | "medium" | "large";
  tone?: "light" | "dark";
  align?: "left" | "center";
};

const VALUE_SIZE = {
  small: "var(--fs-h4)",
  medium: "var(--fs-h3)",
  large: "var(--fs-h1)",
} as const;

export function StatBlock({
  value,
  label,
  size = "medium",
  tone = "light",
  align = "left",
}: Props) {
  const dark = tone === "dark";

  return (
    <div className="flex flex-col gap-[var(--sp-1)]" style={{ textAlign: align }}>
      <div
        style={{
          font: `var(--fw-semibold) ${VALUE_SIZE[size]}/1 var(--font-sans)`,
          letterSpacing: "var(--ls-h3)",
          color: dark ? "#fff" : "var(--ink-900)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        className="t-caption"
        style={{ color: dark ? "var(--text-inverse-dim)" : "var(--ink-500)" }}
      >
        {label}
      </div>
    </div>
  );
}
