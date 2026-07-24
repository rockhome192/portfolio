"use client";

import { useState } from "react";
import { contact } from "@/lib/projects";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      /* clipboard blocked — silently ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 font-mono text-[14.5px] text-text transition-colors hover:text-accent"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
