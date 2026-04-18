"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#experience", label: t.nav.experience },
    { href: "#projects",   label: t.nav.projects   },
    { href: "#code",       label: t.nav.code        },
    { href: "#skills",     label: t.nav.skills      },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#080808]/88 backdrop-blur-xl border-b border-[#1a1a1a]"
        : "bg-transparent border-b border-[#111]"
    }`}>
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center select-none">
          <Image src="/logo.png" alt="AMY" width={56} height={24} className="opacity-80 hover:opacity-100 transition-opacity" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="px-3.5 py-1.5 text-sm text-[#555] hover:text-white transition-colors rounded-lg hover:bg-white/4">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggle}
            className="px-3 py-1.5 text-xs font-mono text-[#555] hover:text-[#888] border border-[#1f1f1f] hover:border-[#2a2a2a] rounded-full transition-all"
          >
            {lang === "en" ? "TR" : "EN"}
          </button>
          <a
            href="#contact"
            className="px-4 py-1.5 bg-white hover:bg-[#e8e8e8] text-black text-xs font-semibold rounded-full transition-colors"
          >
            {t.nav.contact}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 text-[#555] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#080808]/98 backdrop-blur-xl border-t border-[#141414]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col">
            {[...links, { href: "#contact", label: t.nav.contact }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm text-[#666] hover:text-white transition-colors border-b border-[#111] last:border-0"
              >
                {l.label}
              </a>
            ))}
            <button onClick={toggle} className="mt-3 text-xs font-mono text-[#444] hover:text-[#777] text-left transition-colors">
              {lang === "en" ? "→ Türkçe" : "→ English"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
