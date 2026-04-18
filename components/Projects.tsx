"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-6 py-28 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-1)] mb-3">{t.projects.title}</h2>
        <p className="text-[var(--text-3)] text-sm">{t.projects.restricted}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {t.cv.projects.map((p) => (
          <div key={p.title} className="card p-6 group">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[var(--text-1)] font-semibold group-hover:text-[#818cf8] transition-colors">
                {p.title}
              </h3>
              <div className="flex gap-2 shrink-0 text-[var(--text-4)] group-hover:text-[var(--text-3)] transition-colors mt-0.5">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </div>
            <p className="text-[var(--text-3)] text-sm leading-relaxed mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
