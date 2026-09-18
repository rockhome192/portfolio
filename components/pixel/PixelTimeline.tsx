import Link from "next/link";
import { PixelSection } from "./PixelSection";
import { timeline } from "@/lib/projects";

export function PixelTimeline() {
  return (
    <PixelSection as="h1" id="experience" room="EXPERIENCE" lede="GUILD HALL — Where the work happened.">
      <div className="pm-experience-layout">
        <ol className="pm-rail">
          {timeline.map((t) => (
            <li key={t.org + t.when} className="pm-rail-item" data-kind={t.kind}>
              <div className="pm-rail-head">
                <span className="pm-rail-when">{t.when.toUpperCase()}</span>
                <span className="pm-rail-kind">{t.kind.toUpperCase()}</span>
              </div>
              <h2 className="pm-rail-title">{t.title}</h2>
              <p className="pm-rail-org">{t.org}{t.place && <span className="pm-faint"> · {t.place}</span>}</p>
              {t.contributions ? (
                <ul className="pm-experience-contributions">
                  {t.contributions.map((item) => (
                    <li key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      {/*
                        The summary is the claim; the detail is the evidence for
                        anyone who wants it. Each summary names its own project,
                        so a screen reader hears "Read details about Tickmatch"
                        rather than the third identical "Read details" on the page.
                      */}
                      <details>
                        <summary>Read details<span className="pm-sr-only"> about {item.title}</span></summary>
                        <p>{item.detail}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pm-body">{t.detail}</p>
              )}
            </li>
          ))}
        </ol>
        <aside className="pm-experience-aside" aria-label="Experience context">
          <section aria-labelledby="experience-stack">
            <h2 id="experience-stack" className="pm-skill-group">TECH STACK</h2>
            <ul className="pm-chips">{["Next.js", "TypeScript", "Python", "Redis", "Docker"].map(s => <li key={s} className="pm-chip">{s}</li>)}</ul>
          </section>
          <section aria-labelledby="experience-projects">
            <h2 id="experience-projects" className="pm-skill-group">RELATED PROJECTS</h2>
            <ul className="pm-experience-links">
              <li><Link href="/work/surveillance">Surveillance dashboard</Link><p>University senior project</p></li>
              <li><Link href="/work/donatr">DONATR</Link><p>Independent real-time application</p></li>
            </ul>
          </section>
        </aside>
      </div>
    </PixelSection>
  );
}
