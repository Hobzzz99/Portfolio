"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, itemVariants } from "@/components/shared/reveal";

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Continuous <span className="text-gradient">learning</span>
            </>
          }
          description="Credentials across machine learning, agentic AI, and modern coding workflows."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2">
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              className="glass card-hover group relative flex items-start gap-4 overflow-hidden rounded-3xl p-6"
            >
              <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-cyan/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-azure/25 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(34,211,238,0.12))]">
                <Award size={22} className="text-sky" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="flex items-start gap-1.5 text-base font-semibold leading-snug text-fg">
                  {cert.name}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-sky">
                  <BadgeCheck size={14} /> {cert.issuer}
                </p>
                {cert.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {cert.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
