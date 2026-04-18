"use client";
import { skills } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="px-6 py-28 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-1)] mb-3">{t.skills.title}</h2>
        <p className="text-[var(--text-3)] text-sm">Technologies and tools I work with</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
        {skills.map((group) => (
          <div key={group.category} className="min-w-[140px]">
            <h3 className="text-[10px] font-mono text-[var(--text-3)] uppercase tracking-[0.15em] mb-3">
              {t.cv.skillCategories[group.category as keyof typeof t.cv.skillCategories] ?? group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
