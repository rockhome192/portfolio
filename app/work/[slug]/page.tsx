import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PixelRoom } from "@/components/pixel/PixelRoom";
import { PixelProject } from "@/components/pixel/PixelProject";
import { allProjects, getProject } from "@/lib/projects";

/*
  Three projects, known at build time and changing only when the source file
  does — so all three are prerendered, and `dynamicParams: false` makes
  /work/anything-else a 404 rather than a page that renders half of nothing.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    // The tagline, not a summary of it: one sentence is what a search result
    // shows, and it is already written in the voice of the rest of the site.
    description: p.tagline,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <PixelRoom current="work">
      <PixelProject p={p} others={allProjects.filter((o) => o.slug !== p.slug)} />
    </PixelRoom>
  );
}
