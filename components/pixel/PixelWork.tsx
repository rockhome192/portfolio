import Image from "next/image";
import Link from "next/link";
import { DemoVideo } from "../DemoVideo";
import { PixelSection } from "./PixelSection";
import { featured, projects, type Project } from "@/lib/projects";

/**
 * WORKSHOP — the projects.
 *
 * Every string comes from lib/projects.ts. The canvas export had these three
 * taglines typed out by hand in its markup, which meant the site had two copies
 * of the same sentence and no way to notice when they drifted apart.
 */

const ACCENT: Record<string, string> = {
  fe: "var(--pm-lime)",
  be: "var(--pm-ice)",
  data: "var(--pm-rose)",
  tool: "var(--pm-gold)",
};

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="pm-chips" aria-label="Stack">
      {items.map((s) => (
        <li key={s} className="pm-chip">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Links({ links, slug }: { links: Project["links"]; slug: string }) {
  return (
    <div className="pm-linkrow">
      <Link href={`/work/${slug}`} className="pm-link">
        READ MORE &gt;
      </Link>
      {links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={i === 0 && l.label === "Live demo" ? "pm-link pm-link-primary" : "pm-link"}
        >
          {l.label.toUpperCase()} &gt;
        </a>
      ))}
    </div>
  );
}

function SecondaryCard({ p }: { p: Project }) {
  return (
    <article className="pm-card" style={{ borderColor: ACCENT[p.badgeColor ?? "tool"] }}>
      {(p.image || p.imageNote) && (
        <div className="pm-shot">
          {p.image ? (
            <Image
              src={p.image}
              alt={p.imageAlt ?? ""}
              fill
              sizes="(max-width: 860px) 100vw, 620px"
              className="pm-shot-img"
            />
          ) : (
            /*
              Deliberately empty rather than filled with something invented.
              Work done inside a company has no screenshot to show, and saying
              so is a fact about the work; a stock image here would be a lie
              about it.
            */
            <span className="pm-shot-note">{p.imageNote}</span>
          )}
        </div>
      )}

      <div className="pm-card-head">
        <h2 className="pm-card-title" style={{ color: ACCENT[p.badgeColor ?? "tool"] }}>
          {p.index} {p.title.toUpperCase()}
        </h2>
        {p.badge && <span className="pm-badge">{p.badge}</span>}
      </div>

      <p className="pm-body">{p.tagline}</p>
      <Stack items={p.stack} />
      <Links links={p.links} slug={p.slug} />
    </article>
  );
}

export function PixelWork() {
  return (
    <PixelSection
      as="h1"
      id="work"
      room="WORKSHOP"
      lede={`${projects.length + 1} projects. Two of them are running right now.`}
    >
      <article className="pm-card pm-card-featured">
        <div className="pm-card-head">
          <span className="pm-tag">FEATURED</span>
          <span className="pm-meta">{featured.meta}</span>
        </div>

        {/* A browser window, drawn the way this page draws everything else. */}
        <div className="pm-window">
          <div className="pm-window-bar">
            <span className="pm-window-dots" aria-hidden="true">
              <span style={{ background: "var(--pm-red)" }} />
              <span style={{ background: "var(--pm-gold)" }} />
              <span style={{ background: "var(--pm-lime)" }} />
            </span>
            <span className="pm-window-url">{featured.browserUrl}</span>
            <span className="pm-window-live">LIVE</span>
          </div>
          <div className="pm-window-screen" style={{ aspectRatio: featured.imageAspect }}>
            <DemoVideo
              src={featured.video}
              poster={featured.image}
              alt={featured.imageAlt}
              sizes="(max-width: 1024px) 100vw, 1280px"
            />
          </div>
        </div>

        <h2 className="pm-card-title pm-card-title-lg">01 {featured.title}</h2>
        <p className="pm-body">{featured.tagline}</p>

        <ul className="pm-highlights">
          {featured.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <Stack items={featured.stack} />
        <Links links={featured.links} slug={featured.slug} />
      </article>

      <div className="pm-grid-2">
        {projects.map((p) => (
          <SecondaryCard key={p.slug} p={p} />
        ))}
      </div>
    </PixelSection>
  );
}
