"use client";

import { skills } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-tight surface-alt">
      <div className="shell-wide">
        <SectionHeading
          level={3}
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />
        <div className="grid gap-[var(--sp-5)] sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            // Six groups over three tint families, so each row reads as a set.
            const tint = ((i % 3) + 1) as 1 | 2 | 3;
            return (
              <div
                key={group.id}
                className={`card glass-${tint} p-[var(--card-pad)]`}
              >
                <div className={`eyebrow tint-${tint}-fg`}>
                  {t.cv.skillCategories[group.id]}
                </div>
                <div className="mt-[var(--sp-4)] flex flex-wrap gap-[var(--sp-2)]">
                  {group.items.map((item) => (
                    <Chip key={item} tone="dark" size="small">
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
