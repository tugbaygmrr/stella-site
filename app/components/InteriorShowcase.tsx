"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n/LanguageProvider";
import { useIsMobile } from "../hooks/useIsMobile";

const VIDEO_PATH = "/videos/interior-scrub.mp4";

export default function InteriorShowcase() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Wait until the video has at least metadata before allowing scrub
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    if (v.readyState >= 1) {
      onReady();
    } else {
      v.addEventListener("loadedmetadata", onReady, { once: true });
    }
    return () => v.removeEventListener("loadedmetadata", onReady);
  }, []);

  // On mobile, scrubbing an mp4 per scroll frame is janky and looks low-quality
  // (the decoder snaps to keyframes). Instead just play it as a normal looping
  // video. The scroll-scrub effect below is desktop-only.
  useEffect(() => {
    if (!isMobile || !ready) return;
    const v = videoRef.current;
    if (!v) return;
    v.loop = true;
    const play = () => v.play().catch(() => {});
    play();
    return () => {
      try {
        v.pause();
      } catch {}
    };
  }, [isMobile, ready]);

  /**
   * Scroll scrub — maps section progress to video.currentTime.
   *
   * Seeking an mp4 on every scroll frame is expensive, so instead of seeking
   * directly we ease a smoothed playhead toward the scroll target inside a
   * self-stopping rAF loop. This collapses many tiny seeks into fewer, larger
   * ones and prefers fastSeek() (cheap keyframe seek) when available — which
   * keeps scrolling smooth instead of janky.
   */
  useEffect(() => {
    if (!ready || isMobile) return;
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    // Pause any natural playback — we own the playhead via scroll
    try {
      v.pause();
    } catch {}

    let raf = 0;
    let target = v.currentTime;
    let smoothed = v.currentTime;

    const computeTarget = () => {
      const dur = v.duration;
      if (!dur || isNaN(dur)) return;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = -section.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      target = progress * (dur - 0.05);
    };

    const tick = () => {
      raf = 0;
      // Ease toward the scroll target so we issue fewer, larger seeks.
      smoothed += (target - smoothed) * 0.22;
      const settled = Math.abs(target - smoothed) < 0.004;
      if (settled) smoothed = target;

      if (Math.abs(v.currentTime - smoothed) > 0.012) {
        try {
          if (typeof v.fastSeek === "function") {
            v.fastSeek(smoothed);
          } else {
            v.currentTime = smoothed;
          }
        } catch {
          /* seek errors during decode — ignore */
        }
      }
      // Keep the loop alive only while there's motion to resolve.
      if (!settled) raf = requestAnimationFrame(tick);
    };

    const ensureTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      ensureTick();
    };

    computeTarget();
    smoothed = v.currentTime;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    ensureTick(); // initial sync

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-charcoal"
      style={{ height: isMobile ? "100vh" : "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed video: scroll-scrubbed on desktop, plays normally on mobile */}
        <video
          ref={videoRef}
          src={VIDEO_PATH}
          muted
          playsInline
          autoPlay={isMobile}
          loop={isMobile}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />

        {/* Left-side darken — subtle, just enough for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(95deg, rgba(8,12,10,0.32) 0%, rgba(8,12,10,0.14) 28%, rgba(8,12,10,0.03) 55%, rgba(8,12,10,0) 75%)",
          }}
        />

        {/* Bottom soft fade for credits */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,12,10,0) 0%, rgba(8,12,10,0.28) 100%)",
          }}
        />

        {/* CONTENT — horizontal bottom band */}
        <div className="absolute inset-x-0 bottom-16 mx-auto max-w-[1600px] px-8 md:px-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-forest" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-warm/85 font-medium">
              {t.interior.eyebrow}
            </span>
          </div>

          <h2
            className="font-serif font-light text-[40px] md:text-[68px] leading-[1.05] tracking-tight text-warm max-w-[1200px]"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
          >
            {t.interior.line1} {t.interior.line2}{" "}
            <span className="italic text-forest">{t.interior.line3}</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
            <p
              className="md:col-span-6 text-warm/90 text-[15px] leading-[1.75] font-light max-w-md"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            >
              {t.interior.description}
            </p>

            <div className="md:col-span-6 flex gap-10 md:gap-14 md:justify-end">
              <div>
                <div className="font-serif text-[40px] leading-none text-warm">
                  {t.interior.stat1Value}
                </div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-warm/70 mt-2">
                  {t.interior.stat1Label}
                </div>
              </div>
              <div>
                <div className="font-serif text-[40px] leading-none text-warm">
                  {t.interior.stat2Value}
                </div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-warm/70 mt-2">
                  {t.interior.stat2Label}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
