"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Live WebGL "M" — loaded client-side only, in its own async chunk, so Three.js
// never touches SSR or the initial bundle. The static PNG shows until it draws.
const Logo3D = dynamic(
  () => import("./logo-3d").then((m) => m.Logo3D),
  { ssr: false, loading: () => null }
);

type LogoProps = {
  /** Rendered square size in px (fixed mode). Default 48 (navbar). */
  size?: number;
  /** Fill the parent instead of a fixed size — size the parent with CSS. */
  fill?: boolean;
  className?: string;
  priority?: boolean;
  /** tilt toward the cursor on desktop. Default true. */
  interactive?: boolean;
  /** continuous slow turntable (rad/s). 0 = gentle legible rock. */
  autoRotate?: number;
};

/** If WebGL creation throws, fall back to the static image instead of crashing. */
class WebGLBoundary extends React.Component<
  { fallback: React.ReactNode; onError: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Site logo — a real, live 3D render of the "M".
 *  • WebGL (Three.js) canvas: crisp at any DPI, animated on every device.
 *  • Static PNG shown instantly, while the canvas loads, and as the fallback
 *    for reduced-motion users or devices without WebGL.
 */
export function Logo({
  size = 48,
  fill = false,
  className,
  priority,
  interactive = true,
  autoRotate = 0,
}: LogoProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const showCanvas = mounted && !reduce && !failed;

  return (
    <span
      className={cn(
        "relative inline-block shrink-0",
        fill && "block h-full w-full",
        className
      )}
      style={fill ? undefined : { width: size, height: size, maxWidth: "100%" }}
    >
      {/* Base / fallback: crisp static M, fades out once the 3D is drawing. */}
      <Image
        src="/M_logo_3d.png"
        alt="Mohab Ahmed"
        {...(fill
          ? { fill: true }
          : { width: size, height: size })}
        priority={priority}
        sizes={fill ? "(max-width: 768px) 60vw, 420px" : `${size}px`}
        className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1 }}
      />

      {showCanvas && (
        <WebGLBoundary fallback={null} onError={() => setFailed(true)}>
          <Logo3D
            spin={false}
            float
            interactive={interactive}
            autoRotate={autoRotate}
            onReady={() => setReady(true)}
            className="absolute inset-0 h-full w-full"
          />
        </WebGLBoundary>
      )}
    </span>
  );
}

export default Logo;
