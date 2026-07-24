"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { id: "work", n: "01" },
  { id: "about", n: "02" },
  { id: "contact", n: "03" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">◇</span> P.&#8202;Tangoan
        </a>
        <nav className="flex items-center gap-1.5 font-mono text-[13px]">
          <div className="hidden items-center gap-1.5 sm:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`rounded-md px-2.5 py-1.5 transition-colors ${
                  active === l.id ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                <span className="text-faint">{l.n}</span> {l.id}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
