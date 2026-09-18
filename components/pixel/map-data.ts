/**
 * The overworld, lifted verbatim from the Claude Design canvas export.
 *
 * It lives in its own module for one reason: none of it ever changes at
 * runtime. Keeping it out of the component makes that obvious, and lets the
 * tile layer be built once at module scope instead of on every render — the
 * canvas version rebuilt all 375 tiles roughly seven times a second while the
 * player walked.
 */

export type PanelId = "about" | "work" | "exp" | "log" | "mail";
export type Direction = "up" | "down" | "left" | "right";

/** Each string is one row; each character is one tile. See TILE_LEGEND. */
export const MAP = [
  "#########################",
  "#.......................#",
  "#..RRRRR..RRRRR..RRRRR..#",
  "#..BBDBB..BBDBB..BBDBB..#",
  "#....=......=......=....#",
  "#....=..,...=......=..~~#",
  "#....=......=......=..~~#",
  "#....=......=......=....#",
  "#.=====================.#",
  "#.=........,..........=.#",
  "#.=...........,.......=.#",
  "#.=.RRRRR......RRRRR..=.#",
  "#.=.BBDBB......BBDBB..=.#",
  "#.=====================.#",
  "#########################",
] as const;

export const TILE_LEGEND = {
  "#": "tree line",
  R: "roof",
  B: "wall",
  D: "door",
  "=": "path",
  "~": "water",
  ",": "flowers",
  ".": "grass",
} as const;

/** Tiles the player cannot walk onto. Doors are deliberately absent — you walk INTO a door. */
export const SOLID: Record<string, true> = { "#": true, R: true, B: true, "~": true };

/** Keyed "row,col" so a lookup during a step is one string concat, not a scan. */
export const DOORS: Record<string, { panel: PanelId; label: string }> = {
  "3,5": { panel: "about", label: "ABOUT HALL" },
  "3,12": { panel: "work", label: "WORKSHOP" },
  "3,19": { panel: "log", label: "LIBRARY" },
  "12,6": { panel: "exp", label: "GUILD HALL" },
  "12,17": { panel: "mail", label: "POST OFFICE" },
};

/**
 * The five rooms, in the order the buttons under the map list them.
 *
 * One list, used by the map's own nav, by the slim nav every room carries, and
 * by the doors. It was three lists for one afternoon and the map already
 * disagreed with the buttons about what "EXP" was called.
 *
 * Each room is a real page rather than a `#fragment`, which is the whole point
 * of the layout: a room can be linked to, shared and indexed on its own, and
 * `/work/donatr` is a URL to paste into a job application. The canvas version
 * opened a modal, and that is why none of its content existed for a crawler, a
 * screen reader, or a visitor whose JavaScript failed.
 */
export const ROOMS: { panel: PanelId; href: string; label: string }[] = [
  { panel: "about", href: "/about", label: "ABOUT" },
  { panel: "work", href: "/work", label: "WORK" },
  { panel: "exp", href: "/experience", label: "EXP" },
  { panel: "log", href: "/dev-log", label: "DEV LOG" },
  { panel: "mail", href: "/contact", label: "CONTACT" },
];

/** The same five, keyed by door, because a step looks this up by panel id. */
export const ROOM_HREF = Object.fromEntries(
  ROOMS.map((r) => [r.panel, r.href]),
) as Record<PanelId, string>;

export const SIGNS = [
  { label: "ABOUT", row: 1, col: 3, span: 5, color: "#78f878" },
  { label: "WORK", row: 1, col: 10, span: 5, color: "#8cd8ff" },
  { label: "DEV LOG", row: 1, col: 17, span: 5, color: "#f8d800" },
  { label: "EXP", row: 10, col: 4, span: 5, color: "#f8d800" },
  { label: "CONTACT", row: 10, col: 15, span: 5, color: "#f878f8" },
] as const;

/** Two walk frames, 8×8, one character per sprite pixel. "." is transparent. */
export const FRAMES = [
  ["..hhhh..", ".hhhhhh.", ".sesses.", "..ssss..", ".bbbbbb.", "sbbbbbbs", "..pppp..", "..k..k.."],
  ["..hhhh..", ".hhhhhh.", ".sesses.", "..ssss..", ".bbbbbb.", "sbbbbbbs", "..pppp..", ".k....k."],
] as const;

export const SPRITE_COLORS: Record<string, string> = {
  h: "#1038ec", // hat
  s: "#f8b878", // skin
  e: "#180808", // eye
  b: "#d82800", // body
  p: "#2038a0", // legs
  k: "#503018", // shoes
};

export const COLS = MAP[0].length;
export const ROWS = MAP.length;

/** Middle of the lower path, so every door is a short walk from the start. */
export const START = { row: 8, col: 12 } as const;

/**
 * One grid square per tick. The player's CSS transition uses the same number —
 * in the canvas version the transition was 110ms against a 135ms tick, which
 * left the sprite parked for 25ms of every step and read as a stutter.
 */
export const STEP_MS = 135;

export function directionFor(key: string): Direction | null {
  switch (key.toLowerCase()) {
    case "arrowup":
    case "w":
      return "up";
    case "arrowdown":
    case "s":
      return "down";
    case "arrowleft":
    case "a":
      return "left";
    case "arrowright":
    case "d":
      return "right";
    default:
      return null;
  }
}
