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
 * Which is why the first of those sentences sits ABOVE the board (2026-09-22).
 * Measured in a real browser, it used to start at 1071px: on a 1280x900 laptop
 * the entire first screen was a name, a three-word strapline and a game, and the
 * first line of evidence was below the fold. On a phone the same page was fine,
 * because .pm-board-wrap is display:none under 768px — so the one visitor who
 * saw no evidence was the one on a desktop, which is the recruiter. The board
 * was never the problem; being alone up there was.
 *
 * The map moved inside <main> in the same change. It was a sibling of it, which
 * said the map is not the content of this page — and the map is the whole point
 * of this page.
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

        <main className="pm-main">
          {/*
            STILL HIS TO WRITE. Everything here is lifted from copy that is
            already elsewhere on the site — nothing new is claimed — but this is
            the one paragraph a visitor is guaranteed to read, and it should be
            in his own words.
          */}
          <section className="pm-intro" aria-label="Introduction">
            <p className="pm-body pm-body-lead">
              I&apos;m a Computer Engineering graduate in Bangkok. I build full-stack web apps
              and lean toward the frontend — the donation platform in the workshop is mine end
              to end, including the realtime service behind its overlay.
            </p>
          </section>

          <PixelMap />

          {/* Below the board because it is about the board. */}
          <p className="pm-body">
            The five buttons above are the whole site: the work, where I&apos;ve been, who I
            am, what I&apos;ve been learning, and how to reach me. The map is the slow way to
            the same five rooms.
          </p>
        </main>

        <PixelFooter />
      </div>
    </div>
  );
}
