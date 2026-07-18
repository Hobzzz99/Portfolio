"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo — real 3D render of the "M" (gently turning, always legible) */}
        <a href="#home" className="group flex items-center pl-1" aria-label="Home">
          <Logo
            size={48}
            priority
            className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_6px_18px_rgba(59,130,246,0.55)]"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            href="#contact"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Contact
            <ArrowUpRight size={16} />
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg md:hidden cursor-pointer"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-20 md:hidden"
          >
            <div className="glass-strong flex flex-col gap-1 rounded-3xl p-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(100deg,#1d4ed8,#3b82f6,#22d3ee)] px-4 py-3 text-sm font-semibold text-oncolor"
              >
                Contact <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
