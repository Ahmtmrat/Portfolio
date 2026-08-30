import type { ReactNode } from "react";
import { Chip } from "./Chip";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  tags?: string[];
  media?: ReactNode;
  footer?: ReactNode;
  tone?: "light" | "dark";
  /** Which star-tint glass family the card belongs to. */
  tint?: 1 | 2 | 3;
  /** When set, the whole card becomes one keyboard-reachable control. */
  onSelect?: () => void;
  selectLabel?: string;
};

/**
 * 28px radius, no border — separation comes from shadow only, lifting 4px on
 * hover. Selectable cards use a stretched pseudo-element on the title button
 * so the entire card is clickable while the markup stays valid.
 */
export function ProjectCard({
  eyebrow,
  title,
  description,
  tags = [],
  media,
  footer,
  tone = "dark",
  tint,
  onSelect,
  selectLabel,
}: Props) {
  const dark = tone === "dark";
  const classes = ["card", tint ? `glass-${tint}` : "", onSelect ? "card-selectable" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      {media && <div className="card-media">{media}</div>}
      <div className="card-body">
        {eyebrow && (
          <div className={`eyebrow${dark ? " eyebrow-inverse" : ""}`}>{eyebrow}</div>
        )}
        <h3
          className="t-h4"
          style={{ margin: 0, color: dark ? "#fff" : "var(--text-primary)" }}
        >
          {onSelect ? (
            <button type="button" className="card-stretch" onClick={onSelect} aria-label={selectLabel}>
              {title}
            </button>
          ) : (
            title
          )}
        </h3>
        {description && (
          <p
            className="t-body"
            style={{
              margin: 0,
              color: dark ? "var(--text-inverse-dim)" : "var(--text-secondary)",
            }}
          >
            {description}
          </p>
        )}
        {tags.length > 0 && (
          <div className="mt-[var(--sp-2)] flex flex-wrap gap-[var(--sp-2)]">
            {tags.map((t) => (
              <Chip key={t} tone={dark ? "dark" : "neutral"} size="small">
                {t}
              </Chip>
            ))}
          </div>
        )}
        {footer && <div className="mt-auto pt-[var(--sp-5)]">{footer}</div>}
      </div>
    </article>
  );
}
