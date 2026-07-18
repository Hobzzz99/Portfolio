/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENT DATA — tech stack, experience, projects, certs.
 * ─────────────────────────────────────────────────────────────
 */

/* ============================== TECH STACK ============================== */

export type TechCategory = {
  /** lucide-react icon name, mapped in TechStack component */
  icon:
    | "Code2"
    | "BrainCircuit"
    | "Bot"
    | "Server"
    | "Database"
    | "Wrench";
  title: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    icon: "Code2",
    title: "Languages",
    items: ["Python", "Java", "C++", "C#", "SQL", "HTML", "CSS"],
  },
  {
    icon: "BrainCircuit",
    title: "AI & Machine Learning",
    items: [
      "TensorFlow",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "OpenCV",
      "Transfer Learning",
      "Model Fine-tuning",
      "Supervised Learning",
      "Classification",
      "Feature Engineering",
    ],
  },
  {
    icon: "Bot",
    title: "Agentic AI",
    items: [
      "MCP (Model Context Protocol)",
      "LLM API Integration",
      "Function Calling",
      "Agent Workflows",
      "DeepSeek API",
    ],
  },
  {
    icon: "Server",
    title: "Web & Backend",
    items: ["Next.js", "Flask", "REST APIs"],
  },
  {
    icon: "Database",
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "Oracle"],
  },
  {
    icon: "Wrench",
    title: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "PyCharm",
      "Jupyter Notebook",
      "Anaconda",
    ],
  },
];

/** Small curated set used for the floating icons / marquee highlight. */
export const highlightTech: string[] = [
  "Python",
  "TensorFlow",
  "PyTorch-style Pipelines",
  "OpenCV",
  "Next.js",
  "Flask",
  "MCP",
  "LLM APIs",
  "Scikit-learn",
  "Pandas",
];

/* ============================== EXPERIENCE ============================== */

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Technology & Sustainability Intern",
    company: "CIB Egypt — The Green Leap Program",
    period: "July 2025 – August 2025",
    location: "Cairo, Egypt",
    bullets: [
      "Analyzed sustainability reporting frameworks (GRI, TCFD).",
      "Worked on green finance case studies.",
      "Used SAS and Excel for financial modeling.",
      "Collaborated with teams on business development challenges.",
      "Applied analytical and data-driven decision-making methodologies.",
    ],
  },
];

/* ============================== PROJECTS ============================== */

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  /**
   * image path in /public, or null for the placeholder gradient.
   * When `imageLight` is also set, this one is used in DARK mode.
   */
  image?: string | null;
  /** optional light-mode image path in /public — shown when the site is in light mode */
  imageLight?: string | null;
  /** video path in /public — autoplays as a muted loop preview, takes priority over image */
  video?: string | null;
  /** hide the demo button entirely (project has no demo and none is planned) */
  noDemo?: boolean;
  featured?: boolean;
};

/**
 * ⚠️ PLACEHOLDERS — replace these with your real projects.
 *
 * Just fill in each object below (or copy from the reference block at the
 * bottom of this file). Set `github` / `demo` to real URLs to activate the
 * buttons; leave them undefined to hide the button automatically.
 */
export const projects: Project[] = [
  {
    title: "Plant Disease Detection & AI Treatment Assistant",
    tagline: "Computer vision meets an LLM treatment agent",
    description:
      "An end-to-end AI platform that diagnoses plant diseases from a single leaf photo. I fine-tuned EfficientNetB3 to 88% accuracy across 38 disease classes, then paired it with a DeepSeek-powered assistant that turns each diagnosis into disease-specific treatment guidance — served through a Flask API and a drag-and-drop Next.js app.",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "EfficientNetB3",
      "Transfer Learning",
      "OpenCV",
      "Scikit-learn",
      "Flask",
      "REST API",
      "Next.js",
      "React",
      "Tailwind CSS",
      "DeepSeek API",
    ],
    highlights: [
      "88% Top-1 Accuracy",
      "38 Disease Classes",
      "54,000+ Images",
      "EfficientNetB3 Fine-Tuning",
      "Two-Phase Training",
      "Confidence Thresholding",
      "DeepSeek Treatment Chatbot",
      "Full-Stack AI · REST API",
    ],
    github: "https://github.com/Hobzzz99/plant-disease-classification",
    demo: "/plant-disease-demo.mp4",
    image: null,
    video: "/plant-disease-demo.mp4",
    featured: true,
  },
  {
    title: "RoadRev — Service Management System",
    tagline: "Multi-branch vehicle service & repair platform",
    description:
      "A desktop application that manages a multi-branch vehicle service and repair network — centralizing clients, cars, branches, garages, and bookings. Built on a normalized MySQL schema with a component-based CustomTkinter UI, it features a live statistics dashboard, cross-entity search, and full light/dark theming.",
    tech: [
      "Python",
      "CustomTkinter",
      "MySQL",
      "mysql-connector",
      "Pillow",
    ],
    highlights: [
      "Normalized Relational DB",
      "Live Stats Dashboard",
      "Component-Based UI",
      "Light & Dark Themes",
    ],
    github: "https://github.com/Hobzzz99/RoadRev",
    image: "/roadrev-dark.png",
    imageLight: "/roadrev-light.png",
    noDemo: true,
  },
  {
    title: "Project Three",
    tagline: "One more slot ready for you",
    description:
      "Add a third featured project. You can add as many entries to this array as you like — the grid layout adapts automatically.",
    tech: ["Add", "Your", "Tech"],
    highlights: ["Highlight", "Highlight", "Highlight"],
    github: undefined,
    demo: undefined,
    image: null,
  },
];

/* ============================== CERTIFICATIONS ============================== */

export type Certification = {
  name: string;
  issuer: string;
  detail?: string;
};

export const certifications: Certification[] = [
  { name: "Machine Learning with Python", issuer: "IBM" },
  {
    name: "AI Engineer — Agentic Track",
    issuer: "The Complete Agent & MCP Course",
    detail: "Agentic AI, MCP, tool-calling & multi-agent workflows",
  },
  {
    name: "AI Coder",
    issuer: "Complete Claude Code & Coding Agents Course",
    detail: "Building with coding agents end-to-end",
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
  },
];

/* =====================================================================
 * 📌 REFERENCE — YOUR REAL PROJECTS (paste into `projects` above)
 * =====================================================================
 *
 * 1. Plant Disease Detection & AI Treatment Assistant
 *    tech: Python, TensorFlow, Next.js, Flask, OpenCV, DeepSeek API
 *    - Developed an end-to-end AI-powered plant disease diagnosis platform.
 *    - Fine-tuned EfficientNetB3 via a two-phase transfer learning pipeline
 *      on 54,000+ PlantVillage images — 88% Top-1 Accuracy across 38 classes.
 *    - Built a Flask REST API serving predictions with sub-200ms inference.
 *    - Integrated a DeepSeek-powered assistant giving structured treatment
 *      recommendations based on detected diseases.
 *    highlights: Computer Vision, Deep Learning, Transfer Learning,
 *                Full Stack AI, REST API, LLM Integration
 *
 * 2. MCP Agent & Agentic Workflow Demos
 *    tech: Python, MCP, LLM APIs
 *    - Built multiple AI agents using the Model Context Protocol.
 *    - Multi-step agent workflows with function calling, tool routing,
 *      context management, and error recovery.
 *
 * 3. Road-Rev  (tech: Python, Tkinter, MySQL)
 *    - Garage Management System. Normalized relational DB + desktop app for
 *      booking services, assigning mechanics, and tracking repairs.
 *
 * 4. Sorting Algorithms Visualizer  (tech: Python)
 *    - Interactive visualization of Merge/Quick/Insertion sort with execution
 *      tracing and complexity analysis.
 *
 * 5. Nutrition Management System  (tech: Python, Tkinter, Oracle, MySQL)
 *    - Desktop nutrition tracker with auth, CRUD, BMI-based recommendations,
 *      and personalized diet planning.
 * ===================================================================== */
