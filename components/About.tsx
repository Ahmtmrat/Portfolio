"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureTile } from "@/components/ui/FeatureTile";
import { Reveal } from "@/components/ui/Reveal";

/** One tile per star-tint family: turquoise, periwinkle, amber. */
const PILLARS = [
  { key: "backend", tint: 1 },
  { key: "integration", tint: 2 },
  { key: "fullstack", tint: 3 },
] as const;

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section surface-fade">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />
        <div className="grid gap-[var(--sp-5)] sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => {
            const copy = t.about.pillars[p.key];
            return (
              <Reveal key={p.key} delay={i * 90}>
                <FeatureTile
                  eyebrow={copy.eyebrow}
                  title={copy.title}
                  body={copy.body}
                  tint={p.tint}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
