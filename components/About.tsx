import { Reveal } from "./Reveal";
import { skills } from "@/lib/projects";

const colorVar: Record<string, string> = {
  fe: "var(--fe)",
  be: "var(--be)",
  data: "var(--data)",
  tool: "var(--tool)",
};

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,6vw,72px)]">
      <Reveal>
        <h2 className="mb-9 m-0 border-b border-border-soft pb-4.5 font-mono text-sm font-normal text-accent">
          // 02 · about
        </h2>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-[clamp(19px,2.6vw,24px)] leading-[1.55] tracking-[-0.01em] text-text">
              I&apos;m a Computer Engineering graduate who gravitates toward the frontend — turning
              working systems into interfaces people actually enjoy using.
            </p>
            <p className="mt-5.5 text-[16px] leading-[1.68] text-muted">
              My background is genuinely full-stack: I&apos;ve written the Python service that ingests
              market data and the React table that renders it, the Prisma schema and the drag
              interaction on top of it. That range is exactly why the front end is where I want to
              spend my time — I know what&apos;s happening underneath, so I can build UI that&apos;s
              fast, honest about state, and considered down to the detail.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex flex-col gap-6.5">
            {skills.map((s) => (
              <div key={s.group}>
                <div className="mb-3 font-mono text-[13px]" style={{ color: colorVar[s.color] }}>
                  {s.group}
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-[13px]">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border px-3 py-1.5 text-text"
                      style={{
                        borderColor: `color-mix(in srgb, ${colorVar[s.color]} 42%, var(--border))`,
                        background: `color-mix(in srgb, ${colorVar[s.color]} 8%, transparent)`,
                      }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
