import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Press_Start_2P,
  VT323,
} from "next/font/google";
import "./globals.css";
import "./pixel-tokens.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// The overworld's two faces. Press Start 2P for anything that reads as a
// label or a sign, VT323 for room copy — see components/pixel/pixel.css for why
// each one is sized the way it is.
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

const description =
  "Full-stack developer, frontend-focused. Next.js, React, and TypeScript. Based in Bangkok.";

const siteTitle = "Phatcharadanai Tangoan — Full-stack Developer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /*
    Every room is its own page now, so every room needs its own <title>. The
    template puts the name after the room — "Workshop — Phatcharadanai Tangoan"
    — and `default` is what `/` keeps, because the map is not a room.

    openGraph.title has no template of its own here on purpose: a page that sets
    its own `title` also replaces this one, and the five that do are more useful
    in a link preview than the site name five times.
  */
  title: {
    default: siteTitle,
    template: "%s — Phatcharadanai Tangoan",
  },
  description,
  openGraph: {
    title: siteTitle,
    description,
    type: "website",
    url: siteUrl,
    siteName: "Phatcharadanai Tangoan",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f7" },
  ],
};

const themeScript = `
(function () {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    d.setAttribute('data-theme', t);
    // Replayed before first paint so the pixel page never flashes the wrong
    // typeface, or a scanline overlay the visitor already switched off.
    d.setAttribute('data-read', localStorage.getItem('pm-read') || 'off');
    d.setAttribute('data-crt', localStorage.getItem('pm-crt') || 'on');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-read="off"
      data-crt="on"
      /* The inline script below rewrites all three before paint from what this
         visitor chose last time, and the server cannot know that. Without this,
         React 19 diffs the <html> attributes during hydration and logs a
         recoverable error on every return visit. */
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${pressStart.variable} ${vt323.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="backdrop" aria-hidden="true" />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
