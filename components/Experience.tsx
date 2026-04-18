"use client";
import { experiences } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="px-6 py-28 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-1)] mb-3">{t.experience.title}</h2>
        <p className="text-[var(--text-3)] text-sm">{t.experience.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />

        <div className="space-y-8">
          {experiences.map((exp, i) => {
            const tExp = t.cv.experiences[i];
            return (
              <div key={i} className="pl-8 relative">
                <div className="absolute left-0 top-[10px] w-3.5 h-3.5 rounded-full bg-[#6366f1]/20 border-2 border-[#6366f1]" />
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-[var(--text-1)] font-semibold text-base">{exp.role}</h3>
                    <span className="text-xs font-mono text-[var(--text-3)]">{exp.period}</span>
                  </div>
                  <p className="text-[#6366f1] text-sm font-medium mb-3">{exp.company}</p>

                  {exp.projects.map((proj, j) => {
                    const tProj = tExp?.projects[j];
                    return (
                      <div key={j}>
                        {proj.name && (
                          <div className="flex flex-wrap items-center gap-2 mb-3 mt-4 first:mt-0">
                            <span className="text-sm font-medium text-[var(--text-2)]">{proj.name}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {proj.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        <ul className="space-y-2">
                          {(tProj?.bullets ?? []).map((b, k) => (
                            <li key={k} className="flex gap-2.5 text-sm text-[var(--text-3)] leading-relaxed">
                              <span className="text-[#6366f1] mt-[3px] shrink-0">→</span>
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
