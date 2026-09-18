"use client";

import { useEffect, useState } from "react";

/**
 * The three switches the page hands the visitor.
 *
 * READ MODE is the important one. A pixel face is a deliberate cost: it is
 * slower to read than a normal one, and some people cannot read it at all. The
 * honest answer to that is not to pick a duller font — it is to keep the
 * typeface and let anyone opt out of it in one click, which is also the most
 * useful sentence this page can produce in an interview.
 *
 * All three write an attribute on <html> and a key in localStorage; the inline
 * script in app/layout.tsx replays them before first paint so nothing flashes.
 */

type Switch = {
  attr: "data-read" | "data-crt" | "data-theme";
  key: string;
  on: string;
  off: string;
  /** Fixed, because aria-pressed carries the state and a label that also
      changes leaves a screen reader unable to tell state from action. */
  label: string;
  title: (on: boolean) => string;
  /** Which value counts as "on" for the pressed state. */
  initial: string;
};

const SWITCHES: Switch[] = [
  {
    attr: "data-read",
    key: "pm-read",
    on: "on",
    off: "off",
    initial: "off",
    label: "READ MODE",
    title: (on) =>
      on ? "Switch back to the pixel typeface" : "Set the text in a plain, larger typeface",
  },
  {
    attr: "data-crt",
    key: "pm-crt",
    on: "on",
    off: "off",
    initial: "on",
    label: "CRT",
    title: (on) => (on ? "Turn off the scanline overlay" : "Turn on the scanline overlay"),
  },
  {
    attr: "data-theme",
    key: "theme",
    on: "dark",
    off: "light",
    initial: "dark",
    label: "NIGHT MODE",
    title: (on) => (on ? "Switch to the daylight palette" : "Switch to the night palette"),
  },
];

/** The defaults the server renders from, before this visitor is known. */
const SERVER_STATE: Record<string, string> = Object.fromEntries(
  SWITCHES.map((s) => [s.key, s.initial]),
);

/** What <html> actually says, which the inline script stamped before first paint. */
function readSwitches(): Record<string, string> {
  if (typeof document === "undefined") return SERVER_STATE;
  return Object.fromEntries(
    SWITCHES.map((s) => [s.key, document.documentElement.getAttribute(s.attr) ?? s.initial]),
  );
}

export function PixelControls() {
  /*
    Start from what the server rendered, then correct once on the client.

    Reading <html> in the initializer looks better and does not work. These
    nodes carry suppressHydrationWarning, which tells React to keep the server's
    markup and skip the correction — so the DOM held aria-pressed="true" and the
    word ON while React's own copy already said false. A later render that
    computes false again is not a change, React patches nothing, and a visitor
    whose system asks for the light palette reads NIGHT MODE ON over a daylight
    page for the whole visit.

    Matching the server on the first render is what gives the effect below
    something to change. The cost is one frame of the default state for a
    visitor who chose otherwise; the alternative was being wrong until they left.
  */
  const [state, setState] = useState<Record<string, string>>(SERVER_STATE);

  useEffect(() => {
    setState(readSwitches());
  }, []);

  function toggle(s: Switch) {
    const next = state[s.key] === s.on ? s.off : s.on;
    setState((prev) => ({ ...prev, [s.key]: next }));
    document.documentElement.setAttribute(s.attr, next);
    try {
      localStorage.setItem(s.key, next);
    } catch {
      // Private browsing, or storage disabled. The switch still works for this
      // visit; it just will not be remembered, which is not worth an error.
    }
  }

  return (
    <div className="pm-switches">
      {SWITCHES.map((s) => {
        const on = state[s.key] === s.on;
        return (
          <button
            key={s.key}
            type="button"
            className="pm-switch"
            data-switch={s.key}
            aria-pressed={on}
            aria-label={s.label}
            title={s.title(on)}
            /* The server cannot know what this visitor chose last time. */
            suppressHydrationWarning
            onClick={() => toggle(s)}
          >
            {s.label}
            <span className="pm-switch-state" aria-hidden="true" suppressHydrationWarning>{on ? "ON" : "OFF"}</span>
          </button>
        );
      })}
    </div>
  );
}
