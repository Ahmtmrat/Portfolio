"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type SnippetMeta = {
  id: string;
  project: string;
  projectTag: string;
  highlightedHtml: string;
};

const snippetKey: Record<string, keyof ReturnType<typeof useLanguage>["t"]["snippets"]> = {
  "perf-middleware":      "perf_middleware",
  "exception-handler":   "exception_handler",
  "autofac-module":      "autofac_module",
  "jwt-token":           "jwt_token",
  "can-bus":             "can_bus",
  "cqrs-handler":        "cqrs_handler",
  "signalr-hub":         "signalr_hub",
  "erp-worker":          "erp_worker",
  "quartz-job":          "quartz_job",
  "permission-auth":     "permission_auth",
  "request-response-log":"request_response_log",
};

export default function CodeShowcaseClient({ snippets }: { snippets: SnippetMeta[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(snippets[0]?.id ?? null);

  return (
    <section id="code" className="px-6 py-28 max-w-6xl mx-auto">

      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-1)] mb-3">{t.code.title}</h2>
        <p className="text-[var(--text-3)] text-sm">{t.code.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-2">
        {snippets.map((s) => {
          const key = snippetKey[s.id];
          const snippet = t.snippets[key];
          const isOpen = expanded === s.id;

          return (
            <div key={s.id} className="overflow-hidden rounded-xl border border-[var(--border)] hover:border-[var(--border-2)] transition-colors">

              {/* Accordion header — theme-aware */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--bg-1)] hover:bg-[var(--bg-2)] text-left transition-colors cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : s.id)}
              >
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>

                <span className="flex-1 text-sm font-medium text-[var(--text-1)]">
                  {snippet.title}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline text-[10px] font-mono text-[var(--text-3)]">{s.project}</span>
                  <span className="tag">{s.projectTag}</span>
                  <span className={`text-[10px] text-[var(--text-3)] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>

              {isOpen && (
                <>
                  {/* Description — theme-aware */}
                  <div className="px-5 py-3 bg-[var(--bg-2)] border-t border-[var(--border)] border-b border-[#1e1e2e]">
                    <p className="text-xs font-mono text-[var(--text-3)] leading-relaxed max-w-2xl">
                      <span className="text-[var(--text-4)]">// </span>
                      {snippet.description}
                    </p>
                  </div>

                  {/* Code block — always dark */}
                  <div
                    className="text-xs leading-relaxed overflow-x-auto px-2 py-2"
                    style={{ background: "#111118" }}
                    dangerouslySetInnerHTML={{ __html: s.highlightedHtml }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
