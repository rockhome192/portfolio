import { Reveal } from "./Reveal";
import { timeline } from "@/lib/projects";

/**
 * Employment and study, on one rail.
 *
 * It exists because the internship was being shown as project 04 in the grid
 * above — four months of paid work reduced to the one card with no screenshot
 * and no link, sitting next to weekend projects. A recruiter scanning for
 * experience had nowhere to find it.
 *
 * One column rather than the alternating left-right timelines these sections
 * usually get: at two entries the alternation is decoration, and it collapses
 * to a single column on a phone anyway, which is where most of these get read.
 */
export function Timeline() {
  return (
    <section id="experience" className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,6vw,72px)]">
      <Reveal>
        <h2 className="mb-9 m-0 border-b border-border-soft pb-4.5 font-mono text-sm font-normal text-accent">
          // 02 · experience
        </h2>
      </Reveal>

      <ol className="relative m-0 list-none p-0">
        {/* The rail. Stops at the last dot instead of running past it. */}
        <span
          aria-hidden
          className="absolute left-[5px] top-3 w-px bg-border"
          style={{ height: "calc(100% - 26px)" }}
        />

        {timeline.map((t, i) => (
          <li key={t.org + t.when} className="relative pl-8 pb-11 last:pb-0">
            {/*
              Outside <Reveal> on purpose. Reveal animates a transform, and a
              transformed element becomes the containing block for anything
              absolute inside it — so this dot resolved `left-0` against the
              padded text instead of the rail, and sat on top of the date.
            */}
            <span
              aria-hidden
              className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 bg-bg"
              style={{
                borderColor: t.kind === "work" ? "var(--accent)" : "var(--data)",
              }}
            />

            <Reveal delay={i * 0.09}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[13px] text-faint">{t.when}</span>
                <span
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                  style={{
                    color: t.kind === "work" ? "var(--accent)" : "var(--data)",
                    borderColor: `color-mix(in srgb, ${
                      t.kind === "work" ? "var(--accent)" : "var(--data)"
                    } 40%, var(--border))`,
                    background: `color-mix(in srgb, ${
                      t.kind === "work" ? "var(--accent)" : "var(--data)"
                    } 9%, transparent)`,
                  }}
                >
                  {t.kind === "work" ? "work" : "study"}
                </span>
              </div>

              <h3 className="mt-2 text-[19px] font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-1 font-mono text-[13.5px] text-muted">
                {t.org}
                {t.place && <span className="text-faint"> · {t.place}</span>}
              </p>
              <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.65] text-muted">{t.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
