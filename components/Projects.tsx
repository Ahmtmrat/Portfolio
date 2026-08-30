"use client";

import { useState } from "react";
import { projects, type ProjectId } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ChipRail } from "@/components/ui/ChipRail";
import { LinkArrow } from "@/components/ui/LinkArrow";

export default function Projects() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<ProjectId>("lis");

  const featured = projects.find((p) => p.id === activeId) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);
  const featuredCopy = t.cv.projects[featured.id];

  return (
    <section id="projects" className="section surface-alt">
      <div className="shell-wide">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          action={<LinkArrow href="#contact">{t.projects.action}</LinkArrow>}
        />

        <ChipRail
          label={t.projects.select}
          activeId={activeId}
          onSelect={(id) => setActiveId(id as ProjectId)}
          items={projects.map((p) => ({
            id: p.id,
            label: t.cv.projects[p.id].label,
            glyph: p.glyph,
            note: p.id === "iot" ? "CAN Bus" : undefined,
            tint: p.tint,
          }))}
        />

        <div className="mt-[var(--sp-10)] grid items-stretch gap-[var(--sp-5)] lg:grid-cols-[1.15fr_1fr]">
          <ProjectCard
            eyebrow={featuredCopy.eyebrow}
            title={featuredCopy.title}
            description={featuredCopy.description}
            tags={featured.tech}
            tint={featured.tint}
            media={
              <div
                className={`grid h-full w-full place-items-center glass-${featured.tint}`}
                aria-hidden="true"
              >
                <span
                  className={`tint-${featured.tint}-fg`}
                  style={{
                    font: "var(--fw-semibold) 72px/1 var(--font-mono)",
                    letterSpacing: "0.04em",
                    opacity: 0.9,
                  }}
                >
                  {featured.glyph}
                </span>
              </div>
            }
            footer={<LinkArrow href="#contact">{t.projects.walkthrough}</LinkArrow>}
          />

          <div className="grid gap-[var(--sp-5)] sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {rest.slice(0, 2).map((p) => {
              const copy = t.cv.projects[p.id];
              return (
                <ProjectCard
                  key={p.id}
                  eyebrow={copy.eyebrow}
                  title={copy.title}
                  description={copy.description}
                  tags={p.tech.slice(0, 4)}
                  tint={p.tint}
                  onSelect={() => setActiveId(p.id)}
                  selectLabel={`${t.projects.select}: ${copy.title}`}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-[var(--sp-5)] grid gap-[var(--sp-5)] sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((p) => {
            const copy = t.cv.projects[p.id];
            return (
              <ProjectCard
                key={p.id}
                eyebrow={copy.eyebrow}
                title={copy.title}
                description={copy.description}
                tags={p.tech.slice(0, 4)}
                tint={p.tint}
                onSelect={() => setActiveId(p.id)}
                selectLabel={`${t.projects.select}: ${copy.title}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
