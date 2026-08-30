"use client";

import { personal } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

/**
 * `year` is resolved on the server and passed in — computing it here would let
 * the server and client disagree across a New Year boundary.
 */
export default function Footer({ year }: { year: number }) {
  const { t } = useLanguage();

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: `mailto:${personal.email}`, label: t.footer.email },
    { href: personal.github, label: t.contact.github },
  ];

  return (
    <footer className="surface-dark px-[var(--gutter)] pt-[var(--sp-16)] pb-[var(--sp-12)]">
      <div className="shell-wide flex flex-wrap items-start justify-between gap-[var(--sp-8)]">
        <div>
          <div
            style={{
              font: "var(--fw-bold) var(--fs-h4)/1 var(--font-sans)",
              letterSpacing: "0.02em",
              color: "#fff",
            }}
          >
            AMY
          </div>
          <p
            className="t-caption"
            style={{
              margin: "var(--sp-3) 0 0",
              color: "var(--text-inverse-dim)",
              maxWidth: "42ch",
              fontWeight: "var(--fw-regular)",
            }}
          >
            {t.footer.note}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[var(--sp-8)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="t-caption"
              style={{ color: "var(--text-inverse-dim)", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <LanguageToggle />
        </div>
      </div>

      <div
        className="shell-wide t-micro mt-[var(--sp-10)] flex flex-wrap justify-between gap-[var(--sp-3)] pt-[var(--sp-5)]"
        style={{
          borderTop: "1px solid var(--border-dark-hairline)",
          color: "var(--text-inverse-dim)",
        }}
      >
        <span>
          © {year} {personal.name}. {t.footer.legal}
        </span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  );
}
