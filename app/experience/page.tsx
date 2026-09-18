import type { Metadata } from "next";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelTimeline } from "@/components/pixel/PixelTimeline";

export const metadata: Metadata = {
  title: "Experience / Guild Hall",
  description: "Where the work happened — internship and degree, in order.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PixelRoom current="exp">
      <PixelTimeline />
    </PixelRoom>
  );
}
