"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";
import { useIntroProgress } from "./HeroIntroProvider";

export default function Navigation() {
  const { lang, setLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const introProgress = useIntroProgress();
  const logoOpacity = useTransform(introProgress, [0.5, 0.75], [0, 1]);

  const navItems = [
    { label: t.nav.products, href: "#collections" },
    { label: t.nav.downloads, href: "#footer" },
    { label: t.nav.cooperation, href: "#partners" },
    { label: t.nav.blog, href: "#" },
    { label: t.nav.about, href: "#manufacturing" },
  ];

  useEffect(() => {
    const onScroll = () => {
      // Stay transparent while still inside the hero section (~1 viewport tall sticky region).
      // Switch to warm background only once the hero starts scrolling away.
      setScrolled(window.scrollY > window.innerHeight * 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Color logic: at top (over hero image) → warm/light, after scroll → charcoal/dark
  const linkBase = scrolled
    ? "text-charcoal/80 hover:text-forest"
    : "text-warm/90 hover:text-warm";

  const langActive = scrolled ? "text-forest font-semibold" : "text-warm font-semibold";
  const langInactive = scrolled
    ? "text-charcoal/40 hover:text-charcoal/70"
    : "text-warm/55 hover:text-warm/85";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.05, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-warm/95 border-b border-charcoal/5 md:bg-warm/80 md:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex items-center justify-between px-6 md:px-10 lg:px-14 py-5">
        {/* Logo */}
        <motion.a
          href="#"
          aria-label={t.nav.brand}
          style={{ opacity: logoOpacity }}
          className="flex items-center group shrink-0"
        >
          <Image
            src="/images/hero/StellaLogo.svg"
            alt="Stella"
            width={120}
            height={41}
            priority
            className="h-7 md:h-9 w-auto transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.a>

        {/* Center menu */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`link-underline text-[11px] tracking-[0.22em] uppercase font-medium transition-colors ${linkBase}`}
                style={
                  scrolled
                    ? undefined
                    : { textShadow: "0 1px 6px rgba(0,0,0,0.4)" }
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase"
            style={
              scrolled
                ? undefined
                : { textShadow: "0 1px 6px rgba(0,0,0,0.4)" }
            }
          >
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`transition-colors ${
                lang === "en" ? langActive : langInactive
              }`}
            >
              EN
            </button>
            <span className={scrolled ? "text-charcoal/30" : "text-warm/30"}>
              ·
            </span>
            <button
              onClick={() => setLang("tr")}
              aria-pressed={lang === "tr"}
              className={`transition-colors ${
                lang === "tr" ? langActive : langInactive
              }`}
            >
              TR
            </button>
          </div>

          <a
            href="#footer"
            className="inline-flex items-center bg-[#007468] text-warm px-6 lg:px-7 py-3 lg:py-3.5 text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#005a51] transition-colors duration-700"
          >
            {t.nav.becomePro}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen((s) => !s)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span
            className={`block w-7 h-[1px] ${
              scrolled ? "bg-charcoal" : "bg-warm"
            }`}
          />
          <span
            className={`block w-5 h-[1px] ml-auto ${
              scrolled ? "bg-charcoal" : "bg-warm"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.05, 1] }}
            className="md:hidden px-6 pb-8 bg-warm/95"
          >
            <ul className="flex flex-col gap-5 pt-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-light tracking-tight text-charcoal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <a
                  href="#footer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center bg-[#007468] text-warm px-6 py-3 text-[11px] tracking-[0.22em] uppercase font-medium"
                >
                  {t.nav.becomePro}
                </a>
              </li>
              <li className="pt-4 flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase">
                <button
                  onClick={() => setLang("en")}
                  className={lang === "en" ? "text-forest font-semibold" : "text-charcoal/50"}
                >
                  EN
                </button>
                <span className="text-charcoal/30">·</span>
                <button
                  onClick={() => setLang("tr")}
                  className={lang === "tr" ? "text-forest font-semibold" : "text-charcoal/50"}
                >
                  TR
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
