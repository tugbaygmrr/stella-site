"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useTranslation } from "../i18n/LanguageProvider";

const Leaf = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 stroke-current fill-none">
    {children}
  </svg>
);

const icons: ReactNode[] = [
  <Leaf key="0">
    <path d="M8 40c0-18 14-32 32-32-2 18-14 32-32 32z" strokeWidth="1" />
    <path d="M8 40L40 8" strokeWidth="1" />
  </Leaf>,
  <Leaf key="1">
    <circle cx="24" cy="24" r="14" strokeWidth="1" />
    <path d="M24 10v28M10 24h28" strokeWidth="1" />
  </Leaf>,
  <Leaf key="2">
    <path
      d="M24 8c0 8-8 10-8 18a8 8 0 0016 0c0-8-8-10-8-18z"
      strokeWidth="1"
    />
  </Leaf>,
  <Leaf key="3">
    <path d="M24 6v36M14 14l10 10 10-10M14 30l10-10 10 10" strokeWidth="1" />
  </Leaf>,
];

export default function Sustainability() {
  const { t } = useTranslation();

  return (
    <section id="sustainability" className="relative py-32 md:py-40 bg-warm">
      <div className="mx-auto max-w-[1600px] px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-sage" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-sage">
                {t.sustainability.eyebrow}
              </span>
            </div>
            <h2 className="font-serif font-light text-[48px] md:text-[88px] leading-[0.95] tracking-tightest text-charcoal">
              {t.sustainability.line1}
              <span className="italic text-sage"> {t.sustainability.line2} </span>
              <br />
              {t.sustainability.line3}
              <span className="italic text-sage"> {t.sustainability.line4}</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-charcoal/70 text-[15px] leading-[1.75]">
              {t.sustainability.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/10 border border-charcoal/10 rounded-[4px] overflow-hidden">
          {t.sustainability.items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 1.0,
                ease: [0.65, 0, 0.05, 1],
              }}
              className="bg-warm p-10 md:p-12 group hover:bg-forest hover:text-warm transition-colors duration-700 relative overflow-hidden"
            >
              <span className="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-charcoal/40 group-hover:text-warm/40">
                0{i + 1}
              </span>

              <div className="text-forest group-hover:text-sage transition-colors">
                {icons[i]}
              </div>

              <h3 className="mt-12 font-serif text-[28px] leading-tight tracking-tight text-charcoal group-hover:text-warm">
                {it.title}
              </h3>

              <p className="mt-4 text-[13px] leading-[1.7] text-charcoal/65 group-hover:text-warm/75">
                {it.desc}
              </p>

              <div className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-charcoal/50 group-hover:text-warm/60">
                <span>{t.sustainability.verified}</span>
                <span className="block w-6 h-px bg-charcoal/30 group-hover:bg-warm/40" />
                <span>{t.sustainability.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
