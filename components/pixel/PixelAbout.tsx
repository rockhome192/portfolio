import { PixelSection } from "./PixelSection";
import { skills } from "@/lib/projects";

const ACCENT: Record<string, string> = {
  fe: "var(--pm-lime)",
  be: "var(--pm-ice)",
  data: "var(--pm-rose)",
  tool: "var(--pm-gold)",
};

/**
 * ABOUT HALL.
 *
 * The emphasis here is coloured, not bold. VT323 ships one weight, and a
 * browser asked for bold it does not have will fake it by smearing the glyph
 * sideways — which on a pixel face reads as a broken screen. Colour is how
 * every game this page is dressed as has always emphasised a noun.
 */
export function PixelAbout() {
  return (
    <PixelSection as="h1" id="about" room="ABOUT HALL">
      <div className="pm-two-col">
        <div className="pm-prose">
          <p className="pm-body pm-body-lead">
            I&apos;m a Computer Engineering graduate who gravitates toward the frontend — turning
            working systems into interfaces people actually enjoy using.
          </p>
          <p className="pm-body">
            My background is genuinely full-stack: I&apos;ve written the{" "}
            <span className="pm-k">Python service</span> that ingests market data and the{" "}
            <span className="pm-k">React table</span> that renders it, the{" "}
            <span className="pm-k">Prisma schema</span> and the drag interaction on top of it.
          </p>
          <p className="pm-body">
            That range is exactly why the front end is where I want to spend my time — I know
            what&apos;s happening underneath, so I can build UI that&apos;s fast, honest about
            state, and considered down to the detail.
          </p>
        </div>

        <div className="pm-skills">
          {skills.map((s) => (
            <div key={s.group}>
              <h2 className="pm-skill-group" style={{ color: ACCENT[s.color] }}>
                {s.group.toUpperCase()}
              </h2>
              <ul className="pm-chips">
                {s.items.map((i) => (
                  <li key={i} className="pm-chip" style={{ borderColor: ACCENT[s.color] }}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PixelSection>
  );
}
