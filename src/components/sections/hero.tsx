"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { FloatingIcons } from "@/components/shared/floating-icons";
import { Logo } from "@/components/shared/logo";

function RotatingRole() {
  const roles = siteConfig.roles;
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.2em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-animated whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <FloatingIcons />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* live 3D "M" centerpiece */}
        <motion.div
          variants={item}
          className="mb-2 h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52"
        >
          <Logo fill priority interactive autoRotate={0.35} />
        </motion.div>

        {/* availability */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {siteConfig.availability}
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          variants={item}
          className="mt-6 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          <span className="text-fg">Mohab</span>{" "}
          <span className="text-gradient">Ahmed</span>
        </motion.h1>

        {/* rotating role */}
        <motion.div
          variants={item}
          className="mt-4 font-display text-2xl font-semibold sm:text-3xl md:text-4xl"
        >
          <RotatingRole />
        </motion.div>

        {/* subtitle */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg"
        >
          {siteConfig.subtitle} Building intelligent, end-to-end AI systems —
          from machine learning pipelines to LLM-powered agents.
        </motion.p>

        {/* location */}
        <motion.div
          variants={item}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-faint"
        >
          <MapPin size={15} className="text-sky" />
          {siteConfig.location}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button href="#projects" size="lg">
            View Projects
            <ArrowUpRight size={18} />
          </Button>
          <Button
            href={siteConfig.links.resume}
            variant="outline"
            size="lg"
            download
          >
            <Download size={17} />
            Download CV
          </Button>
        </motion.div>

        {/* socials */}
        <motion.div variants={item} className="mt-8 flex items-center gap-3">
          {[
            { href: siteConfig.links.github, Icon: Github, label: "GitHub" },
            { href: siteConfig.links.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: siteConfig.links.email, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-azure/50 hover:text-white cursor-pointer"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-sky"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
