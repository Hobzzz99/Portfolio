"use client";

import {
  BrainCircuit,
  Cpu,
  Database,
  GitBranch,
  Sparkles,
  Bot,
  Binary,
  Network,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type FloatItem = {
  Icon: LucideIcon;
  className: string; // position
  delay: number;
  duration: number;
  size?: number;
};

const items: FloatItem[] = [
  { Icon: BrainCircuit, className: "left-[6%] top-[18%]", delay: 0, duration: 7 },
  { Icon: Cpu, className: "right-[8%] top-[12%]", delay: 1.2, duration: 8 },
  { Icon: Database, className: "left-[12%] bottom-[16%]", delay: 0.6, duration: 9 },
  { Icon: GitBranch, className: "right-[12%] bottom-[20%]", delay: 1.8, duration: 7.5 },
  { Icon: Sparkles, className: "left-[46%] top-[6%]", delay: 0.9, duration: 6.5, size: 18 },
  { Icon: Bot, className: "right-[24%] top-[40%]", delay: 2.1, duration: 8.5 },
  { Icon: Binary, className: "left-[24%] top-[44%]", delay: 1.5, duration: 7.8, size: 18 },
  { Icon: Network, className: "right-[40%] bottom-[10%]", delay: 0.3, duration: 9.5, size: 18 },
  { Icon: Terminal, className: "left-[40%] bottom-[6%]", delay: 2.4, duration: 8.2, size: 18 },
];

export function FloatingIcons() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {items.map(({ Icon, className, delay, duration, size = 22 }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? { opacity: 0.8, scale: 1 }
              : {
                  opacity: [0.35, 0.9, 0.35],
                  y: [0, -16, 0],
                  scale: 1,
                }
          }
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(59,130,246,0.5)]">
            <Icon size={size} className="text-sky/80" strokeWidth={1.5} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
