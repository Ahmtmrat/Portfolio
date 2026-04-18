"use client";
import { skills } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

const categoryDot: Record<string, string> = {
  "Backend":        "bg-[#3a5a7a]",
  "Frontend":       "bg-[#5a3a7a]",
  "Databases":      "bg-[#3a7a5a]",
  "Architecture":   "bg-[#5a5a5a]",
  "Integration":    "bg-[#7a5a3a]",
  "Tools & DevOps": "bg-[#6a3a4a]",
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="px-6 py-28 max-w-5xl mx-auto">

      <div className="mb-14">
        <p className="section-label mb-4">04 — {t.skills.title}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Technical Stack</h2>
        <div className="sep mt-6" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((group) => (
          <div key={group.category} className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryDot[group.category] ?? "bg-[#333]"}`} />
              <h3 className="text-[10px] font-mono text-[#444] uppercase tracking-[0.12em]">
                {t.cv.skillCategories[group.category as keyof typeof t.cv.skillCategories] ?? group.category}
              </h3>
            </div>
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
