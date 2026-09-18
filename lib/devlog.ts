/**
 * The dev log — the one thing the pixel design added that the old page did not
 * have. Short write-ups of a problem that was actually solved, one per project.
 *
 * Kept here rather than inside a component for the same reason lib/projects.ts
 * exists: the canvas export hardcoded these three entries into markup, and a
 * fact written into markup is a fact that will eventually disagree with itself.
 *
 * The rule from lib/projects.ts applies to the `body` field too — these are
 * hooks an interviewer picks up and asks about, not the whole answer. Keep each
 * one under sixty words; the reasoning belongs in the repo's README.
 */

export type DevLogEntry = {
  slug: string;
  /** Which project this came out of. Matches a title in lib/projects.ts. */
  project: string;
  color: "fe" | "be" | "data" | "tool";
  title: string;
  body: string;
};

export const devlog: DevLogEntry[] = [
  {
    slug: "same-webhook-three-times",
    project: "DONATR",
    color: "fe",
    title: "The same webhook, three times",
    body:
      "A payment provider retries until it hears a 200, so one payment can arrive as three identical calls. Notes on how an idempotency key, a unique constraint on the provider's charge id, and a replayable outbox turned a duplicate-alert bug into a boring code path.",
  },
  {
    slug: "five-round-trips-one-join",
    project: "Taskboard",
    color: "be",
    title: "Five round-trips became one JOIN",
    body:
      "A Kanban board that felt slow was not slow because of React. Each column fetched its own cards, and every fetch re-checked board access. Folding that check into the main query collapsed the waterfall — a note on when an extra safety query is really an N+1 in disguise.",
  },
  {
    slug: "eight-hours-of-tiny-writes",
    project: "Tickmatch",
    color: "data",
    title: "A trading day is eight hours of tiny writes",
    body:
      "Counting upward ticks per stock, live, means thousands of small updates an hour. Redis took the hot path and Postgres kept the truth — what I learned about picking which store is allowed to be wrong for a second.",
  },
];
