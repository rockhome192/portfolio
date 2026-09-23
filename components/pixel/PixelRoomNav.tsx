import Link from "next/link";
import { ROOMS, type PanelId } from "./map-data";

/**
 * The slim nav every room carries.
 *
 * Deliberately NOT a mini-map. The map is the whole of `/` and stays there: a
 * copy of it on five sub-pages would be a keyboard game fighting the page's own
 * arrow-key scrolling, five boards to keep in sync, and 375 tiles of decoration
 * standing above the thing somebody came here to read.
 *
 * It is one row of plain text links because that is the fast way in, and the
 * fast way in is the one a recruiter with four tabs open will take.
 */
export function PixelRoomNav({ current }: { current: PanelId | null }) {
  return (
    <nav className="pm-roomnav" aria-label="Rooms">
      <Link href="/" className="pm-roomnav-link pm-roomnav-home">
        &lt; MAP
      </Link>

      {ROOMS.map((r) => (
        <Link
          key={r.panel}
          href={r.href}
          className="pm-roomnav-link"
          /* The room you are in is a link to itself. Marking it is what stops a
             screen reader announcing five identical destinations. */
          aria-current={r.panel === current ? "page" : undefined}
        >
          {r.panel === "exp" ? "EXPERIENCE" : r.label}
        </Link>
      ))}
    </nav>
  );
}
