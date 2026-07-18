"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Languages, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Logo } from "@/components/shared/logo";

const focus = [
  "Computer Vision",
  "Transfer Learning",
  "Agentic AI & MCP",
  "LLM Integration",
  "Full-Stack AI",
  "MLOps Mindset",
];

export function About() {
  return (
    <section id="about" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Engineering intelligence,{" "}
              <span className="text-gradient">end to end</span>
            </>
          }
          description="Turning research-grade AI into production-ready products."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Text */}
          <Reveal className="lg:col-span-3">
            <div className="glass h-full rounded-3xl p-7 md:p-9">
              <div className="space-y-5 text-pretty leading-relaxed text-muted">
                {siteConfig.summary.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                  <Sparkles size={16} className="text-sky" />
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-azure/20 bg-azure/[0.06] px-3 py-1.5 text-sm font-medium text-ice"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Profile / info card */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {/* Visual */}
              <div className="glass group relative overflow-hidden rounded-3xl p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.18),transparent_60%)]" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative mx-auto flex w-full max-w-[220px] justify-center"
                >
                  <Logo
                    size={220}
                    className="drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)]"
                  />
                </motion.div>
              </div>

              {/* Facts */}
              <div className="glass grid gap-4 rounded-3xl p-6">
                <InfoRow
                  Icon={GraduationCap}
                  label={siteConfig.education.degree}
                  value={`${siteConfig.education.school} · ${siteConfig.education.period}`}
                />
                <InfoRow
                  Icon={MapPin}
                  label="Based in"
                  value={siteConfig.location}
                />
                <InfoRow
                  Icon={Languages}
                  label="Languages"
                  value={siteConfig.languages
                    .map((l) => `${l.name} (${l.level})`)
                    .join(" · ")}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <Icon size={17} className="text-sky" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-fg">{label}</div>
        <div className="text-sm text-muted">{value}</div>
      </div>
    </div>
  );
}
