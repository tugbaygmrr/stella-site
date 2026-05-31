"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslation } from "../i18n/LanguageProvider";

type Corner = "tl" | "tr" | "bl" | "br";

function CornerStat({
  corner,
  progress,
  fadeOut,
  value,
  label,
}: {
  corner: Corner;
  progress: MotionValue<number>;
  fadeOut: MotionValue<number>;
  value: string;
  label: string;
}) {
  const positionClass = {
    tl: "top-24 md:top-28 left-6 md:left-14 text-left",
    tr: "top-24 md:top-28 right-6 md:right-14 text-right",
    bl: "bottom-16 md:bottom-20 left-6 md:left-14 text-left",
    br: "bottom-16 md:bottom-20 right-6 md:right-14 text-right",
  }[corner];

  const initialX = corner.includes("l") ? -40 : 40;
  const initialY = corner.startsWith("t") ? -20 : 20;

  const x = useTransform(progress, [0, 1], [initialX, 0]);
  const y = useTransform(progress, [0, 1], [initialY, 0]);
  // Combined opacity: reveal progress × scroll-out fade
  const opacity = useTransform(
    [progress, fadeOut] as MotionValue<number>[],
    ([r, f]) => r * f
  );
  const isRight = corner.includes("r");

  return (
    <motion.div
      style={{ opacity, x, y }}
      className={`absolute ${positionClass} max-w-[42vw] sm:max-w-[260px] z-20 pointer-events-none`}
    >
      <div className="text-[10px] tracking-[0.3em] uppercase text-warm/55 font-medium mb-3">
        {label}
      </div>
      <div className="font-serif font-light text-[44px] sm:text-[64px] md:text-[96px] leading-none text-warm">
        {value}
      </div>
      <span
        className={`block w-12 h-px bg-warm/40 mt-4 ${isRight ? "ml-auto" : ""}`}
      />
    </motion.div>
  );
}

export default function PanelShowcase() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /**
   * Corner reveals — distributed across the panel rotation window so each
   * stat appears as the panel turns toward its corner. Last stat lands
   * ~0.80 progress, leaving a brief hold before the panel exits AND the
   * section's sticky releases simultaneously (no dead air after rotation).
   */
  const tlProgress = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const trProgress = useTransform(scrollYProgress, [0.35, 0.47], [0, 1]);
  const brProgress = useTransform(scrollYProgress, [0.52, 0.64], [0, 1]);
  const blProgress = useTransform(scrollYProgress, [0.68, 0.80], [0, 1]);

  /**
   * Sticky scroll-out is unavoidable (~100vh of scroll while the panel is gone).
   * Mask it by fading the section's content (stats + eyebrow) and overlaying the
   * next section's dark bg, so the dead "empty center" feels like a smooth
   * transition instead of a pause.
   *
   * Sticky pin ends at progress 0.706 (section_top + sticky_duration).
   * Content holds till just before that, then fades over the scroll-out window.
   */
  const contentFadeOut = useTransform(scrollYProgress, [0.7, 0.92], [1, 0]);
  const bgOverlay = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);

  const items = t.stats.items;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-forest text-warm"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient soft glow at center */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(199,232,223,0.16) 0%, rgba(0,116,104,0) 60%)",
          }}
        />

        {/* Subtle grain on the green */}
        <div
          aria-hidden
          className="absolute inset-0 grain pointer-events-none opacity-60"
        />

        {/* Soft floor shadow under where the 3D panel lands */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-[18%] w-[40%] h-10 rounded-[50%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* 4 corner stats */}
        <CornerStat
          corner="tl"
          progress={tlProgress}
          fadeOut={contentFadeOut}
          value={items[0].value}
          label={items[0].label}
        />
        <CornerStat
          corner="tr"
          progress={trProgress}
          fadeOut={contentFadeOut}
          value={items[1].value}
          label={items[1].label}
        />
        <CornerStat
          corner="br"
          progress={brProgress}
          fadeOut={contentFadeOut}
          value={items[2].value}
          label={items[2].label}
        />
        <CornerStat
          corner="bl"
          progress={blProgress}
          fadeOut={contentFadeOut}
          value={items[3].value}
          label={items[3].label}
        />

        {/* Section eyebrow at top center */}
        <motion.div
          style={{ opacity: contentFadeOut }}
          className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 pointer-events-none"
        >
          <span className="block w-10 h-px bg-warm/40" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-warm/75 font-medium">
            Comfort 9 · Specifications
          </span>
          <span className="block w-10 h-px bg-warm/40" />
        </motion.div>

        {/* Dark transition overlay — fades in during scroll-out to bridge to next section */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOverlay }}
          className="absolute inset-0 bg-charcoal pointer-events-none z-30"
        />
      </div>
    </section>
  );
}
