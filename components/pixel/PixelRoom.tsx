import type { ReactNode } from "react";
import "./pixel.css";
import "./pixel-ui.css";
import { PixelHeader } from "./PixelHeader";
import { PixelRoomNav } from "./PixelRoomNav";
import { PixelFooter } from "./PixelFooter";
import type { PanelId } from "./map-data";

/**
 * Everything a room page has that is not the room itself.
 *
 * Five pages that each rebuilt this shell would be five places to forget the
 * theme controls, or the way back to the map. `/` is the one page that does not
 * use it, because `/` is the map.
 *
 * There is no `measure` prop. One existed while /experience was a single column
 * of running text; /experience is two-column now and nothing else ever took it.
 * The reading measure lives on `.pm-body`, where it travels with the prose
 * instead of with the room.
 */
export function PixelRoom({
  current,
  children,
}: {
  current: PanelId;
  children: ReactNode;
}) {
  return (
    <div className="pm-shell">
      <div className="pm-page">
        <PixelHeader />
        <PixelRoomNav current={current} />
        <main className="pm-main">{children}</main>
        <PixelFooter />
      </div>
    </div>
  );
}
