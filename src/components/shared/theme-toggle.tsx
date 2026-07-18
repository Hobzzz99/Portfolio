"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark";

/**
 * Light/dark switch. The initial theme is applied pre-paint by the inline
 * script in layout.tsx; this button reads it on mount, then persists changes
 * to localStorage and updates <html data-theme>.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
      className={
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-azure/50 hover:text-fg cursor-pointer " +
        (className ?? "")
      }
    >
      {/* Render the icon only after mount so it matches the real theme (no flash). */}
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: -14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={17} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}

export default ThemeToggle;
