"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";

/** Cinematic factory scene rendered in pure SVG/CSS. */
function FactoryScene() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[6px] overflow-hidden bg-charcoal grain">
      {/* deep ambient gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #2d3a32 0%, #0e1411 70%, #050807 100%)",
        }}
      />

      {/* high windows light streaks */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: 0,
            left: `${10 + i * 14}%`,
            width: "9%",
            height: "32%",
            background:
              "linear-gradient(180deg, rgba(255,238,200,0.45) 0%, rgba(255,238,200,0) 100%)",
            filter: "blur(2px)",
          }}
        />
      ))}

      {/* horizontal beam shadow */}
      <div className="absolute left-0 right-0 top-[34%] h-[2px] bg-black/60" />
      <div className="absolute left-0 right-0 top-[36%] h-[1px] bg-warm/10" />

      {/* Long row of stacked oak panels */}
      <div className="absolute left-[6%] right-[6%] bottom-[28%] top-[42%] flex gap-[6px]">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              background:
                "linear-gradient(180deg, #c29a55 0%, #6e4a20 100%)",
              boxShadow:
                "0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,235,200,0.18)",
            }}
          />
        ))}
      </div>

      {/* Foreground floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background:
            "linear-gradient(180deg, #1a1f1c 0%, #050706 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0) 0px,
              rgba(255,255,255,0) 80px,
              rgba(255,255,255,0.06) 80px,
              rgba(255,255,255,0.06) 81px
            )`,
          }}
        />
      </div>

      {/* worker silhouette */}
      <div
        className="absolute bottom-[28%] left-[50%] -translate-x-1/2"
        style={{
          width: "16px",
          height: "44px",
          background: "linear-gradient(180deg, #0a0d0b 0%, #050706 100%)",
          borderRadius: "8px 8px 2px 2px",
          boxShadow: "0 20px 30px rgba(0,0,0,0.6)",
        }}
      />

      {/* dust particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-warm/40"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            top: `${15 + (i * 37) % 60}%`,
            left: `${5 + (i * 53) % 90}%`,
            opacity: 0.4 - (i % 3) * 0.1,
          }}
        />
      ))}

      {/* spotlight wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(255,220,160,0.18) 0%, rgba(255,220,160,0) 50%)",
        }}
      />
    </div>
  );
}

export default function Manufacturing() {
  const { t } = useTranslation();

  return (
    <section
      id="manufacturing"
      className="relative py-32 md:py-40 bg-warm overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.05, 1] }}
          className="lg:col-span-7"
        >
          <FactoryScene />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.05, 1] }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-forest" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-forest">
              {t.manufacturing.eyebrow}
            </span>
          </div>

          <h2 className="font-serif font-light text-[48px] md:text-[80px] leading-[0.95] tracking-tightest text-charcoal">
            {t.manufacturing.line1}
            <br />
            <span className="italic text-forest">{t.manufacturing.line2}</span>
            <br />
            {t.manufacturing.line3}
            <br />
            <span className="italic text-forest">{t.manufacturing.line4}</span>
          </h2>

          <p className="mt-10 max-w-md text-charcoal/70 text-[15px] leading-[1.75]">
            {t.manufacturing.description}
          </p>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 max-w-md">
            {t.manufacturing.stats.map((s) => (
              <div key={s.l}>
                <div className="font-serif text-[34px] leading-none text-charcoal">
                  {s.v}
                </div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-charcoal/55 mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
