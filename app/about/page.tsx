import type { Metadata } from "next";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelAbout } from "@/components/pixel/PixelAbout";

export const metadata: Metadata = {
  title: "About Hall",
  description:
    "A Computer Engineering graduate who gravitates toward the frontend, with a genuinely full-stack background. Based in Bangkok.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PixelRoom current="about">
      <PixelAbout />
    </PixelRoom>
  );
}
