"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, 58);
    };
    const start = setTimeout(tick, 620);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <>
      <span className="text-accent">{shown}</span>
      <span
        aria-hidden="true"
        className="anim-blink inline-block w-[0.6ch] font-normal text-accent"
        style={{ animation: "blink 1.05s step-end infinite" }}
      >
        ▮
      </span>
    </>
  );
}
