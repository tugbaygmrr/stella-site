"use client";

import dynamic from "next/dynamic";

/**
 * Three.js uses WebGL / window globals at module load time, which doesn't
 * exist during SSR. Dynamic import with ssr:false keeps the rest of the page
 * pre-renderable while the 3D scene mounts client-side only.
 */
const PanelShowcase = dynamic(() => import("./PanelShowcase"), {
  ssr: false,
  loading: () => (
    <section
      className="relative w-full bg-forest text-warm"
      style={{ height: "100vh" }}
      aria-busy="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-warm/40">
          Loading panel ·
        </span>
      </div>
    </section>
  ),
});

export default PanelShowcase;
