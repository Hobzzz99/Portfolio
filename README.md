# Mohab Ahmed — AI/ML Engineer Portfolio

A premium, dark-mode portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide Icons**. Blue-and-black, AI-inspired design with glassmorphism, animated aurora backgrounds, scroll-reveal animations, a custom 3D "M" loading screen, and a fully responsive layout.

## ✨ Features

- 3D "M" logo used as the favicon, navbar mark, and animated loading screen
- Animated aurora + grid background, floating tech icons, gradient text
- Sticky glass navbar with scrollspy + mobile menu
- Sections: Hero · About · Tech Stack · Experience · Projects · Certifications · Contact · Footer
- Interactive project cards (description, tech stack, highlights, GitHub + Live Demo buttons)
- Working contact form (opens the visitor's email client via `mailto:` — no backend needed)
- SEO optimized: metadata, OpenGraph, Twitter cards, JSON-LD, `robots.ts`, `sitemap.ts`
- Accessible: keyboard focus states + `prefers-reduced-motion` respected

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 🛠 Make it yours

Everything you need to edit lives in two files:

| What | File |
| --- | --- |
| Name, title, summary, education, **social links + email** | `src/lib/site.ts` |
| Tech stack, experience, **projects**, certifications | `src/lib/data.ts` |

### Add your projects

Open [`src/lib/data.ts`](src/lib/data.ts). The `projects` array currently holds
placeholder cards. Replace each object with your real project — your actual
project text is preserved in the comment block at the bottom of that file, ready
to paste in. Set `github` / `demo` to real URLs to activate those buttons
(they show a disabled "· soon" state until you do).

### Update your links

In `src/lib/site.ts`, replace the `"#"` placeholders in `links` with your real
GitHub / LinkedIn URLs, and set your email in both `links.email`
(`mailto:you@example.com`) and `emailDisplay`.

### Add a CV / resume

Drop a `resume.pdf` into `public/` — the "Download CV" button already points to `/resume.pdf`.

## 🎨 Design tokens

Colors, fonts, and animations are defined in `src/app/globals.css` under the
Tailwind v4 `@theme` block. Fonts: **Space Grotesk** (display) + **Inter** (body).

## 📦 Tech

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · class-variance-authority
