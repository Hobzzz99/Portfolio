"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-azure/25 bg-azure/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px] shadow-cyan/60" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
