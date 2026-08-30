"use client";

import { metrics } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { StatBlock } from "@/components/ui/StatBlock";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      // svh rather than vh: on mobile, vh counts the space the browser chrome
      // is covering, so the last stat row sits under the address bar.
      className="section-hero surface-page flex min-h-[100svh] items-center justify-center"
    >
      <div className="shell flex flex-col items-center gap-[var(--sp-5)] text-center">
        <div
          className="wordmark"
          style={{ width: 92, height: 92, fontSize: 30 }}
          aria-hidden="true"
        >
          AMY
        </div>

        <Badge status="available">{t.hero.badge}</Badge>

        <h1
          className="t-display"
          style={{ margin: 0, color: "var(--ink-900)", maxWidth: "16ch" }}
        >
          {t.hero.headline}
        </h1>

        <p
          className="t-lead"
          style={{ margin: 0, color: "var(--text-secondary)", maxWidth: "62ch" }}
        >
          {t.hero.lead}
        </p>

        <div className="mt-[var(--sp-2)] flex flex-wrap justify-center gap-[var(--sp-4)]">
          <ButtonLink href="#projects" size="large">
            {t.hero.cta_projects}
          </ButtonLink>
          <ButtonLink href="#contact" size="large" variant="secondary">
            {t.hero.cta_contact}
          </ButtonLink>
        </div>

        <div
          className="mt-[var(--sp-8)] flex w-full flex-wrap justify-center gap-x-[var(--sp-16)] gap-y-[var(--sp-5)] pt-[var(--sp-6)]"
          style={{ borderTop: "1px solid var(--border-hairline)" }}
        >
          {metrics.map((m) => (
            <StatBlock
              key={m.id}
              size="large"
              align="center"
              value={m.value}
              label={t.cv.metrics[m.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
