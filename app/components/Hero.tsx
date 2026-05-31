"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import { useIntroProgress } from "./HeroIntroProvider";
import VideoModal from "./VideoModal";

// YouTube video id (from https://www.youtube.com/watch?v=GF-dnvZN93A)
const FILM_YOUTUBE_ID = "GF-dnvZN93A";

const HERO_IMAGE = "/images/hero/ChatGPT Image 29 May 2026 19_37_50.png";

const stripTrailingPeriod = (s: string) => (s.endsWith(".") ? s.slice(0, -1) : s);

export default function Hero() {
  const { t, lang } = useTranslation();
  const introProgress = useIntroProgress();
  const [videoOpen, setVideoOpen] = useState(false);

  // Big STELLA — rises up and fades out on scroll (like the slogan)
  const stellaY = useTransform(introProgress, [0, 0.7], [0, -260]);
  const stellaOpacity = useTransform(introProgress, [0, 0.35, 0.6], [1, 1, 0]);

  // Hero content (slogan, CTA, chips, marquee, scroll cue) — fades up after intro layer lifts
  const contentOpacity = useTransform(introProgress, [0.55, 0.95], [0, 1]);
  const contentY = useTransform(introProgress, [0.55, 0.95], [40, 0]);

  // Continuously flowing slogan — rises in parallel with STELLA
  const sloganY = useTransform(introProgress, [0, 0.7], [0, -200]);
  const sloganOpacity = useTransform(introProgress, [0, 0.35, 0.55], [1, 1, 0]);
  const slogan = `${t.hero.line1} ${t.hero.line2} ${t.hero.line3} ${t.hero.line4}`;

  return (
    <section
      className="relative w-full bg-charcoal"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed background image */}
        <Image
          src={HERO_IMAGE}
          alt="Stella Comfort 9 — premium oak acoustic panel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft left-side wash — anchors typography area */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,12,10,0.45) 0%, rgba(8,12,10,0.18) 35%, rgba(8,12,10,0) 60%)",
          }}
        />

        {/* Top fade so nav stays readable */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,10,0.25) 0%, rgba(8,12,10,0) 100%)",
          }}
        />

        {/* Bottom whisper fade for marquee + scroll cue */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,10,0) 0%, rgba(8,12,10,0.35) 100%)",
          }}
        />

        {/* BIG STELLA — rises and fades on scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          style={{
            y: stellaY,
            opacity: stellaOpacity,
          }}
        >
          <span
            className="font-serif italic select-none leading-[0.9] text-gradient-brand"
            style={{
              fontSize: "clamp(120px, 28vw, 520px)",
              letterSpacing: "0.08em",
            }}
          >
            stella
          </span>
        </motion.div>

        {/* Continuously flowing slogan under the giant STELLA */}
        <motion.div
          style={{ opacity: sloganOpacity, y: sloganY }}
          className="absolute inset-x-0 top-[70%] md:top-[72%] pointer-events-none z-20 overflow-hidden"
        >
          <div
            className="marquee-track-slow flex whitespace-nowrap font-serif italic text-warm/85 text-[clamp(16px,1.8vw,28px)] tracking-[0.22em]"
            style={{
              textShadow:
                "0 2px 12px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {[0, 1].map((set) => (
              <div key={set} className="flex shrink-0">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={`${set}-${i}`}
                    className="flex items-center shrink-0"
                  >
                    <span className="px-8 lg:px-12">{slogan}</span>
                    <span aria-hidden className="text-warm/40">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* HERO CONTENT — slogan, description, CTA */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20"
        >
          <div
            key={`content-${lang}`}
            className="mx-auto max-w-[1600px] px-8 md:px-14 pt-20 md:pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 h-full"
          >
            <div className="lg:col-span-7 flex flex-col justify-start h-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="block w-8 h-px bg-forest" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-forest font-medium">
                    {t.hero.eyebrow}
                  </span>
                </div>

                <h1 className="font-serif font-light leading-[0.95] tracking-tightest text-warm text-[clamp(48px,7.5vw,134px)] pb-4">
                <span
                  className="block"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.45)",
                  }}
                >
                  {t.hero.line1}
                </span>
                <span className="block italic">
                  <span className="text-gradient-italic">
                    {stripTrailingPeriod(t.hero.line2)}
                  </span>
                  {t.hero.line2.endsWith(".") && (
                    <span className="text-[#1FA89A]">.</span>
                  )}
                </span>
                <span
                  className="block"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.45)",
                  }}
                >
                  {t.hero.line3}
                </span>
                <span className="block italic">
                  <span className="text-gradient-italic">
                    {stripTrailingPeriod(t.hero.line4)}
                  </span>
                  {t.hero.line4.endsWith(".") && (
                    <span className="text-[#1FA89A]">.</span>
                  )}
                </span>
              </h1>
              </div>

              <div className="flex flex-col mt-4">
              <p
                className="max-w-md text-warm/90 text-[15px] leading-[1.7] font-light whitespace-pre-line"
                style={{
                  textShadow:
                    "0 1px 4px rgba(0,0,0,0.6), 0 2px 16px rgba(0,0,0,0.4)",
                }}
              >
                {t.hero.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
                <a
                  href="#collections"
                  className="group inline-flex items-center gap-4 px-7 py-4 rounded-full bg-warm text-forest hover:bg-sage hover:text-warm transition-colors duration-700"
                >
                  <span className="text-[12px] tracking-[0.22em] uppercase font-medium">
                    {t.hero.cta}
                  </span>
                  <span className="block w-6 h-px bg-current transition-all duration-700 group-hover:w-10" />
                </a>

                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="hidden md:inline-flex items-center gap-3 text-warm/80 hover:text-warm transition-colors group"
                >
                  <span className="block w-7 h-7 rounded-full border border-warm/50 flex items-center justify-center group-hover:border-warm transition-colors">
                    <span className="block w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-current ml-1" />
                  </span>
                  <span className="text-[12px] tracking-[0.18em] uppercase">
                    {t.hero.watch}
                  </span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Series chip */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="hidden md:block absolute top-[28%] right-[4%] lg:right-[6%] backdrop-blur-xl bg-warm/65 border border-white/40 rounded-2xl px-5 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] z-20"
        >
          <div className="text-[10px] tracking-[0.28em] uppercase text-forest/70">
            {t.hero.chip1Label}
          </div>
          <div className="text-[14px] font-medium tracking-tight text-charcoal mt-1">
            {t.hero.chip1Value}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-forest" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-charcoal/60">
              {t.hero.chip1Meta}
            </span>
          </div>
        </motion.div>

        {/* Floating Dimensions chip */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="hidden md:block absolute bottom-[18%] right-[4%] lg:right-[10%] backdrop-blur-xl bg-warm/65 border border-white/40 rounded-2xl px-5 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] z-20"
        >
          <div className="text-[10px] tracking-[0.28em] uppercase text-forest/70">
            {t.hero.chip2Label}
          </div>
          <div className="text-[14px] font-medium tracking-tight text-charcoal mt-1">
            {t.hero.chip2Value}
          </div>
        </motion.div>

        {/* Marquee at very bottom */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-0 left-0 right-0 border-t border-warm/10 bg-charcoal/40 backdrop-blur-md z-20"
        >
          <div className="overflow-hidden py-3">
            <div className="marquee-track flex gap-16 whitespace-nowrap text-[11px] tracking-[0.3em] uppercase text-warm/70">
              {Array.from({ length: 2 }).map((_, copyIdx) => (
                <div key={copyIdx} className="flex gap-16 shrink-0">
                  {t.marquee.map((item, i) => (
                    <span
                      key={`${copyIdx}-${i}`}
                      className="flex gap-16 items-center"
                    >
                      <span>{item}</span>
                      <span>·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={FILM_YOUTUBE_ID}
        title="Stella — Film"
      />
    </section>
  );
}
