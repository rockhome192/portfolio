export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  badge?: string;
  badgeColor?: "fe" | "be" | "data" | "tool";
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
};

export const featured = {
  slug: "taskboard",
  title: "Taskboard",
  browserUrl: "taskboard-production-e350.up.railway.app",
  meta: "deployed · containerized · solo build",
  image: "/taskboard.png",
  imageAspect: "1330 / 480",
  tagline:
    "A deployed, containerized Kanban board — drag-to-reorder columns and cards, checklists, labels, due dates and comments, persisted to PostgreSQL through a typed Prisma layer and shipped as a reproducible Docker image.",
  stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
  highlights: [
    "Cut board load from multiple round-trips to a single JOIN query by folding a redundant per-request access check into the main query.",
    "Hardened Cloudflare R2 uploads via presigned URLs — server-side size limits, filename sanitization, MIME allow-list, and orphan cleanup on delete.",
    "Atomic sign-up: a Prisma $transaction commits the user and its one-time code together or rolls both back. Credentials + OTP + Google OAuth via NextAuth.",
    "Shipped in a multi-stage Docker build to Railway — debugged a Prisma musl/OpenSSL engine failure and a production login redirect loop. Guarded by 28 Vitest tests + GitHub Actions CI.",
  ],
  links: [
    { label: "Live demo", href: "https://taskboard-production-e350.up.railway.app/login" },
    { label: "Source", href: "https://github.com/rockhome192/taskboard" },
  ],
};

export const projects: Project[] = [
  {
    slug: "surveillance",
    index: "02",
    title: "Suicide Risk Surveillance",
    badge: "team project",
    badgeColor: "data",
    tagline:
      "Senior project — a public-health surveillance dashboard for Chiang Rai. I built the web app: a CSV-driven Python ingestion pipeline, a Leaflet choropleth shading each district by risk tier with drill-down, and filterable Recharts breakdowns. A teammate owned the Random Forest model.",
    stack: ["Next.js", "TypeScript", "Leaflet", "Recharts", "Python"],
    highlights: [],
    links: [{ label: "Source", href: "https://github.com/rockhome192/finalproject-next" }],
  },
  {
    slug: "trinity",
    index: "03",
    title: "Trinity Securities",
    badge: "internship · 4 mo",
    badgeColor: "be",
    tagline:
      "Built internal frontend and backend tools at a Thai securities firm. Led the frontend of a stock News Platform — watchlists, Premium membership, real-time Telegram alerts — and its initial API. Built Tickmatch end to end: a Python service ingesting market data to detect price ticks, with a live table, Daily / 1-minute charts, a Redis pipeline and a Dockerized environment.",
    stack: ["React", "TypeScript", "Python", "Redis", "Docker"],
    highlights: [],
    links: [],
  },
];

export const skills: { group: string; color: "fe" | "be" | "data" | "tool"; items: string[] }[] = [
  { group: "frontend", color: "fe", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "dnd-kit"] },
  { group: "backend", color: "be", items: ["Node.js", "Python", "Prisma", "NextAuth", "REST APIs"] },
  { group: "data", color: "data", items: ["PostgreSQL", "Redis", "Real-time pipelines"] },
  { group: "tooling", color: "tool", items: ["Docker", "Git", "Vitest", "GitHub Actions", "Railway", "Vercel"] },
];

export const contact = {
  email: "phatcharadanai.tangoan@gmail.com",
  github: "https://github.com/rockhome192",
  githubLabel: "github.com/rockhome192",
  location: "Bangkok, Thailand",
  resume: "/resume.pdf",
};
