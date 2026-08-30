"use client";

import { useState } from "react";
import { personal } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { Button, ButtonLink } from "@/components/ui/Button";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  /**
   * No backend: the form composes a mailto and hands off to the visitor's mail
   * client, so what they typed is really sent rather than silently dropped.
   */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [form.message, "", "—", form.name, form.email]
      .filter((line) => line !== undefined)
      .join("\n");
    const url =
      `mailto:${personal.email}` +
      `?subject=${encodeURIComponent(`${t.contact.form.subject} — ${form.name}`.trim())}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const field = (
    key: "name" | "email" | "message",
    label: string,
    type: "text" | "email" | "area"
  ) => (
    <label className="flex flex-col gap-[var(--sp-2)]">
      <span className="t-caption" style={{ color: "var(--text-inverse-dim)" }}>
        {label}
      </span>
      {type === "area" ? (
        <textarea
          className="field-dark"
          rows={4}
          required
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ) : (
        <input
          className="field-dark"
          type={type}
          required
          autoComplete={key === "email" ? "email" : "name"}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      )}
    </label>
  );

  return (
    <section id="contact" className="section surface-dark">
      <div className="shell-wide grid items-start gap-[var(--sp-20)] lg:grid-cols-[1fr_460px]">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
          />

          <div className="flex flex-wrap items-center gap-[var(--sp-6)]">
            <ButtonLink
              variant="inverse"
              size="large"
              href={`mailto:${personal.email}`}
            >
              {t.contact.email_me}
            </ButtonLink>
            <LinkArrow tone="inverse" href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              {t.contact.linkedin}
            </LinkArrow>
            <LinkArrow tone="inverse" href={personal.github} target="_blank" rel="noopener noreferrer">
              {t.contact.github}
            </LinkArrow>
          </div>

          <div className="mt-[var(--sp-12)] flex flex-wrap gap-[var(--sp-2)]">
            {t.contact.chips.map((c) => (
              <Chip key={c} tone="dark">
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div className="card glass-1 p-[var(--sp-8)]">
          <form onSubmit={onSubmit} className="flex flex-col gap-[var(--sp-5)]">
            {field("name", t.contact.form.name, "text")}
            {field("email", t.contact.form.email, "email")}
            {field("message", t.contact.form.message, "area")}
            <Button type="submit" size="large" variant="inverse" fullWidth>
              {t.contact.form.send}
            </Button>
            <p
              className="t-micro"
              style={{ margin: 0, color: "var(--text-inverse-dim)" }}
            >
              {t.contact.form.hint}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
