import type { Metadata } from "next";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelContact } from "@/components/pixel/PixelContact";

export const metadata: Metadata = {
  title: "Post Office",
  description: "Looking for a full-stack or frontend role where craft matters. Based in Bangkok.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PixelRoom current="mail">
      <PixelContact />
    </PixelRoom>
  );
}
