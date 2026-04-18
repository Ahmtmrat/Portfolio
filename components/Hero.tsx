"use client";
import Image from "next/image";
import { metrics } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden text-center">
      <div className="hero-glow" />
      <div className="relative z-10 max-w-3xl mx-auto w-full">

        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="AMY"
            width={120}
            height={50}
            className={`transition-all duration-300 ${theme === "light" ? "brightness-0 opacity-75" : "opacity-90"}`}
          />
        </div>

        <div className="flex justify-center mb-8">
          <span className="flex items-center gap-2 text-[12px] font-mono text-[var(--text-2)] border border-[var(--border)] rounded-full px-4 py-1.5 bg-[var(--bg-1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            {t.hero.badge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] mb-6">
          <span className="text-[var(--text-1)]">{t.hero.headline_1}</span>
          <br />
          <span className="gradient-text">{t.hero.headline_2}</span>
        </h1>

        <p className="text-[var(--text-2)] text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {t.cv.personal.summary[0]}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-20">
          <a href="#projects" className="px-6 py-2.5 bg-[#6366f1] hover:bg-[#5558e3] text-white text-sm font-semibold rounded-full transition-colors">
            {t.hero.cta_projects}
          </a>
          <a href="#contact" className="px-6 py-2.5 border border-[var(--border-2)] hover:border-[#6366f1] text-[var(--text-2)] hover:text-[var(--text-1)] text-sm font-medium rounded-full transition-colors">
            {t.hero.cta_contact}
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {metrics.map((m, i) => (
            <div key={i} className="card px-8 py-4 text-center min-w-[140px]">
              <div className="text-2xl font-bold text-[var(--text-1)] mb-1">{m.value}</div>
              <div className="text-[11px] font-mono text-[var(--text-3)]">{t.cv.metrics[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
