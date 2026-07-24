import { Reveal } from "./Reveal";
import { Typewriter } from "./Typewriter";
import { BangkokClock } from "./BangkokClock";
import { contact } from "@/lib/projects";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1120px] px-6 pb-[clamp(48px,8vw,88px)] pt-[clamp(56px,11vw,124px)]">
      <Reveal>
        <div className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-2xl border border-border bg-surface px-3.5 py-1.5 font-mono text-[12.5px] text-muted sm:rounded-full sm:text-[13px]">
          <span
            className="anim-pulse h-2 w-2 rounded-full bg-ok"
            style={{ animation: "pulse 2.4s ease-out infinite" }}
          />
          Available for work
          <span className="text-faint">·</span> Bangkok
          <span className="text-faint">·</span> <BangkokClock />
        </div>
      </Reveal>

      <Reveal delay={0.09}>
        <h1 className="mt-7 text-[clamp(34px,9vw,110px)] font-bold leading-[0.96] tracking-[-0.035em] sm:leading-[0.93]">
          Phatcharadanai<br />Tangoan<span className="text-accent">.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 font-mono text-[clamp(16px,2.4vw,22px)] font-medium text-text">
          Full-stack developer, <Typewriter text="frontend-focused" />
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-5 max-w-[60ch] text-[clamp(16px,2vw,18.5px)] leading-[1.65] text-muted">
          Computer Engineering graduate based in Bangkok. I build products end to end — but I care
          most about the front: interfaces that feel fast, legible, and considered. Right now I&apos;m
          looking for a full-stack or frontend role where craft matters.
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="mt-9 flex flex-wrap gap-3 font-mono text-sm">
          <a
            href={contact.resume}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            Resume <span className="opacity-70">↗</span>
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-text transition-colors hover:border-accent"
          >
            GitHub <span className="text-faint">↗</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-text transition-colors hover:border-accent"
          >
            Email
          </a>
        </div>
      </Reveal>
    </section>
  );
}
