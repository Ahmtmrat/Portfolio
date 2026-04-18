"use client";
import { personal } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="px-6 py-28 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-1)] mb-4">{t.contact.lets_work}</h2>
      <p className="text-[var(--text-2)] text-base leading-relaxed max-w-xl mx-auto mb-10">
        {t.contact.subtitle}
      </p>

      <a
        href={`mailto:${personal.email}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#6366f1] hover:bg-[#5558e3] text-white text-sm font-semibold rounded-full transition-colors mb-10"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        {t.contact.email_me}
      </a>

      <div className="flex items-center justify-center gap-8 mb-20">
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
          </svg>
          LinkedIn
        </a>
        <a href={personal.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
          GitHub
        </a>
      </div>

      <div className="sep mb-6" />
      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-[11px] font-mono text-[var(--text-4)]">
          © {new Date().getFullYear()} Ahmet Murat Yıldırım. All rights reserved.
        </p>
        <p className="text-[11px] font-mono text-[var(--text-4)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          {t.contact.built}
        </p>
      </div>
    </section>
  );
}
