import Image from "next/image";
import { Reveal } from "./Reveal";
import { featured, projects, type Project } from "@/lib/projects";

const colorVar: Record<string, string> = {
  fe: "var(--fe)",
  be: "var(--be)",
  data: "var(--data)",
  tool: "var(--tool)",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[13px] text-text">
      {children}
    </span>
  );
}

function ArrowLink({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-lg bg-accent px-[18px] py-2.5 font-semibold text-on-accent transition-opacity hover:opacity-90"
          : "inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-[18px] py-2.5 text-text transition-colors hover:border-accent"
      }
    >
      {label} <span className={primary ? "opacity-70" : "text-faint"}>↗</span>
    </a>
  );
}

function SecondaryCard({ p, delay }: { p: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[13px] text-faint">{p.index}</span>
          {p.badge && (
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[11.5px]"
              style={{
                color: colorVar[p.badgeColor!],
                borderColor: `color-mix(in srgb, ${colorVar[p.badgeColor!]} 40%, var(--border))`,
                background: `color-mix(in srgb, ${colorVar[p.badgeColor!]} 9%, transparent)`,
              }}
            >
              {p.badge}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-[22px] font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-[1.62] text-muted">{p.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[12.5px]">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-border px-2.5 py-1 text-muted">
              {s}
            </span>
          ))}
        </div>
        {p.links.length > 0 && (
          <div className="mt-5 flex gap-4 font-mono text-[13px]">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-text transition-colors hover:text-accent">
                {l.label} <span className="text-faint">↗</span>
              </a>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1120px] px-6 py-[clamp(40px,6vw,72px)]">
      <Reveal>
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4 border-b border-border-soft pb-4.5">
          <h2 className="m-0 font-mono text-sm font-normal text-accent">// 01 · selected work</h2>
          <div className="font-mono text-[12.5px] text-faint">3 projects</div>
        </div>
      </Reveal>

      {/* Featured */}
      <Reveal>
        <article>
          <div className="mb-4.5 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-on-accent">
              FEATURED
            </span>
            <span className="font-mono text-[13px] text-muted">{featured.meta}</span>
          </div>

          {/* browser window */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface2" style={{ boxShadow: "var(--shadow)" }}>
            <div className="flex items-center gap-2.5 border-b border-border bg-surface px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
              </span>
              <span className="mx-auto max-w-[420px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-border-soft bg-bg2 px-3 py-1.5 text-center font-mono text-[12.5px] text-muted">
                {featured.browserUrl}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-ok">
                <span className="h-[7px] w-[7px] rounded-full bg-ok" />live
              </span>
            </div>
            <div className="relative bg-bg2" style={{ aspectRatio: featured.imageAspect }}>
              <Image
                src={featured.image}
                alt="Taskboard Kanban app — To Do, Backlog, In Progress and Done columns with colored cards, checklists, due dates and labels."
                fill
                sizes="(max-width: 1024px) 100vw, 1072px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-[clamp(26px,3.6vw,36px)] font-bold tracking-tight">{featured.title}</h3>
              <p className="mt-3.5 max-w-[54ch] text-[16.5px] leading-[1.65] text-muted">{featured.tagline}</p>
              <ul className="mt-4 space-y-2.5">
                {featured.highlights.map((h) => (
                  <li key={h} className="relative pl-4 text-[14.5px] leading-[1.6] text-muted">
                    <span className="absolute left-0 top-2.5 h-1 w-1 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
                <ArrowLink href={featured.links[0].href} label={featured.links[0].label} primary />
                <ArrowLink href={featured.links[1].href} label={featured.links[1].label} />
              </div>
            </div>
            <div>
              <div className="mb-3 font-mono text-xs text-faint">// stack</div>
              <div className="flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Secondary */}
      <div className="mt-13 grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <SecondaryCard key={p.slug} p={p} delay={i * 0.09} />
        ))}
      </div>
    </section>
  );
}
