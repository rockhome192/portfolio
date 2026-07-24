import { Reveal } from "./Reveal";
import { CopyEmail } from "./CopyEmail";
import { ContactForm } from "./ContactForm";
import { contact } from "@/lib/projects";

export function Footer() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1120px] px-6 pt-[clamp(48px,7vw,90px)] pb-[clamp(56px,8vw,110px)]"
    >
      <Reveal>
        <h2 className="mb-10 m-0 border-b border-border-soft pb-4.5 font-mono text-sm font-normal text-accent">
          // 03 · contact
        </h2>
      </Reveal>

      <Reveal>
        <div>
          <div className="mb-3.5 font-mono text-sm text-muted">$ let&apos;s build something</div>
          <a
            href={`mailto:${contact.email}`}
            className="inline-block break-all text-[clamp(21px,5.2vw,54px)] font-bold leading-[1.1] tracking-[-0.03em] text-text transition-colors hover:text-accent sm:break-words sm:leading-[1.05]"
          >
            {contact.email}
          </a>
          <div className="mt-9 flex flex-wrap items-center gap-6 font-mono text-[14.5px]">
            <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-text transition-colors hover:text-accent">
              GitHub <span className="text-faint">↗</span>
            </a>
            <CopyEmail />
            <a href={contact.resume} className="inline-flex items-center gap-2 text-text transition-colors hover:text-accent">
              Resume <span className="text-faint">↗</span>
            </a>
            <span className="inline-flex items-center gap-2 text-muted">
              <span className="h-[7px] w-[7px] rounded-full bg-ok" />
              {contact.location}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative mt-11 max-w-[560px]">
          <ContactForm />
        </div>
      </Reveal>

      <footer className="mt-[clamp(56px,9vw,96px)] flex flex-wrap justify-between gap-3 border-t border-border-soft pt-6 font-mono text-[12.5px] text-faint">
        <span>© {new Date().getFullYear()} Phatcharadanai Tangoan</span>
        <span>Built with Next.js · TypeScript · Tailwind</span>
      </footer>
    </section>
  );
}
