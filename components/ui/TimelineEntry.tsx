import { Chip } from "./Chip";

type Props = {
  role: string;
  period: string;
  company: string;
  tags?: string[];
  bullets?: string[];
  current?: boolean;
  currentLabel?: string;
};

/** A hairline-separated row: period/company on the left, the work on the right. */
export function TimelineEntry({
  role,
  period,
  company,
  tags = [],
  bullets = [],
  current = false,
  currentLabel = "Current",
}: Props) {
  return (
    <div className="timeline-entry">
      <div>
        <div
          className="t-caption"
          style={{ color: "var(--ink-500)", fontWeight: "var(--fw-medium)" }}
        >
          {period}
        </div>
        <div
          className="mt-[var(--sp-2)]"
          style={{
            font: "var(--fw-semibold) var(--fs-body)/1.3 var(--font-sans)",
            color: "var(--ink-900)",
          }}
        >
          {company}
        </div>
        {current && (
          <div
            className="mt-[var(--sp-3)] inline-flex items-center gap-[6px]"
            style={{
              font: "var(--fw-medium) var(--fs-micro)/1 var(--font-sans)",
              color: "var(--status-available)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
              }}
            />
            {currentLabel}
          </div>
        )}
      </div>

      <div>
        <h3 className="t-h4" style={{ margin: 0, color: "var(--ink-900)" }}>
          {role}
        </h3>
        {tags.length > 0 && (
          <div className="mt-[var(--sp-4)] flex flex-wrap gap-[var(--sp-2)]">
            {tags.map((t) => (
              <Chip key={t} tone="outline" size="small">
                {t}
              </Chip>
            ))}
          </div>
        )}
        {bullets.length > 0 && (
          <ul className="bullet-list mt-[var(--sp-5)]">
            {bullets.map((b) => (
              <li key={b}>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
