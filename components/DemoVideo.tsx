"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The featured card's picture, as a looping clip when the browser will play one.
 *
 * There is no `autoPlay` attribute on purpose. Playback starts from the effect,
 * and only after the reduced-motion check has run — an attribute would have the
 * clip already moving before we could ask, and pausing it afterwards is the
 * flicker the preference exists to prevent. A visitor who asked for stillness
 * gets the poster frame, which is a frame of this same clip, so nothing is lost
 * but the motion.
 */
export function DemoVideo({
  src,
  poster,
  alt,
  sizes,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Rejected autoplay is not an error worth reporting: the poster is still
    // there, and it is the same picture the card used to be.
    void v.play().catch(() => {});
  }, []);

  if (failed) {
    return (
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover object-top" priority />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}
