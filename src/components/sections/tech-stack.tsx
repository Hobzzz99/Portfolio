"use client";

import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Bot,
  Server,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { techStack, highlightTech } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, itemVariants } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  BrainCircuit,
  Bot,
  Server,
  Database,
  Wrench,
};

export function TechStack() {
  return (
    <section id="tech" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              Tools I use to ship <span className="text-gradient">AI</span>
            </>
          }
          description="A production-focused toolkit across machine learning, agentic AI, and full-stack engineering."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className="glass card-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-azure/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-azure/25 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(34,211,238,0.12))]">
                    <Icon size={20} className="text-sky" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-fg">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>

      {/* Marquee highlight */}
      <div className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {[...highlightTech, ...highlightTech].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
