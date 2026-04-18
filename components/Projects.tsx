"use client";
import { useLanguage } from "@/context/LanguageContext";

const domainColor: Record<string, string> = {
  "Healthcare":              "text-[#4a7a5a]",
  "Fintech / Security":      "text-[#7a6a3a]",
  "AgriTech / Industrial":   "text-[#5a6a3a]",
  "Logistics / Finance":     "text-[#3a5a7a]",
  "Sağlık Bilişimi":         "text-[#4a7a5a]",
  "Fintek / Güvenlik":       "text-[#7a6a3a]",
  "Tarım Teknolojisi / Endüstriyel": "text-[#5a6a3a]",
  "Lojistik / Finans":       "text-[#3a5a7a]",
};

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-6 py-28 max-w-5xl mx-auto">

      <div className="mb-14">
        <p className="section-label mb-4">02 — {t.projects.title}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Production Systems</h2>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-[11px] font-mono text-[#333] border border-[#1a1a1a] rounded-full px-3 py-0.5 bg-[#0f0f0f]">
            ⚠ {t.projects.restricted}
          </span>
        </div>
        <div className="sep mt-6" />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {t.cv.projects.map((p) => (
          <div key={p.title} className="card p-5 flex flex-col group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#ccc] group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <span className={`text-[10px] font-mono mt-1 inline-block ${domainColor[p.domain] ?? "text-[#555]"}`}>
                  {p.domain}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#333] border border-[#1a1a1a] rounded-full px-2.5 py-0.5 shrink-0 whitespace-nowrap bg-[#0c0c0c]">
                <span className="w-1 h-1 rounded-full bg-[#3d6a3d]" />
                {t.projects.status_production}
              </span>
            </div>

            <p className="text-sm text-[#555] mb-4 leading-relaxed flex-1">{p.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {p.highlights.map((h) => (
                <span key={h} className="text-[10px] font-mono text-[#444] bg-[#0c0c0c] border border-[#181818] rounded px-2 py-0.5">
                  {h}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#141414]">
              {p.tech.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
