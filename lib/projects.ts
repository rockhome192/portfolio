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
  slug: "donatr",
  title: "DONATR",
  browserUrl: "donate-platform-web.vercel.app",
  meta: "deployed · real-time · solo build",
  image: "/donatr.png",
  // Lives with the image, not in the component. It used to be hardcoded there,
  // so swapping the featured project left a DONATR screenshot that every screen
  // reader and crawler was told is a Kanban board.
  imageAlt:
    "DONATR donation page on its live domain — a donation alert card firing over the streamer's profile, with the PENDING to PAID to ALERTED pipeline below it.",
  imageAspect: "1500 / 860",
  tagline:
    "A streamer donation platform with a real-time alert overlay for OBS. I wrote the WebSocket service myself rather than using a hosted one, and the parts worth reading are the ones nobody sees: what happens when a payment webhook arrives twice, when the overlay is offline at the moment the money lands, and when somebody hands the site a bank slip that is genuine but not theirs.",
  stack: ["Next.js 16", "TypeScript", "WebSocket (ws)", "Prisma", "PostgreSQL", "Omise"],
  highlights: [
    "Payments settle through one guarded UPDATE, so a duplicate webhook, a retry and the reconciler can all race and still fire exactly one alert. The route answers 200 before processing — which gives up the provider's retries, so it runs its own.",
    "The OBS overlay opens with a long-lived token, trades it for a single-use 60-second ticket, and reconnects on its own. Alerts it missed while disconnected are replayed from a partial index rather than held in browser memory, because OBS restarts lose all of that.",
    "Donations can also be paid by real bank transfer and proved with a slip, verified against the bank through SlipOK in six layers. Matching four digits of a PromptPay number turned out not to be enough — a phone shop will sell you a number ending in whatever you ask for — so the receiver's name is checked too.",
    "Azure Speech reads the donor's message aloud over the alert, synthesised once after the race is won so a duplicate delivery is never billed twice, and cached so a replay costs nothing. 470 tests in GitHub Actions.",
  ],
  links: [
    { label: "Live demo", href: "https://donate-platform-web.vercel.app" },
    { label: "Source", href: "https://github.com/rockhome192/donate-platform" },
  ],
};

export const projects: Project[] = [
  {
    slug: "taskboard",
    index: "02",
    title: "Taskboard",
    badge: "deployed · dockerized",
    badgeColor: "tool",
    tagline:
      "A Kanban board with drag-to-reorder columns and cards, checklists, labels, due dates and comments. A board used to load in several round-trips until I folded a redundant per-request access check into the main query and it became a single JOIN. Sign-up is atomic — a Prisma $transaction commits the user and its one-time code together or neither — and file uploads go straight to Cloudflare R2 through presigned URLs with size, filename and MIME checks enforced on the server.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    highlights: [],
    links: [
      { label: "Live demo", href: "https://taskboard-production-e350.up.railway.app/login" },
      { label: "Source", href: "https://github.com/rockhome192/taskboard" },
    ],
  },
  {
    slug: "surveillance",
    index: "03",
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
    index: "04",
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
  { group: "backend", color: "be", items: ["Node.js", "Python", "Prisma", "NextAuth", "REST APIs", "WebSocket (ws)"] },
  { group: "data", color: "data", items: ["PostgreSQL", "Redis", "Real-time pipelines", "Cloudflare R2"] },
  { group: "tooling", color: "tool", items: ["Docker", "Git", "Vitest", "GitHub Actions", "Railway", "Vercel"] },
];

export const contact = {
  email: "phatcharadanai.tangoan@gmail.com",
  github: "https://github.com/rockhome192",
  githubLabel: "github.com/rockhome192",
  location: "Bangkok, Thailand",
  resume: "/resume.pdf",
};
