import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Mohab Ahmed — AI/ML Engineer and Software Engineering student building end-to-end AI systems: computer vision, transfer learning, agentic AI (MCP), and full-stack LLM-powered applications. Based in Cairo, Egypt.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  keywords: [
    "Mohab Ahmed",
    "AI Engineer",
    "Machine Learning Engineer",
    "AI/ML Portfolio",
    "Agentic AI",
    "MCP",
    "Model Context Protocol",
    "Computer Vision",
    "Deep Learning",
    "TensorFlow",
    "Transfer Learning",
    "LLM",
    "Next.js",
    "Cairo Egypt",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description,
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070e" },
    { media: "(prefers-color-scheme: light)", color: "#eef2f9" },
  ],
  colorScheme: "dark light",
};

// Runs before paint to set the theme from storage / system → no flash of wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "Egypt",
    },
    alumniOf: siteConfig.education.school,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Agentic AI",
      "Deep Learning",
    ],
    url: siteConfig.url,
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
