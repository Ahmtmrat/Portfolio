"use client";
import { personal, metrics } from "@/data/cv";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 overflow-hidden">

      {/* Dark terrain background */}
      <div className="hero-wave" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">

        {/* Status badge */}
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center gap-2 text-[11px] font-mono text-[#555] border border-[#1f1f1f] rounded-full px-3 py-1 bg-[#0f0f0f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d7a3d] animate-pulse" />
            {t.hero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.0] mb-6 max-w-3xl">
          <span className="text-white">{personal.name.split(" ")[0]}</span>
          <br />
          <span className="text-white">{personal.name.split(" ").slice(1).join(" ")}</span>
          <span className="text-[#2a2a2a">.</span>
        </h1>

        {/* Role */}
        <p className="text-xl sm:text-2xl text-[#666] font-light tracking-tight mb-2">
          {t.cv.personal.title}
        </p>

        {/* Subtitle */}
        <p className="text-sm font-mono text-[#333] mb-10">
          {t.cv.personal.subtitle}&nbsp;&nbsp;·&nbsp;&nbsp;{personal.location}
        </p>

        {/* Summary */}
        <div className="max-w-xl space-y-3 mb-12">
          {t.cv.personal.summary.map((p, i) => (
            <p key={i} className="text-[#666] text-base leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 mb-20">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-white hover:bg-[#e8e8e8] text-black text-sm font-semibold rounded-full transition-colors"
          >
            {t.hero.cta_contact}
          </a>
          <a
            href="#experience"
            className="px-6 py-2.5 border border-[#222] hover:border-[#333] text-[#777] hover:text-[#aaa] text-sm font-medium rounded-full transition-colors"
          >
            {t.hero.cta_experience}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[#1a1a1a] hover:border-[#2a2a2a] text-[#555] hover:text-[#777] text-sm font-medium rounded-full transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="card px-6 py-4 text-center min-w-[120px]">
              <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-[11px] font-mono text-[#444] leading-tight">{t.cv.metrics[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 left-6 max-w-5xl w-[calc(100%-3rem)] mx-auto">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#2a2a2a] float" />
      </div>
    </section>
  );
}
