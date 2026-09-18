import "@/components/pixel/pixel-ui.css";
import { PixelHeader } from "@/components/pixel/PixelHeader";
import { PixelMap } from "@/components/pixel/PixelMap";
import { PixelFooter } from "@/components/pixel/PixelFooter";

/**
 * The map IS this page.
 *
 * Every room is its own route now, so the five sections that used to live under
 * the board have moved to /work, /experience, /about, /dev-log and /contact,
 * and each project has a page of its own under /work. What that buys, and the
 * reason it was worth the rewrite: /work/donatr is a URL to paste into a job
 * application. A `#work` fragment on a single page never could be.
 *
 * What replaces them here is three sentences. A homepage of twenty words and a
 * game is a homepage with nothing for a crawler, and nothing for a recruiter
 * who will not play — they read this, take the buttons, and never touch the
 * board.
 *
 * The previous design's components (Hero, Nav, Work, Timeline, About, Footer)
 * are still in components/ and still work — they read the same lib/projects.ts.
 */
export default function Home() {
  return (
    <div className="pm-shell">
      <div className="pm-page">
        {/* Past the board, to the row of links that says the same five things. */}
        <a href="#rooms" className="pm-skip pm-btn">
          SKIP TO THE ROOMS
        </a>

        <PixelHeader home />
        <PixelMap />

        <main className="pm-main">
          {/*
            PLACEHOLDER, and it should be replaced with his own three sentences.
            Everything here is lifted from copy that is already on the site —
            nothing new is claimed — but the homepage paragraph is the one piece
            of writing a visitor is guaranteed to read.
          */}
          <section className="pm-intro" aria-label="Introduction">
            <p className="pm-body pm-body-lead">
              I&apos;m a Computer Engineering graduate in Bangkok. I build full-stack web apps
              and lean toward the frontend — the donation platform in the workshop is mine end
              to end, including the realtime service behind its overlay.
            </p>
            <p className="pm-body">
              The five buttons above are the whole site: the work, where I&apos;ve been, who I
              am, what I&apos;ve been learning, and how to reach me. The map is the slow way to
              the same five rooms.
            </p>
          </section>
        </main>

        <PixelFooter />
      </div>
    </div>
  );
}
