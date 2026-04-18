"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#about",      label: t.nav.about      },
    { href: "#projects",   label: t.nav.projects   },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact",    label: t.nav.contact    },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]" : "bg-transparent"
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center select-none">
          <Image
            src="/logo.png"
            alt="AMY"
            width={52}
            height={22}
            className={`transition-all duration-300 ${theme === "light" ? "brightness-0 opacity-80 hover:opacity-100" : "opacity-90 hover:opacity-100"}`}
          />
        </a>

        {/* Desktop links — centered */}
        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="px-4 py-2 text-sm text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors rounded-lg hover:bg-[var(--bg-2)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--bg-2)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          {/* Lang toggle */}
          <button
            onClick={toggle}
            className="px-3 py-1.5 text-xs font-mono text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
          >
            {lang === "en" ? "TR" : "EN"}
          </button>

          <a
            href="#contact"
            className="px-4 py-2 bg-[#6366f1] hover:bg-[#5558e3] text-white text-sm font-semibold rounded-full transition-colors"
          >
            {t.nav.lets_talk}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)]/98 backdrop-blur-xl border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors border-b border-[var(--border)] last:border-0"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button onClick={toggle} className="text-xs font-mono text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors">
                  {lang === "en" ? "→ Türkçe" : "→ English"}
                </button>
                <button onClick={toggleTheme} className="text-xs font-mono text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors">
                  {theme === "dark" ? "☀ Light" : "☾ Dark"}
                </button>
              </div>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="px-4 py-2 bg-[#6366f1] text-white text-sm font-semibold rounded-full">
                {t.nav.lets_talk}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
