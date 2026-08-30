export type Tint = 1 | 2 | 3;

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  /** Which of the three star-tint glass families this tile belongs to. */
  tint?: Tint;
  tone?: "light" | "dark";
  minHeight?: number;
};

export function FeatureTile({
  eyebrow,
  title,
  body,
  tint = 1,
  tone = "dark",
  minHeight = 330,
}: Props) {
  const dark = tone === "dark";

  return (
    <div className={`tile glass-${tint}`} style={{ minHeight }}>
      {eyebrow && (
        <div
          className="t-caption mb-[var(--sp-3)]"
          style={{ color: dark ? "var(--text-inverse-dim)" : "var(--ink-500)" }}
        >
          {eyebrow}
        </div>
      )}
      <h3
        style={{
          margin: 0,
          font: "var(--fw-semibold) var(--fs-h4)/1.22 var(--font-sans)",
          letterSpacing: "var(--ls-h4)",
          color: dark ? "#fff" : "var(--ink-900)",
          maxWidth: "20ch",
          textWrap: "balance",
        }}
      >
        {title}
      </h3>
      {body && (
        <p
          className="t-body"
          style={{
            margin: "var(--sp-4) 0 0",
            color: dark ? "var(--text-inverse-dim)" : "var(--ink-600)",
            maxWidth: "34ch",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
