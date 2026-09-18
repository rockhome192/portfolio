import type { ReactNode } from "react";
import { COLS, MAP, ROWS } from "./map-data";

/**
 * The static half of the board.
 *
 * Every tile here is derived from MAP alone, and MAP is a module constant, so
 * this array is built ONCE when the module is first imported and then handed to
 * React unchanged forever. Same element identity every render → React bails out
 * of reconciling all 375 of them.
 *
 * Doors are NOT here. They are the only tiles anyone can act on, so they render
 * in PixelMap as real links on a layer above this one.
 */

/** One sprite pixel inside a tile, positioned in percentages of the tile box. */
function px(key: string, x: number, y: number, w: number, h: number, bg: string) {
  return (
    <span
      key={key}
      className="pm-px"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: `${w * 100}%`,
        height: `${h * 100}%`,
        background: bg,
      }}
    />
  );
}

const TILE_W = 100 / COLS;
const TILE_H = 100 / ROWS;

function tile(ch: string, r: number, c: number): ReactNode {
  const key = `${r}:${c}`;
  const style = {
    left: `${c * TILE_W}%`,
    top: `${r * TILE_H}%`,
    width: `${TILE_W}%`,
    height: `${TILE_H}%`,
  };

  // Deterministic per-tile variation so the ground is not a flat colour field.
  // Derived from the coordinates, never from Math.random() — a random value
  // would differ between the server render and the client render and blow up
  // hydration.
  const noise = (r * 31 + c * 17) % 4;

  switch (ch) {
    case "#":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#0f3f18" }}>
          {px(`${key}a`, 0.15, 0.05, 0.7, 0.62, "#2f8f38")}
          {px(`${key}b`, 0.28, 0.16, 0.44, 0.3, "#5cc85c")}
          {px(`${key}c`, 0.4, 0.62, 0.2, 0.35, "#6b4020")}
        </div>
      );
    case "R":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#c82828" }}>
          {px(`${key}a`, 0, 0.62, 1, 0.16, "#8c1010")}
          {px(`${key}b`, 0, 0, 1, 0.14, "#f85858")}
        </div>
      );
    case "B":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#e8d0a8" }}>
          {px(`${key}a`, 0, 0.45, 1, 0.09, "#bfa274")}
          {px(`${key}b`, 0.48, 0, 0.06, 0.45, "#bfa274")}
          {px(`${key}c`, 0.2, 0.54, 0.06, 0.46, "#bfa274")}
        </div>
      );
    case "~":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#1030c8" }}>
          {px(`${key}a`, 0.1, 0.25, 0.4, 0.12, "#5c8cf8")}
          {px(`${key}b`, 0.5, 0.6, 0.35, 0.12, "#5c8cf8")}
        </div>
      );
    case "=":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#e0b878" }}>
          {px(`${key}a`, noise * 0.22, 0.3, 0.16, 0.16, "#c09858")}
          {px(`${key}b`, 0.7 - noise * 0.1, 0.7, 0.14, 0.14, "#c09858")}
        </div>
      );
    case ",":
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#34a038" }}>
          {px(`${key}a`, 0.3, 0.3, 0.16, 0.16, "#f8d800")}
          {px(`${key}b`, 0.6, 0.6, 0.16, 0.16, "#f878f8")}
        </div>
      );
    case "D":
      // The doorway itself. The lit frame and the click target live on the
      // button layer above; this is only the dark opening behind it.
      return <div key={key} className="pm-tile" style={{ ...style, background: "#3a2010" }} />;
    default:
      return (
        <div key={key} className="pm-tile" style={{ ...style, background: "#34a038" }}>
          {px(`${key}a`, 0.2 + noise * 0.15, 0.55, 0.22, 0.1, "#2a8a30")}
        </div>
      );
  }
}

export const STATIC_TILES: ReactNode[] = MAP.flatMap((row, r) =>
  row.split("").map((ch, c) => tile(ch, r, c)),
);
