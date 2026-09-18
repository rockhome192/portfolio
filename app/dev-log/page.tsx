import type { Metadata } from "next";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelDevLog } from "@/components/pixel/PixelDevLog";

export const metadata: Metadata = {
  title: "Library",
  description: "One problem per project, and what it turned out to be about.",
  alternates: { canonical: "/dev-log" },
};

export default function DevLogPage() {
  return (
    <PixelRoom current="log">
      <PixelDevLog />
    </PixelRoom>
  );
}
