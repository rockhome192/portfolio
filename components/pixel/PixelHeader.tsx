import Link from "next/link";
import { PixelControls } from "./PixelControls";

/**
 * The name plate.
 *
 * On the map it is the page's <h1> and the first thing in the document, so a
 * crawler, a screen reader and a link preview all get the name before they get
 * the game.
 *
 * Inside a room the room's own name is the <h1> — "WORKSHOP" is what that page
 * is about, and two <h1>s would make the outline claim otherwise. The name
 * plate becomes the way back to the map instead, which is the convention every
 * site already teaches: the name in the corner goes home.
 */
export function PixelHeader({ home = false }: { home?: boolean }) {
  const name = "Phatcharadanai Tangoan";
  return (
    <header className="pm-header" id="top">
      <div className="pm-nameplate">
        {home ? (
          <h1 className="pm-name">{name}</h1>
        ) : (
          <p className="pm-name">
            <Link href="/" className="pm-name-link">
              {name}
            </Link>
          </p>
        )}
        <p className="pm-role">FULL-STACK DEV &middot; FRONTEND-FOCUSED &middot; BANGKOK</p>
      </div>
      <PixelControls />
    </header>
  );
}
