"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  translations,
  LANG_COOKIE,
  type Lang,
  type Translations,
} from "@/data/translations";

const ONE_YEAR = 60 * 60 * 24 * 365;

type LanguageContextType = {
  lang: Lang;
  t: Translations;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  toggle: () => {},
});

/**
 * The active language arrives from the server (read from the `lang` cookie in
 * the root layout), so the first paint is already in the right language and
 * `<html lang>` is correct — no flash of English, no hydration mismatch.
 */
export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  const toggle = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "en" ? "tr" : "en";
      document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=${ONE_YEAR};samesite=lax`;
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, t: translations[lang], toggle }),
    [lang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
