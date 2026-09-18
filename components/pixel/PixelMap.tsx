"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  COLS,
  DOORS,
  FRAMES,
  MAP,
  ROOM_HREF,
  ROOMS,
  ROWS,
  SIGNS,
  SOLID,
  SPRITE_COLORS,
  START,
  STEP_MS,
  directionFor,
  type Direction,
  type PanelId,
} from "./map-data";
import { STATIC_TILES } from "./tiles";
import "./pixel.css";

/**
 * The overworld from the Pixel Portfolio design canvas.
 *
 * It is a second way into the page, not the only way: every door is a link to a
 * section that is already in the document, and the row of buttons underneath
 * says the same five things in plain text. A visitor with no keyboard, no
 * mouse, no JavaScript or no sight uses that row; the map is for everyone else.
 */

const TILE_W = 100 / COLS;
const TILE_H = 100 / ROWS;

/** Door coordinates, parsed once out of the "row,col" keys. */
const DOOR_LIST = Object.entries(DOORS).map(([key, door]) => {
  const [row, col] = key.split(",").map(Number);
  return { row, col, ...door };
});

type Pose = { row: number; col: number; facing: 1 | -1; frame: 0 | 1 };
/** A physically held key. Keyed by code, because ArrowRight and "d" are both "right". */
type Held = { code: string; dir: Direction };

export function PixelMap({ className }: { className?: string }) {
  const [pose, setPose] = useState<Pose>({
    row: START.row,
    col: START.col,
    facing: 1,
    frame: 0,
  });
  /** True only while the board itself holds focus. See the comment on onKeyDown. */
  const [playing, setPlaying] = useState(false);

  /*
    The walk loop reads and writes these directly. They are refs, not state,
    because a held arrow key changes them up to seven times a second and none of
    it should cost a render on its own — `pose` is the only thing React needs.
  */
  const poseRef = useRef<Pose>(pose);
  const pressedRef = useRef<Held[]>([]);
  const timerRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);

  const hintId = useId();

  const stopClock = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Forget every key we think is held.
   *
   * Anything that can take focus or attention away mid-stride clears the set:
   * entering a room, leaving the board, leaving the tab, leaving the window,
   * scrolling the board out of view. Otherwise a keyup is delivered somewhere
   * else, the direction stays "held" forever, and the player walks by itself.
   */
  const releaseKeys = useCallback(() => {
    pressedRef.current = [];
    stopClock();
  }, [stopClock]);

  /**
   * Walk through a door.
   *
   * Every room is its own page, so this is a real navigation and it DOES push a
   * history entry — walking into the workshop and pressing Back puts you on the
   * map, which is what a visitor means by Back. That was not true of the
   * fragment version: four doors in a minute left four entries between the
   * visitor and the way off the site, replaying scroll positions they never
   * chose, so it used `replaceState`.
   *
   * `releaseKeys()` first, before the navigation: this component unmounts on
   * the way out, and a direction still sitting in `pressedRef` would be a
   * stuck key the moment the visitor walks back to the map.
   */
  const router = useRouter();
  const enterRoom = useCallback(
    (panel: PanelId) => {
      releaseKeys();
      router.push(ROOM_HREF[panel]);
    },
    [releaseKeys, router],
  );

  /** One square, or one turn-on-the-spot if the way is blocked. */
  const step = useCallback(() => {
    const held = pressedRef.current[pressedRef.current.length - 1];
    if (!held) return;

    const cur = poseRef.current;
    let { row, col } = cur;
    let facing = cur.facing;

    if (held.dir === "up") row -= 1;
    else if (held.dir === "down") row += 1;
    else if (held.dir === "left") {
      col -= 1;
      facing = -1;
    } else {
      col += 1;
      facing = 1;
    }

    // Flip the walk frame either way, so walking into a wall still animates.
    const frame: 0 | 1 = cur.frame === 0 ? 1 : 0;

    const inBounds = row >= 0 && row < ROWS && col >= 0 && col < COLS;
    const blocked = !inBounds || SOLID[MAP[row][col]];

    const next: Pose = blocked ? { ...cur, facing, frame } : { row, col, facing, frame };

    poseRef.current = next;
    setPose(next);

    if (!blocked) {
      const door = DOORS[`${row},${col}`];
      if (door) enterRoom(door.panel);
    }
  }, [enterRoom]);

  const startClock = useCallback(() => {
    if (timerRef.current !== null) return;
    timerRef.current = window.setInterval(step, STEP_MS);
  }, [step]);

  /*
    Scrolling the board away also stands the game down.

    Focus is what arms it (below), but a visitor can focus the board, scroll on
    with the wheel, and leave a focused-but-invisible game holding their keys.
    This is a release condition only — it can never arm anything.
  */
  useEffect(() => {
    const node = boardRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) node.blur();
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      /*
        The game only exists while the board has focus.

        Two separate rules make this non-negotiable, and the first version of
        this component broke both. Gating on "is the board visible" meant
        ArrowDown was cancelled for the first ~560px of the page, so a keyboard
        visitor could not scroll it at all (WCAG 2.1.1). And w/a/s/d were live
        page-wide with no way to switch them off, which is a single-character
        shortcut active without component focus (WCAG 2.1.4). Focus fixes both:
        the keys belong to the page until someone deliberately picks the game up,
        and Tab or a click elsewhere puts it down again.
      */
      if (!playingRef.current) return;
      // Ctrl/Cmd/Alt + A, S, D, W are Select All, Save, Bookmark and friends.
      // e.key is just the letter under the chord, so without this the game
      // cancels all of them — and on macOS the browser often withholds the
      // keyup while Cmd is down, which would leave the key stuck "held".
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      // Held keys are driven by our own clock; the OS repeat would double-step.
      if (e.repeat) return;

      const dir = directionFor(e.key);
      if (!dir) return;
      e.preventDefault();

      // Identity is the physical key, not the direction it maps to. Tracking
      // directions meant releasing "d" also released a still-held ArrowRight,
      // and the player froze mid-walk with a key down.
      const code = e.code || e.key;
      const pressed = pressedRef.current.filter((k) => k.code !== code);
      // Last key pressed wins, which is what a player expects when they roll
      // from one direction into another without letting go of the first.
      pressed.push({ code, dir });
      pressedRef.current = pressed;

      // Step immediately only from a standstill. Doing it on every keydown fired
      // an extra step out of phase with the clock and the sprite jumped two
      // tiles against its 135ms transition.
      if (timerRef.current === null) step();
      // step() may have entered a room, which clears the held keys. Starting the
      // clock unconditionally would undo that release one line later.
      if (pressedRef.current.length > 0) startClock();
    }

    function onKeyUp(e: KeyboardEvent) {
      const code = e.code || e.key;
      pressedRef.current = pressedRef.current.filter((k) => k.code !== code);
      if (pressedRef.current.length === 0) stopClock();
    }

    function onHide() {
      if (document.visibilityState === "hidden") releaseKeys();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", releaseKeys);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", releaseKeys);
      document.removeEventListener("visibilitychange", onHide);
      // Not stopClock() — if this effect ever re-runs mid-walk, a stopped clock
      // with keys still in pressedRef would leave the player frozen until the
      // next fresh keydown.
      releaseKeys();
    };
  }, [releaseKeys, startClock, step, stopClock]);

  const here = DOORS[`${pose.row},${pose.col}`];

  return (
    <section
      className={className ? `pm-root ${className}` : "pm-root"}
      aria-label="Overworld map"
      style={{ "--pm-step": `${STEP_MS}ms` } as CSSProperties}
    >
      <div className="pm-board-wrap">
        <div
          ref={boardRef}
          className="pm-board"
          data-playing={playing ? "true" : "false"}
          style={{
            aspectRatio: `${COLS} / ${ROWS}`,
            /*
              At 1440x900 the board measured 1248x749 starting at y=182, so it
              ran 31px past the fold and took "CLICK OR TAB TO PLAY" with it —
              the one line that tells anyone the map is playable. Capping the
              width by the height that is actually left keeps the whole board,
              badge included, above the fold on a laptop.
            */
            maxWidth: `calc((100svh - 200px) * ${COLS} / ${ROWS})`,
          }}
          /* Focusable so the keyboard can pick the game up and put it down. */
          tabIndex={0}
          role="group"
          aria-label="Overworld map, an optional game. The five doors are also links below."
          aria-describedby={hintId}
          onFocus={() => {
            playingRef.current = true;
            setPlaying(true);
          }}
          onBlur={() => {
            playingRef.current = false;
            setPlaying(false);
            releaseKeys();
          }}
          onMouseDown={() => boardRef.current?.focus()}
        >
          {/* Ground, buildings and scenery. Built once at module scope — see tiles.tsx. */}
          <div className="pm-layer" aria-hidden="true">
            {STATIC_TILES}
          </div>

          {/* Signs are painted on; their words are repeated on the buttons below. */}
          <div className="pm-layer" aria-hidden="true">
            {SIGNS.map((sign) => (
              <div
                key={sign.label}
                className="pm-sign"
                style={{
                  left: `${sign.col * TILE_W}%`,
                  top: `${sign.row * TILE_H}%`,
                  width: `${sign.span * TILE_W}%`,
                }}
              >
                <span className="pm-sign-plate" style={{ color: sign.color }}>
                  {sign.label}
                </span>
              </div>
            ))}
          </div>

          {/*
            Clickable, but deliberately not a second set of tab stops: the row
            below already names these five destinations, and ten controls for
            five places is worse for a screen reader than five.
          */}
          {DOOR_LIST.map((door) => (
            <Link
              key={door.panel}
              href={ROOM_HREF[door.panel]}
              className="pm-door"
              aria-hidden="true"
              tabIndex={-1}
              style={{
                left: `${door.col * TILE_W}%`,
                top: `${door.row * TILE_H}%`,
                width: `${TILE_W}%`,
                height: `${TILE_H}%`,
              }}
            >
              <span className="pm-door-glow" />
              <span className="pm-door-knob" />
            </Link>
          ))}

          <div
            className="pm-player"
            aria-hidden="true"
            style={{
              left: `${pose.col * TILE_W}%`,
              top: `${(pose.row - 0.2) * TILE_H}%`,
              width: `${TILE_W}%`,
              height: `${TILE_H}%`,
              transform: `scaleX(${pose.facing})`,
            }}
          >
            {FRAMES[pose.frame].map((line, y) =>
              line.split("").map((ch, x) => {
                const color = SPRITE_COLORS[ch];
                if (!color) return null;
                return (
                  <span
                    key={`${x}_${y}`}
                    className="pm-px"
                    style={{
                      left: `${x * 12.5}%`,
                      top: `${y * 12.5}%`,
                      width: "12.5%",
                      height: "12.5%",
                      background: color,
                    }}
                  />
                );
              }),
            )}
          </div>

          <div className="pm-crt" aria-hidden="true" />

          {/* Says which of the two states the board is in, because "my arrow
              keys do nothing" and "my arrow keys do something unexpected" are
              both confusing without it. */}
          <span className="pm-play-badge" aria-hidden="true">
            {playing ? "WALKING" : "CLICK OR TAB TO PLAY"}
          </span>
        </div>

        <div className="pm-status">
          <span className="pm-status-key">LOCATION</span>
          {/* Not a live region: walking on and off a door would announce
              "ABOUT HALL / OVERWORLD" over and over, and entering the room
              already moves focus to a heading that says the same thing. */}
          <span className="pm-status-val">{here ? here.label : "OVERWORLD"}</span>
        </div>
      </div>

      {/*
        The same five places, in plain text, for everyone who will not play —
        and the reason a door feels instant: Link prefetches each room, so by
        the time the sprite reaches one the page is usually already here.
      */}
      <nav className="pm-nav" id="rooms" aria-label="Rooms">
        {ROOMS.map((item) => (
          <Link
            key={item.panel}
            href={item.href}
            className={item.panel === "mail" ? "pm-btn pm-btn-primary" : "pm-btn"}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="pm-hint" id={hintId}>
        Click the map, then walk with the arrow keys or W A S D. Walk into a door to go
        into that room. Tab away to give the arrow keys back to the page.
      </p>
    </section>
  );
}
