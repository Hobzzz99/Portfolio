"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Play, Sparkles, FolderGit2, Star } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, itemVariants } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { cn } from "@/lib/utils";

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="section-pad relative px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Selected <span className="text-gradient">AI work</span>
            </>
          }
          description="A curated set of AI/ML projects I've built end-to-end — from model training pipelines to full-stack deployment."
        />

        <div className="mt-14 flex flex-col gap-6">
          {featured && <FeaturedCard project={featured} />}

          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {rest.map((p) => (
              <motion.div key={p.title} variants={itemVariants}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Visual ----------------------------- */

function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(34,211,238,0.14),transparent_55%)]",
        className
      )}
    >
      {/* grid texture */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image ?? undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : project.image && project.imageLight ? (
        <>
          {/* dark-mode screenshot */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover theme-dark-only"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* light-mode screenshot */}
          <Image
            src={project.imageLight}
            alt={project.title}
            fill
            className="object-cover theme-light-only"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </>
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="relative flex flex-col items-center gap-3 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
            <FolderGit2 size={26} className="text-sky" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-faint">
            Preview soon
          </span>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Actions ---------------------------- */

/** True when the demo link points to a video file rather than a hosted app. */
function isVideoDemo(demo?: string) {
  return !!demo && /\.(mp4|webm|mov|ogg)$/i.test(demo);
}

function ProjectActions({ project }: { project: Project }) {
  const videoDemo = isVideoDemo(project.demo);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-azure/50 hover:text-white cursor-pointer"
        >
          <Github size={16} /> Code
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm font-medium text-faint opacity-70">
          <Github size={16} /> Code · soon
        </span>
      )}

      {/* Demo button — hidden entirely when a project declares it has no demo. */}
      {project.noDemo ? null : project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#1d4ed8,#3b82f6,#22d3ee)] px-4 py-2 text-sm font-semibold text-oncolor transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
        >
          {videoDemo ? (
            <>
              <Play size={16} className="fill-oncolor" /> Watch Demo
            </>
          ) : (
            <>
              <ExternalLink size={16} /> Live Demo
            </>
          )}
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm font-medium text-faint opacity-70">
          <ExternalLink size={16} /> Demo · soon
        </span>
      )}
    </div>
  );
}

/* ----------------------------- Cards ------------------------------ */

function FeaturedCard({ project }: { project: Project }) {
  return (
    <TiltCard max={6}>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass card-hover group relative overflow-hidden rounded-3xl p-6 md:p-8"
      >
      <span className="absolute right-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
        <Star size={12} className="fill-amber-200" /> Featured
      </span>

      <div className="grid gap-7 lg:grid-cols-2 lg:items-center">
        <ProjectVisual project={project} className="min-h-[260px] lg:min-h-[320px]" />

        <div>
          <p className="text-sm font-medium text-sky">{project.tagline}</p>
          <h3 className="mt-2 text-2xl font-bold text-fg md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          {project.highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full border border-azure/20 bg-azure/[0.06] px-3 py-1 text-xs font-medium text-ice"
                >
                  <Sparkles size={11} className="text-cyan" /> {h}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <ProjectActions project={project} />
        </div>
      </div>
      </motion.article>
    </TiltCard>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full" max={9}>
      <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl p-6">
      <ProjectVisual project={project} className="mb-6 min-h-[180px]" />

      <p className="text-sm font-medium text-sky">{project.tagline}</p>
      <h3 className="mt-1.5 text-xl font-bold text-fg">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {project.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

        <ProjectActions project={project} />
      </article>
    </TiltCard>
  );
}
