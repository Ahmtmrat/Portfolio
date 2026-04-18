"use client";
import { experiences } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="px-6 py-28 max-w-5xl mx-auto">

      <div className="mb-14">
        <p className="section-label mb-4">01 — {t.experience.title}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{t.experience.subtitle}</h2>
        <div className="sep mt-6" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1a1a1a] ml-[3px] hidden sm:block" />

        <div className="space-y-14">
          {experiences.map((exp, i) => {
            const tExp = t.cv.experiences[i];
            return (
              <div key={i} className="sm:pl-8 relative">
                <div className="hidden sm:block absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[#2a2a2a] border border-[#3a3a3a]" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-semibold text-white">{exp.role}</span>
                    <span className="text-[#2a2a2a] font-mono">·</span>
                    <span className="text-[#666] text-sm">{exp.company}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#333] bg-[#0f0f0f] border border-[#1a1a1a] px-2.5 py-0.5 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#2a2a2a] mb-6">{exp.location}</p>

                <div className="space-y-3">
                  {exp.projects.map((proj, j) => {
                    const tProj = tExp?.projects[j];
                    return (
                      <div key={j} className={proj.name ? "card p-5" : ""}>
                        {proj.name && (
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-sm font-medium text-[#ccc]">{proj.name}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {proj.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        <ul className="space-y-2.5">
                          {(tProj?.bullets ?? []).map((b, k) => (
                            <li key={k} className="flex gap-2.5 text-sm text-[#555] leading-relaxed">
                              <span className="text-[#2a2a2a] mt-[6px] shrink-0 font-mono">—</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
