"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Client-only, lazy — the Three.js field loads in its own chunk after paint.
const Scene3D = dynamic(() => import("./scene-3d").then((m) => m.Scene3D), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the ambient 3D depth field behind the site — but only on pointer-capable
 * larger screens. On phones and for reduced-motion users it renders nothing, so a
 * persistent fullscreen WebGL canvas never costs mobile battery/perf (the CSS
 * AuroraBackground still provides atmosphere there).
 */
export function SceneBackground() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Scene3D />
    </div>
  );
}

export default SceneBackground;
