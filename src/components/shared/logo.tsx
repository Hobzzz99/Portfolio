"use client";

import * as React from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Rendered square size in px. Default 48 (navbar); pass larger for a hero. */
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Site logo — a real 3D render of the "M" that gently turns (transparent,
 * seamless loop).
 *  • WebM (alpha) for browsers that support it.
 *  • Animated GIF fallback for Safari (no alpha-WebM support).
 *  • Static image when the user prefers reduced motion.
 */
export function Logo({ size = 48, className, priority }: LogoProps) {
  const reduce = useReducedMotion();
  const [canWebm, setCanWebm] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const v = document.createElement("video");
    // Safari can't render alpha in WebM and reports "" for webm playback.
    setCanWebm(v.canPlayType('video/webm; codecs="vp9"') !== "");
  }, []);

  const wrap = cn(
    "relative inline-block shrink-0 [&>*]:h-full [&>*]:w-full [&>*]:object-contain",
    className
  );
  const style: React.CSSProperties = { width: size, height: size, maxWidth: "100%" };

  // Reduced motion, or before support is detected (also the deterministic
  // SSR / first-paint render → no hydration mismatch): static image.
  if (reduce || canWebm === null) {
    return (
      <span className={wrap} style={style}>
        <Image
          src="/M_logo_3d.png"
          alt="Mohab Ahmed"
          width={size}
          height={size}
          priority={priority}
        />
      </span>
    );
  }

  if (!canWebm) {
    return (
      <span className={wrap} style={style}>
        {/* Safari fallback — unoptimized so Next keeps the GIF animation */}
        <Image
          src="/M_logo_transparent.gif"
          alt="Mohab Ahmed"
          width={size}
          height={size}
          unoptimized
          priority={priority}
        />
      </span>
    );
  }

  return (
    <span className={wrap} style={style}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/M_logo_3d.png"
        aria-label="Mohab Ahmed"
        width={size}
        height={size}
      >
        <source src="/M_logo_transparent.webm" type="video/webm" />
      </video>
    </span>
  );
}

export default Logo;
