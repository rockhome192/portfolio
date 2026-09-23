import Link from "next/link";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelSection } from "@/components/pixel/PixelSection";

/**
 * The 404, in the same room the rest of the site is in.
 *
 * Until now this address answered with Next's built-in page: black Helvetica on
 * white, "404: This page could not be found.", and no way onward except the
 * back button. Every other page here was designed; the one page a visitor
 * reaches by accident was the one that looked like a crash.
 *
 * It is a room page rather than a bare message because the shell is what makes
 * it useful — PixelRoomNav is already a row of links to all five rooms, so a
 * visitor who mistyped is one click from the place they meant. `current` is
 * null: this is not one of the rooms, and marking one of them as the page you
 * are on would be a lie told to a screen reader.
 */
export default function NotFound() {
  return (
    <PixelRoom current={null}>
      <PixelSection
        as="h1"
        id="lost"
        room="OFF THE MAP"
        lede="There is no room at this address."
      >
        <p className="pm-body pm-body-lead">
          Nothing is broken — this URL just does not name one of the five rooms. The row of
          links above goes to all of them.
        </p>
        <div className="pm-linkrow">
          <Link href="/" className="pm-link pm-link-primary">
            BACK TO THE MAP &gt;
          </Link>
          <Link href="/work" className="pm-link">
            THE WORK &gt;
          </Link>
          <Link href="/contact" className="pm-link">
            CONTACT &gt;
          </Link>
        </div>
      </PixelSection>
    </PixelRoom>
  );
}
