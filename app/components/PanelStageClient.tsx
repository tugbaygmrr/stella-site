"use client";

import dynamic from "next/dynamic";

/**
 * Fixed-position 3D panel that overlays the whole page.
 * Loaded client-only because Three.js touches window/WebGL at module load.
 */
const PanelStage = dynamic(() => import("./PanelStage"), {
  ssr: false,
  loading: () => null,
});

export default PanelStage;
