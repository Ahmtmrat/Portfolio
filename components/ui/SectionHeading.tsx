import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Visual size only — the element stays an `h2` for document outline. */
  level?: 2 | 3;
  tone?: "light" | "dark";
  action?: ReactNode;
  id?: string;
};

/**
 * Big period-ended section headline with the eyebrow above it and an optional
 * chevron link pinned to the right — the organising device of every section.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  level = 2,
  tone = "light",
  action,
  id,
}: Props) {
  const inverse = tone === "dark";

  return (
    <header className="mb-[var(--sp-12)] flex flex-wrap items-end justify-between gap-[var(--sp-8)]">
      <div className="max-w-[760px]">
        {eyebrow && (
          <div className={`eyebrow mb-[var(--sp-4)]${inverse ? " eyebrow-inverse" : ""}`}>
            {eyebrow}
          </div>
        )}
        <h2
          id={id}
          className={level === 3 ? "t-h3" : "t-h2"}
          style={{ margin: 0, color: inverse ? "#fff" : "var(--text-primary)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="t-lead"
            style={{
              margin: "var(--sp-5) 0 0",
              color: inverse ? "var(--text-inverse-dim)" : "var(--text-secondary)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="pb-[6px]">{action}</div>}
    </header>
  );
}
