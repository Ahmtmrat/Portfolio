"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * The site has no header, so this is all that is left of it — one control,
 * sitting in the footer.
 *
 * It cannot simply be dropped along with the nav: it is the only way to reach
 * the Turkish copy, which would otherwise be written but unreachable.
 */
export default function LanguageToggle() {
  const { lang, t, toggle } = useLanguage();

  return (
    <button type="button" className="lang-toggle" onClick={toggle} aria-label={t.nav.lang_switch}>
      {lang === "en" ? "TR" : "EN"}
    </button>
  );
}
