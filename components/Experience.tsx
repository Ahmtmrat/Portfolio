"use client";

import { experiences } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineEntry } from "@/components/ui/TimelineEntry";
import { Reveal } from "@/components/ui/Reveal";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section surface-alt">
      <div className="shell">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />
        {experiences.map((exp) => {
          const copy = t.cv.experiences[exp.id];
          return (
            <Reveal key={exp.id}>
              <TimelineEntry
                period={exp.period}
                company={exp.company}
                role={copy.role}
                tags={exp.tags}
                bullets={copy.bullets}
                current={exp.current}
                currentLabel={t.experience.current}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
