"use client";

import {
  Component,
  useRef,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import * as THREE from "three";

/**
 * Local boundary around the WebGL canvas. The 3D panel is decorative, so if
 * the GPU context or an asset fails we silently drop just the panel instead of
 * letting the error bubble up and white-screen the entire page.
 */
class CanvasBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("PanelStage WebGL failed:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const MODEL_PATH =
  "/models/Meshy_AI_Slatted_wooden_panel_0529164548_texture.glb";

useGLTF.preload(MODEL_PATH);

type PanelMotion = {
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  z: MotionValue<number>;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
  rotZ: MotionValue<number>;
  scale: MotionValue<number>;
};

function Panel(motion: PanelMotion) {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Cache the material list once instead of traversing the scene every frame.
  const materialsRef = useRef<THREE.Material[]>([]);
  const lastOpacity = useRef(-1);
  useEffect(() => {
    const mats: THREE.Material[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.material) return;
      const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of list) {
        m.transparent = true;
        mats.push(m);
      }
    });
    materialsRef.current = mats;
    // Model is ready — request a frame so it paints in on-demand mode.
    invalidate();
  }, [scene, invalidate]);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.set(motion.x.get(), motion.y.get(), motion.z.get());
    ref.current.rotation.set(
      motion.rotX.get(),
      motion.rotY.get(),
      motion.rotZ.get()
    );
    ref.current.scale.setScalar(motion.scale.get());

    // Only touch materials when the opacity actually changed.
    const o = motion.opacity.get();
    if (o !== lastOpacity.current) {
      lastOpacity.current = o;
      const depthWrite = o > 0.99;
      for (const m of materialsRef.current) {
        m.opacity = o;
        m.depthWrite = depthWrite;
      }
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * With `frameloop="demand"` the canvas only renders when asked. The scene is
 * static except while scrolling, so we request a frame on each scroll change
 * (and once on mount). This drops idle GPU usage to zero — the main fix for
 * scroll jank on mobile — while keeping the panel fully animated on scroll.
 */
function ScrollInvalidator({ scrollY }: { scrollY: MotionValue<number> }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    const unsub = scrollY.on("change", () => invalidate());
    return () => unsub();
  }, [scrollY, invalidate]);
  return null;
}

export default function PanelStage() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  // Resolved synchronously on the client (this component is client-only via
  // dynamic import), so the WebGL context is created with the right settings.
  const [isMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
  );

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /**
   * Global scroll stages (in viewport heights):
   *
   *   0.0 - 1.0vh   Hero sticky pinned. Panel hidden — the hero photo's panel is what's visible.
   *   1.0 - 1.2vh   Hero sticky releases. Panel fades in at the photo-panel's screen position.
   *   1.2 - 2.0vh   Hero is sliding away. Panel translates from photo-position toward green-center.
   *   2.0vh         Green section starts. Panel is fully at center.
   *   2.0 - 2.4vh   Hold at center (user reads "Specifications" eyebrow).
   *   2.4 - 4.0vh   Y-axis full rotation (one turn).
   *   4.0 - 4.2vh   Settled hold (last corner stat appears).
   *   4.2 - 4.4vh   Panel lifts up and fades out — done while green is still a solid bg.
   *   4.4 - 4.6vh   Green sticky still pinned but panel is gone.
   *   4.6vh+        Green section scrolls away — panel already exited, no awkward overlap.
   */

  const opacity = useTransform(
    scrollY,
    [1.0 * vh, 1.2 * vh, 4.2 * vh, 4.4 * vh],
    [0, 1, 1, 0]
  );

  // X: starts right of center (matches hero photo's panel ≈ 65% across), settles at 0
  const posX = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.4 * vh],
    [0.75, 0, 0]
  );

  // Y: enters from above the baseline, settles low, then lifts up and out for exit
  const posY = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.2 * vh, 4.4 * vh],
    [0.1, -0.4, -0.4, 3.5]
  );

  const posZ = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.4 * vh],
    [0, 0, 0]
  );

  // Slight lean during entry (matches photo) → upright
  const rotZ = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.4 * vh],
    [0.08, 0, 0]
  );

  const rotX = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.4 * vh],
    [0, 0, 0]
  );

  // Y rotation: still during entry/hold, then one full turn during scroll
  const rotY = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 2.4 * vh, 4.0 * vh, 4.4 * vh],
    [0, 0, 0, Math.PI * 2, Math.PI * 2]
  );

  // Scale: starts smaller (photo-sized), grows to fill green section, slight shrink on exit
  const scale = useTransform(
    scrollY,
    [1.0 * vh, 2.0 * vh, 4.2 * vh, 4.4 * vh],
    [1.05, 1.6, 1.6, 1.2]
  );

  return (
    <div
      className="fixed inset-0 z-[15] pointer-events-none"
      aria-hidden
    >
      <CanvasBoundary>
        <Canvas
          frameloop="demand"
          camera={{ position: [0, 0, 5], fov: 30 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          dpr={isMobile ? 1 : [1, 1.5]}
        >
          {/* Mobile leans harder on direct lights since it skips the HDR env. */}
          <ambientLight intensity={isMobile ? 0.85 : 0.55} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={isMobile ? 2.0 : 1.5}
            color="#ffffff"
          />
          <directionalLight
            position={[-3, 2, 4]}
            intensity={0.7}
            color="#c7e8df"
          />
          <directionalLight
            position={[0, -3, 2]}
            intensity={0.25}
            color="#8ea38f"
          />
          <ScrollInvalidator scrollY={scrollY} />
          <Suspense fallback={null}>
            <Panel
              opacity={opacity}
              x={posX}
              y={posY}
              z={posZ}
              rotX={rotX}
              rotY={rotY}
              rotZ={rotZ}
              scale={scale}
            />
            {/* The apartment preset fetches an HDR from a CDN — the main
                mobile crash source. Desktop only; mobile uses the lights above. */}
            {!isMobile && <Environment preset="apartment" />}
          </Suspense>
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
