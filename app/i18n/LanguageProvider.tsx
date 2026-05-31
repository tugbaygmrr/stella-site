"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { dictionaries, type Dictionary, type Lang } from "./dictionaries";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "stella-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  // Read persisted language only after mount to avoid SSR/hydration mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "tr" || saved === "en") {
        setLangState(saved);
      }
    } catch {}
    setMounted(true);
  }, []);

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = dictionaries[lang] as Dictionary;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div data-lang={lang} data-mounted={mounted ? "1" : "0"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used inside <LanguageProvider>");
  }
  return ctx;
}
