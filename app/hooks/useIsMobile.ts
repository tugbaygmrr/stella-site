"use client";

import { useEffect, useState } from "react";

/**
 * Reports whether the viewport is at/below the given breakpoint.
 * Starts `false` (matches SSR) and resolves on mount to avoid hydration
 * mismatch. Used to disable expensive desktop-only effects (WebGL panel,
 * scroll-scrubbed video) on phones/tablets where they cause scroll jank.
 */
export function useIsMobile(query = "(max-width: 1023px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}
