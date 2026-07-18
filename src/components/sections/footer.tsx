"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/shared/logo";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] px-6 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_70%)] blur-2xl" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <a href="#home" className="flex items-center gap-3" aria-label="Home">
              <Logo size={40} className="drop-shadow-[0_6px_16px_rgba(59,130,246,0.5)]" />
              <span className="font-display text-xl font-semibold text-fg">
                Mohab Ahmed
              </span>
            </a>

            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted">
              {siteConfig.title} — building intelligent systems that solve
              real-world problems. {siteConfig.availability}.
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-azure/50 hover:text-white cursor-pointer"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-faint">
            © {year} Mohab Ahmed. All rights reserved.
          </p>
          <p className="text-sm text-faint">
            Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
          >
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
