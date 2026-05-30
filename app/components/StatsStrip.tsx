"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";

export default function StatsStrip() {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 border-y border-charcoal/10">
      <div className="mx-auto max-w-[1600px] px-8 md:px-14 grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-6">
        {t.stats.items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.12, duration: 0.9, ease: [0.65, 0, 0.05, 1] }}
            className="flex flex-col items-start"
          >
            <div className="font-serif font-light text-[44px] md:text-[64px] leading-none tracking-tight text-charcoal">
              {s.value}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="block w-5 h-px bg-sage" />
              <span className="text-[11px] tracking-[0.24em] uppercase text-charcoal/60">
                {s.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
