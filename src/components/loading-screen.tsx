"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Phase = "load" | "zoom" | "done";

export function LoadingScreen() {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("load");
  const reduce = useReducedMotion();

  // Drive the progress counter, then kick off the zoom.
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const total = reduce ? 400 : 1700;

    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / total) * 100));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase(reduce ? "done" : "zoom"), 220);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  React.useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  const zooming = phase === "zoom";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          // As we dive into the logo, the whole overlay fades to reveal the site.
          animate={{ opacity: zooming ? 0 : 1 }}
          transition={{ duration: zooming ? 0.9 : 0.3, ease: "easeInOut" }}
        >
          {/* ambient glow (fades out on zoom) */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_65%)] blur-2xl"
            animate={{ scale: zooming ? 6 : 1, opacity: zooming ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.6, 0.04, 0.98, 0.34] }}
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* logo + rings */}
            <div className="relative flex h-40 w-40 items-center justify-center">
              {!reduce && !zooming && (
                <>
                  <span className="absolute inset-0 rounded-full border border-azure/30 animate-pulse-ring" />
                  <span
                    className="absolute inset-0 rounded-full border border-cyan/25 animate-pulse-ring"
                    style={{ animationDelay: "1.1s" }}
                  />
                </>
              )}

              <motion.div
                className="relative will-change-transform"
                initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
                animate={
                  zooming
                    ? { scale: 24, opacity: 0, rotate: 0 }
                    : { scale: 1, opacity: 1, rotate: 0 }
                }
                transition={
                  zooming
                    ? { duration: 0.95, ease: [0.6, 0.04, 0.98, 0.34] } // accelerate inward
                    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
                onAnimationComplete={() => {
                  if (zooming) setPhase("done");
                }}
              >
                <Image
                  src="/M_logo.png"
                  alt="Mohab Ahmed logo"
                  width={150}
                  height={105}
                  priority
                  className="h-auto w-[120px] drop-shadow-[0_10px_30px_rgba(59,130,246,0.45)]"
                />
              </motion.div>
            </div>

            {/* progress (fades out the moment we start diving in) */}
            <motion.div
              className="flex w-56 flex-col items-center gap-3"
              animate={{ opacity: zooming ? 0 : 1, y: zooming ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#1d4ed8,#3b82f6,#22d3ee)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex w-full items-center justify-between text-xs font-medium tracking-wide text-muted">
                <span className="font-display text-fg">MOHAB AHMED</span>
                <span className="tabular-nums text-sky">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
