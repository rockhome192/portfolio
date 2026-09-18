import type { ReactNode } from "react";

/**
 * One room of the map, as a real section of the page.
 *
 * The room name IS the structural device here, so there is no 01/02/03 rail on
 * top of it — the doors are not a sequence, they are five places, and numbering
 * them would claim an order the map does not have.
 *
 * `tabIndex={-1}` makes the section a valid target for its own hash link: a
 * door sends focus here, not just the scroll position, so a keyboard visitor
 * carries on reading from the heading instead of from the top of the document.
 */
export function PixelSection({
  id,
  room,
  lede,
  /**
   * `h1` when this section IS the page — every room page — and `h2` when it is
   * one section among several. Hardcoding h2 was right while all five rooms
   * shared the homepage; on `/work` it left the page with no h1 at all.
   */
  as: Heading = "h2",
  children,
}: {
  id: string;
  room: string;
  lede?: string;
  as?: "h1" | "h2";
  children: ReactNode;
}) {
  return (
    <section id={id} className="pm-section" tabIndex={-1} aria-labelledby={`${id}-title`}>
      <div className="pm-section-head">
        <Heading id={`${id}-title`} className="pm-section-title">
          {room}
        </Heading>
        {lede && <p className="pm-section-lede">{lede}</p>}
      </div>
      {children}
    </section>
  );
}
