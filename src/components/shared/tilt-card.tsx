"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
  /** rounding of the glare overlay — match the card */
  radiusClass?: string;
};

/**
 * Pointer-driven 3D tilt using CSS transforms (perspective + rotate), with a
 * soft cursor-tracking glare. Deliberately CSS-based, not WebGL — a canvas per
 * card would wreck performance. Tilt only activates on hover-capable pointers,
 * so touch devices get the flat card with no jank.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  radiusClass = "rounded-3xl",
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const canTilt = React.useRef(false);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [glare, setGlare] = React.useState({ x: 50, y: 50, o: 0 });

  React.useEffect(() => {
    canTilt.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!canTilt.current || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(1000px) rotateX(${-(py - 0.5) * 2 * max}deg) rotateY(${
        (px - 0.5) * 2 * max
      }deg) scale(1.02)`,
      transition: "transform 120ms ease-out",
    });
    setGlare({ x: px * 100, y: py * 100, o: 0.14 });
  };

  const onLeave = () => {
    if (!canTilt.current) return;
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 500ms ease-out",
    });
    setGlare((g) => ({ ...g, o: 0 }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative will-change-transform", className)}
      style={style}
    >
      {children}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          radiusClass
        )}
        style={{
          opacity: glare.o,
          transition: "opacity 200ms ease-out",
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.5), transparent 45%)`,
        }}
      />
    </div>
  );
}

export default TiltCard;
