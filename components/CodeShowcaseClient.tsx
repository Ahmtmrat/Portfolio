"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { SnippetId } from "@/data/snippets";
import { SectionHeading } from "@/components/ui/SectionHeading";

type HighlightedSnippet = {
  id: SnippetId;
  file: string;
  project: string;
  projectTag: string;
  code: string;
  html: string;
};

export default function CodeShowcaseClient({
  snippets,
}: {
  snippets: HighlightedSnippet[];
}) {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<SnippetId>(snippets[0].id);
  const [copied, setCopied] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const selected = snippets.find((s) => s.id === openId) ?? snippets[0];
  const copy = t.snippets[selected.id];

  const select = (id: SnippetId) => {
    setOpenId(id);
    setCopied(false);
  };

  /** Roving tabindex: the tablist is one tab stop, arrows move within it. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const index = snippets.findIndex((s) => s.id === openId);
    const last = snippets.length - 1;
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? last
          : e.key === "ArrowDown"
            ? (index + 1) % snippets.length
            : (index - 1 + snippets.length) % snippets.length;

    select(snippets[next].id);
    tabsRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${snippets[next].id}`)
      ?.focus();
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(selected.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard is unavailable (insecure origin, denied permission) —
      // the code is on screen and selectable either way.
    }
  };

  return (
    <section id="code" className="section surface-alt">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={t.code.eyebrow}
          title={t.code.title}
          subtitle={t.code.subtitle}
        />

        <div className="grid items-start gap-[var(--sp-10)] lg:grid-cols-[380px_1fr]">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={t.code.list_label}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {snippets.map((s) => {
              const meta = `${s.project} · ${s.projectTag}`;
              const isOpen = s.id === openId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={isOpen}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={isOpen ? 0 : -1}
                  className="sample-row mb-[var(--sp-2)]"
                  onClick={() => select(s.id)}
                >
                  <div
                    style={{
                      font: `var(--fw-${isOpen ? "semibold" : "medium"}) var(--fs-body-sm)/1.35 var(--font-sans)`,
                      color: "var(--ink-900)",
                    }}
                  >
                    {t.snippets[s.id].title}
                  </div>
                  <div
                    className="t-micro mt-[2px]"
                    style={{ color: "var(--ink-500)" }}
                  >
                    {meta}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${selected.id}`}
            aria-labelledby={`tab-${selected.id}`}
            className="lg:sticky"
            style={{ top: "var(--sp-8)" }}
          >
            <p
              className="t-body"
              style={{
                margin: "0 0 var(--sp-5)",
                color: "var(--text-secondary)",
                maxWidth: "64ch",
              }}
            >
              {copy.description}
            </p>

            <div className="code-panel">
              <div className="code-panel-bar">
                <span
                  style={{
                    font: "var(--fw-medium) var(--fs-caption)/1 var(--font-mono)",
                    color: "rgba(255,255,255,.8)",
                  }}
                >
                  {selected.file}
                </span>
                <span className="flex items-center gap-[var(--sp-4)]">
                  <span
                    className="t-micro hidden sm:inline"
                    style={{ color: "var(--text-inverse-dim)" }}
                  >
                    {selected.projectTag}
                  </span>
                  <button
                    type="button"
                    onClick={onCopy}
                    aria-label={t.code.copy_label}
                    style={{
                      background: "rgba(255,255,255,.08)",
                      border: "1px solid var(--border-dark-hairline)",
                      color: "rgba(255,255,255,.85)",
                      borderRadius: "var(--r-pill)",
                      padding: "4px 12px",
                      font: "var(--fw-medium) var(--fs-micro)/1 var(--font-sans)",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? t.code.copied : t.code.copy}
                  </button>
                </span>
              </div>

              <div
                className="code-scroll"
                style={{ maxHeight: 430 }}
                // Shiki output, generated at build time from local source files.
                dangerouslySetInnerHTML={{ __html: selected.html }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
