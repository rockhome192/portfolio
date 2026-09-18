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
  /**
   * The card's picture. Optional on purpose: work done inside a company cannot
   * be screenshotted, and inventing something to fill the frame would be worse
   * than an empty one. `imageNote` is what the frame says instead.
   */
  image?: string;
  imageAlt?: string;
  imageNote?: string;
};

export type TimelineEntry = {
  when: string;
  title: string;
  org: string;
  place?: string;
  kind: "work" | "study";
  /**
   * The role in one paragraph. Contributions below is what /experience
   * renders; this covers the same ground as prose, for anywhere that wants
   * one block instead of a list.
   */
  detail: string;
  /**
   * The separable pieces of work inside one role: the line a visitor reads
   * first, and the detail they open only if they want it.
   *
   * On the entry rather than in the component. Held in PixelTimeline it was
   * rendered for every entry whose kind is work, so a second job would have
   * inherited the first one's three projects.
   */
  contributions?: { title: string; summary: string; detail: string }[];
};

export const featured = {
  slug: "donatr",
  title: "DONATR",
  browserUrl: "donate-platform-web.vercel.app",
  meta: "deployed · real-time · 524 tests",
  image: "/donatr.png",
  /*
    The clip is the card; the still is what a visitor sees when the browser will
    not play it, or when they have asked for less motion. It is a frame of the
    same clip rather than a separate screenshot, so the two can never drift into
    showing different versions of the product.
  */
  video: "/donatr-demo.mp4",
  // Lives with the image, not in the component. It used to be hardcoded there,
  // so swapping the featured project left a DONATR screenshot that every screen
  // reader and crawler was told is a Kanban board.
  imageAlt:
    "The DONATR donation page on its live domain, a donation alert firing over the streamer's profile after a bank transfer was checked against the slip.",
  imageAspect: "1500 / 860",
  tagline:
    "A donation page for Thai streamers. A viewer scans a PromptPay QR, and about a second later it is on the streamer's live screen — name, message, and the message read aloud in Thai. I built all of it, including the realtime service behind the overlay.",
  stack: ["Next.js 16", "TypeScript", "WebSocket (ws)", "Prisma", "PostgreSQL", "Omise", "EasySlip", "Azure Speech"],
  /*
    One line each, and that is the whole point of them. At forty words a bullet
    is a paragraph wearing a dot: it costs the reader the same attention as
    prose and gives back none of the scanning a list is for. These three are
    hooks — an interviewer picks one and asks. The reasoning behind each lives
    in the repo's README, where somebody who wants it has already clicked.
  */
  highlights: [
    "One donation, one alert — even when the payment provider sends the same webhook three times.",
    "OBS offline at the moment the money lands? The overlay reconnects and replays what it missed.",
    "Slips are checked against the bank, because four digits of a PromptPay number are not proof.",
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
      "A Kanban board with drag-to-reorder columns and cards, checklists, labels and comments. A board used to load in several round-trips until I folded a redundant access check into the main query and it became one JOIN. Uploads go straight to Cloudflare R2 through presigned URLs, validated on the server.",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    highlights: [],
    image: "/taskboard.png",
    imageAlt:
      "The Taskboard app: a Kanban board with several columns of cards, labels and due dates.",
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
    // The project's own artwork, not a screen from it — said plainly in the alt
    // text, because a picture on a project card reads as "this is the product"
    // unless it says otherwise.
    image: "/surveillance.png",
    imageAlt:
      "Artwork from the Suicide Risk Surveillance project: the outline of Chiang Rai province over a rising chart.",
    links: [{ label: "Source", href: "https://github.com/rockhome192/finalproject-next" }],
  },
];

/**
 * Where the work happened. Trinity used to sit in the grid above as project 04,
 * and it does not belong there: it is four months of employment, not a side
 * project, and a card that cannot show a screenshot or a link was the weakest
 * thing on the page. Here it gets the room to say what was actually built.
 */
export const timeline: TimelineEntry[] = [
  {
    when: "Jan – Apr 2026",
    title: "Web Developer — Co-operative Internship",
    org: "Trinity Securities Co., Ltd.",
    place: "Silom, Bangkok",
    kind: "work",
    detail:
      "Built Tickmatch end to end — an internal tool that counts how many times a stock ticks upward during a trading day: a Python service ingesting market data files, a live table with Daily and 1-minute charts, Redis for the pipeline and cache, Docker for a reproducible environment. Led the frontend of a stock News Platform (Next.js + TypeScript) — watchlists, Premium membership, real-time Telegram alerts — and built the initial API structure; the AI sentiment service was owned by a senior engineer. Also delivered Reweb Trinity, a prototype redesign of the company site for a younger investor audience.",
    contributions: [
      {
        title: "Tickmatch",
        summary: "Built an internal tool to count upward stock ticks and explore daily and one-minute charts.",
        detail: "Implemented the market-data ingestion service in Python, the live table and charts, Redis pipeline and caching, and a reproducible Docker environment.",
      },
      {
        title: "Stock News Platform",
        summary: "Led the frontend for watchlists, Premium membership and real-time Telegram alerts.",
        detail: "Built the Next.js and TypeScript frontend and initial API structure. A senior engineer owned the AI sentiment service.",
      },
      {
        title: "Website Redesign",
        summary: "Delivered Reweb Trinity, a company-site redesign prototype for younger investors.",
        detail: "Created a prototype of the company website with a younger investor audience in mind.",
      },
    ],
  },
  {
    when: "Graduated 2026",
    title: "Bachelor of Engineering, Computer Engineering",
    org: "Mae Fah Luang University",
    place: "GPA 3.45",
    kind: "study",
    detail:
      "Built a Chiang Rai suicide-risk surveillance dashboard for the senior project, with a teammate responsible for the Random Forest model.",
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

/**
 * Every project as one list, for the pages under `/work`.
 *
 * `featured` is a wider shape than the others — it has a demo clip, a browser
 * chrome URL and an aspect ratio — so this type is the union of the two rather
 * than a lowest common denominator that would throw the clip away. Nothing new
 * is declared here: a project page renders the same strings the card does, with
 * room for the ones the card has no space for.
 *
 * The order is the order of the workshop: featured first.
 */
export type ProjectPage = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
  badge?: string;
  badgeColor?: "fe" | "be" | "data" | "tool";
  image?: string;
  imageAlt?: string;
  imageNote?: string;
  imageAspect?: string;
  video?: string;
  browserUrl?: string;
  meta?: string;
};

export const allProjects: ProjectPage[] = [{ ...featured, index: "01" }, ...projects];

export function getProject(slug: string): ProjectPage | undefined {
  return allProjects.find((p) => p.slug === slug);
}
