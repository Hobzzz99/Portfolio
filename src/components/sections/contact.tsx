"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = siteConfig.emailDisplay;
    const subject = encodeURIComponent(
      `Portfolio contact from ${form.name || "someone"}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-pad relative px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient">intelligent</span>
            </>
          }
          description="Open to AI/ML internships and collaborations. Drop a message — I'll get back to you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Left — details */}
          <Reveal className="lg:col-span-2">
            <div className="glass flex h-full flex-col gap-6 rounded-3xl p-7">
              <div>
                <h3 className="text-lg font-semibold text-fg">Get in touch</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Whether it&apos;s an internship, a project, or a question about
                  AI — my inbox is always open.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <ContactLink
                  Icon={Mail}
                  label="Email"
                  value={siteConfig.emailDisplay}
                  href={siteConfig.links.email}
                />
                <ContactLink
                  Icon={Github}
                  label="GitHub"
                  value="View profile"
                  href={siteConfig.links.github}
                  external
                />
                <ContactLink
                  Icon={Linkedin}
                  label="LinkedIn"
                  value="Connect with me"
                  href={siteConfig.links.linkedin}
                  external
                />
              </div>

              <div className="mt-auto inline-flex items-center gap-1.5 text-sm text-faint">
                <MapPin size={15} className="text-sky" />
                {siteConfig.location}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass flex h-full flex-col gap-4 rounded-3xl p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Jane Doe"
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-fg"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about the opportunity or idea…"
                  className="resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-azure/60 focus:bg-white/[0.05]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#1d4ed8,#3b82f6,#22d3ee)] [background-size:200%_auto] px-6 py-3 text-sm font-semibold text-oncolor shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] transition-[background-position] duration-300 hover:[background-position:100%_center] cursor-pointer"
              >
                Send Message <Send size={16} />
              </motion.button>
              <p className="text-center text-xs text-faint">
                Opens your email client — no data stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  Icon,
  label,
  value,
  href,
  external,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-azure/50 hover:bg-white/[0.04] cursor-pointer"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <Icon size={18} className="text-sky" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-faint">{label}</div>
        <div className="truncate text-sm font-medium text-fg">{value}</div>
      </div>
      <ArrowUpRight
        size={16}
        className="text-faint transition-colors group-hover:text-sky"
      />
    </a>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-faint outline-none transition-colors focus:border-azure/60 focus:bg-white/[0.05]"
      />
    </div>
  );
}
