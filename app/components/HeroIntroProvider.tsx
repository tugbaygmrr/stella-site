"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * 0 = page just opened, only the giant STELLA is visible.
 * 1 = intro animation complete, hero fully revealed, navbar logo visible.
 *
 * Computed from window scrollY normalized against viewport height,
 * so both Hero and Navigation can subscribe to the same value.
 */
const HeroIntroContext = createContext<MotionValue<number> | null>(null);

/** Distance (in viewport heights) over which the intro animation runs. */
const INTRO_VH = 0.7;

export function HeroIntroProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const introProgress = useTransform(scrollY, (v) => {
    const target = vh * INTRO_VH;
    if (target <= 0) return 0;
    return Math.max(0, Math.min(1, v / target));
  });

  return (
    <HeroIntroContext.Provider value={introProgress}>
      {children}
    </HeroIntroContext.Provider>
  );
}

export function useIntroProgress() {
  const ctx = useContext(HeroIntroContext);
  if (!ctx) {
    throw new Error(
      "useIntroProgress must be used inside <HeroIntroProvider>"
    );
  }
  return ctx;
}
