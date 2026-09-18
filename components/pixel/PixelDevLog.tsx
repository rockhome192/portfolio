import { PixelSection } from "./PixelSection";
import { devlog } from "@/lib/devlog";

const ACCENT: Record<string, string> = {
  fe: "var(--pm-lime)",
  be: "var(--pm-ice)",
  data: "var(--pm-rose)",
  tool: "var(--pm-gold)",
};

/**
 * LIBRARY — the dev log.
 *
 * The one room the pixel design added that the old page did not have: a problem
 * per project, named plainly enough that an interviewer can pick one up and ask
 * about it. Content lives in lib/devlog.ts.
 */
export function PixelDevLog() {
  return (
    <PixelSection
      as="h1"
      id="devlog"
      room="LIBRARY"
      lede="One problem per project, and what it turned out to be about."
    >
      <div className="pm-grid-2">
        {devlog.map((entry) => (
          <article key={entry.slug} className="pm-card pm-card-quiet">
            <p className="pm-entry-tag" style={{ color: ACCENT[entry.color] }}>
              {entry.project.toUpperCase()}
            </p>
            <h2 className="pm-card-title">{entry.title}</h2>
            <p className="pm-body">{entry.body}</p>
          </article>
        ))}
      </div>
    </PixelSection>
  );
}
