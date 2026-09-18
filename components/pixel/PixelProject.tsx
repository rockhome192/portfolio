import Image from "next/image";
import Link from "next/link";
import { DemoVideo } from "../DemoVideo";
import { PixelSection } from "./PixelSection";
import type { ProjectPage } from "@/lib/projects";

/**
 * One project, on its own URL.
 *
 * This is the page that made the whole routed layout worth building: it is a
 * link that can be pasted into an application — "the realtime service is
 * written up at /work/donatr" — which a `#work` fragment on a single page could
 * never be, because a fragment lands you in a room with three projects in it
 * and no way to say which one you meant.
 *
 * Every string comes from lib/projects.ts. There is nothing here the card does
 * not already have; there is only room for the parts the card had to cut.
 */

const ACCENT: Record<string, string> = {
  fe: "var(--pm-lime)",
  be: "var(--pm-ice)",
  data: "var(--pm-rose)",
  tool: "var(--pm-gold)",
};

export function PixelProject({ p, others }: { p: ProjectPage; others: ProjectPage[] }) {
  const accent = ACCENT[p.badgeColor ?? "tool"];

  return (
    <PixelSection as="h1" id="project" room={p.title.toUpperCase()} lede={p.tagline}>
      <article className="pm-card pm-card-featured" style={{ borderColor: accent }}>
        <div className="pm-card-head">
          <span className="pm-tag">PROJECT {p.index}</span>
          {(p.meta || p.badge) && <span className="pm-meta">{p.meta ?? p.badge}</span>}
        </div>

        {/* The clip when there is one, the screenshot when there is not, and
            nothing at all rather than something invented — see imageNote. */}
        {p.video && p.image ? (
          <div className="pm-window">
            <div className="pm-window-bar">
              <span className="pm-window-dots" aria-hidden="true">
                <span style={{ background: "var(--pm-red)" }} />
                <span style={{ background: "var(--pm-gold)" }} />
                <span style={{ background: "var(--pm-lime)" }} />
              </span>
              <span className="pm-window-url">{p.browserUrl}</span>
              <span className="pm-window-live">LIVE</span>
            </div>
            <div className="pm-window-screen" style={{ aspectRatio: p.imageAspect }}>
              <DemoVideo
                src={p.video}
                poster={p.image}
                alt={p.imageAlt ?? ""}
                sizes="(max-width: 1024px) 100vw, 1280px"
              />
            </div>
          </div>
        ) : p.image ? (
          <div className="pm-shot">
            <Image
              src={p.image}
              alt={p.imageAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="pm-shot-img"
            />
          </div>
        ) : p.imageNote ? (
          <div className="pm-shot">
            <span className="pm-shot-note">{p.imageNote}</span>
          </div>
        ) : null}

        {p.highlights.length > 0 && (
          <ul className="pm-highlights">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <ul className="pm-chips" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s} className="pm-chip" style={{ borderColor: accent }}>
              {s}
            </li>
          ))}
        </ul>

        {p.links.length > 0 && (
          <div className="pm-linkrow">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={i === 0 ? "pm-link pm-link-primary" : "pm-link"}
              >
                {l.label.toUpperCase()} &gt;
              </a>
            ))}
          </div>
        )}
      </article>

      {/* A dead end is a page a visitor leaves. These two are the only other
          places this page can honestly send them. */}
      <nav className="pm-nav" aria-label="More projects">
        <Link href="/work" className="pm-btn">
          &lt; ALL WORK
        </Link>
        {others.map((o) => (
          <Link key={o.slug} href={`/work/${o.slug}`} className="pm-btn">
            {o.title.toUpperCase()} &gt;
          </Link>
        ))}
      </nav>
    </PixelSection>
  );
}
