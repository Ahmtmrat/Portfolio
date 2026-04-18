"use client";
import { personal } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  const cards = [
    { label: t.contact.email,    value: personal.email,         href: `mailto:${personal.email}`, icon: "✉" },
    { label: t.contact.linkedin, value: "ahmet-murat-yildirim", href: personal.linkedin,           icon: "in" },
    { label: t.contact.github,   value: "github.com/Ahmtmrat",  href: personal.github,             icon: "</>" },
  ];

  return (
    <section id="contact" className="px-6 py-28 max-w-5xl mx-auto">

      <div className="mb-14">
        <p className="section-label mb-4">05 — {t.contact.title}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Get in Touch</h2>
        <p className="text-[#555] text-sm mt-3 max-w-md">{t.contact.subtitle}</p>
        <div className="sep mt-6" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 max-w-xl mb-24">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="card p-5 group block"
          >
            <div className="text-sm font-mono text-[#333] mb-3 group-hover:text-[#555] transition-colors">
              {c.icon}
            </div>
            <div className="text-[10px] font-mono text-[#2a2a2a] uppercase tracking-widest mb-1.5">
              {c.label}
            </div>
            <div className="text-xs font-mono text-[#555] group-hover:text-[#888] transition-colors break-all">
              {c.value}
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="sep mb-6" />
      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-[11px] font-mono text-[#2a2a2a]">
          © {new Date().getFullYear()} {personal.name} · Istanbul, Turkey
        </p>
        <p className="text-[11px] font-mono text-[#1f1f1f]">{t.contact.built}</p>
      </div>
    </section>
  );
}
