/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit everything about you here in one place.
 * ─────────────────────────────────────────────────────────────
 *  Update the social links below (currently placeholders) and
 *  your contact email, then everything on the site updates.
 */

export const siteConfig = {
  name: "Mohab Ahmed",
  title: "AI/ML Engineer",
  subtitle:
    "Software Engineering Student specializing in Artificial Intelligence & Machine Learning.",
  location: "Cairo, Egypt",
  availability: "Open to AI/ML Internships",

  // Short line used in the hero rotating role animation.
  roles: [
    "AI/ML Engineer",
    "Agentic AI Builder",
    "Full-Stack AI Developer",
  ],

  summary: [
    "I am a Software Engineering student specializing in AI/ML Engineering with a passion for building intelligent systems that solve real-world problems. My work focuses on developing end-to-end AI applications, from engineering transfer learning pipelines and computer vision models to deploying full-stack AI systems with real-time inference and LLM-powered agents.",
    "I enjoy exploring Agentic AI, Model Context Protocol (MCP), modern machine learning workflows, and scalable backend systems. I am currently seeking an AI/ML Internship where I can contribute to production-grade AI solutions.",
  ],

  education: {
    degree: "Bachelor of Software Engineering",
    school: "Egyptian Chinese University",
    period: "September 2022 – Expected June 2027",
  },

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],

  links: {
    github: "https://github.com/Hobzzz99",
    linkedin: "https://www.linkedin.com/in/mohabahmedalmaaiergy",
    email: "mailto:mohabahmed476@gmail.com",
    // Hosted PDF resume in /public
    resume: "/Mohab-Ahmed-CV.pdf",
  },

  // Raw email (without the mailto:) — used for display text.
  emailDisplay: "mohabahmed476@gmail.com",

  // Used for SEO / metadata. Set to your deployed domain.
  url: "https://mohab-ahmed.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
