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
  "perf-middleware":   "perf_middleware",
  "exception-handler": "exception_handler",
  "autofac-module":   "autofac_module",
  "jwt-token":        "jwt_token",
  "can-bus":          "can_bus",
  "cqrs-handler":     "cqrs_handler",
  "signalr-hub":      "signalr_hub",
  "erp-worker":       "erp_worker",
  "quartz-job":         "quartz_job",
  "permission-auth":    "permission_auth",
  "request-response-log": "request_response_log",
};

export default function CodeShowcaseClient({ snippets }: { snippets: SnippetMeta[] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(snippets[0]?.id ?? null);

  return (
    <section id="code" className="px-6 py-24 max-w-5xl mx-auto">

      <div className="flex items-center gap-4 mb-10">
        <span className="num">03</span>
        <div className="flex-1 sep" />
        <h2 className="text-sm font-mono text-[#888] uppercase tracking-widest">{t.code.title}</h2>
      </div>

      <p className="text-[#444] text-sm font-mono mb-8">{t.code.subtitle}</p>

      <div className="space-y-2">
        {snippets.map((s) => {
          const key = snippetKey[s.id];
          const snippet = t.snippets[key];
          const isOpen = expanded === s.id;

          return (
            <div key={s.id} className="terminal">
              {/* Header */}
              <button
                className="w-full terminal-bar gap-3 text-left hover:bg-[#111] transition-colors cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : s.id)}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] shrink-0" />

                <span className="flex-1 ml-1">
                  <span className="text-sm font-medium text-[#bbb] group-hover:text-[#f5f5f5] transition-colors">
                    {snippet.title}
                  </span>
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline text-[10px] font-mono text-[#333]">{s.project}</span>
                  <span className="tag">{s.projectTag}</span>
                  <span className={`text-[10px] text-[#333] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>

              {isOpen && (
                <>
                  <div className="px-5 py-3 border-b border-[#1a1a1a]">
                    <p className="text-xs font-mono text-[#444] leading-relaxed max-w-2xl">
                      <span className="text-[#2a2a2a]">// </span>
                      {snippet.description}
                    </p>
                  </div>
                  <div
                    className="text-xs leading-relaxed overflow-x-auto px-2 py-2"
                    dangerouslySetInnerHTML={{ __html: s.highlightedHtml }}
                    style={{ background: "transparent" }}
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
