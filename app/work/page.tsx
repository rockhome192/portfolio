import type { Metadata } from "next";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelWork } from "@/components/pixel/PixelWork";

export const metadata: Metadata = {
  title: "Workshop",
  description:
    "Three projects, built end to end: a donation platform with a realtime overlay, a Kanban board, and a data service. Next.js, TypeScript, Prisma, PostgreSQL.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PixelRoom current="work">
      <PixelWork />
    </PixelRoom>
  );
}
