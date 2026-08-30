type Item = {
  id: string;
  label: string;
  glyph: string;
  note?: string;
  tint: 1 | 2 | 3;
};

type Props = {
  items: Item[];
  activeId: string;
  onSelect: (id: string) => void;
  label: string;
};

/**
 * The rail of small subject tiles under a section heading — the reference
 * layout's organising device. The active tile carries the 2px accent ring.
 */
export function ChipRail({ items, activeId, onSelect, label }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap justify-center gap-[var(--sp-10)] px-[var(--gutter)] py-[var(--sp-8)]"
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="rail-tile"
          aria-pressed={item.id === activeId}
          onClick={() => onSelect(item.id)}
        >
          <span
            className={`rail-glyph glass-${item.tint} tint-${item.tint}-fg`}
            aria-hidden="true"
          >
            {item.glyph}
          </span>
          <span className="rail-label">{item.label}</span>
          {item.note && (
            <span
              style={{
                font: "var(--fw-medium) var(--fs-micro)/1 var(--font-sans)",
                color: "var(--amber-600)",
              }}
            >
              {item.note}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
