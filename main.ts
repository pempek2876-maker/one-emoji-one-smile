// One Emoji, One Smile — exactly one emoji: the one most likely to make a
// stranger smile.
//
// The house judge (a warmth judge reading an emoji the way a stranger
// glancing at a phone screen would) weighs, in this order: (1) a single emoji
// a stranger reads as warm and friendly, (2) warmth at first glance — kind,
// friendly or gently funny with no context needed, (3) universality — any age
// or background reads it the same way, no irony or in-joke, (4) chosen rather
// than default — picked for the moment, not the first smiley that comes to
// mind, while staying instantly readable, (5) right for a stranger — no
// intimacy, sarcasm or flirtation. Novelty for its own sake does not count.
// This program mirrors that order: each candidate carries hand-scored
// attributes for those criteria, and every candidate meets every other in a
// full round-robin decided by the first criterion where the two differ. The
// winner — and nothing else, not even a newline — is written to
// /output/entry.txt.
//
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// ---------------------------------------------------------------------------
// Candidates: one single-code-point emoji each, scored on the judge's
// criteria. warmth: kind/friendly/gently funny at first glance (0–3).
// universal: read the same way by any age or background (0–3). isDefault: the
// first smiley that comes to mind (criterion 4 penalises it). risk: intimacy,
// sarcasm or flirtation that would read oddly from a stranger (0–2). face: a
// living face, which carries warmth to a stranger faster than an object.
// ---------------------------------------------------------------------------

interface Candidate {
  emoji: string;
  warmth: number;
  universal: number;
  isDefault: boolean;
  risk: number;
  face: boolean;
}

const CANDIDATES: Candidate[] = [
  { emoji: "🐶", warmth: 3, universal: 3, isDefault: false, risk: 0, face: true },  // dog face: the most universally loved animal
  { emoji: "🧸", warmth: 3, universal: 3, isDefault: false, risk: 0, face: false }, // teddy bear: a comfort object everywhere
  { emoji: "🌻", warmth: 3, universal: 3, isDefault: false, risk: 0, face: false }, // sunflower: bright, tall, impossible to read cold
  { emoji: "🐥", warmth: 3, universal: 2, isDefault: false, risk: 0, face: true },  // baby chick: cute, but reads spring/Easter in places
  { emoji: "🤗", warmth: 3, universal: 2, isDefault: false, risk: 1, face: true },  // hugging face: warm, but a hug from a stranger is a step closer
  { emoji: "🐣", warmth: 3, universal: 2, isDefault: false, risk: 0, face: true },  // hatching chick: new-life warmth, slightly seasonal
  { emoji: "🌞", warmth: 2, universal: 3, isDefault: false, risk: 0, face: true },  // sun with face: gently funny, friendly everywhere
  { emoji: "🦋", warmth: 2, universal: 3, isDefault: false, risk: 0, face: false }, // butterfly: gentle and pretty, a shade less warm
  { emoji: "🌈", warmth: 2, universal: 3, isDefault: false, risk: 0, face: false }, // rainbow: hopeful rather than warm
  { emoji: "🌷", warmth: 2, universal: 3, isDefault: false, risk: 0, face: false }, // tulip: a kind gift, quiet about it
  { emoji: "🐢", warmth: 2, universal: 3, isDefault: false, risk: 0, face: true },  // turtle: gentle, slow smile rather than instant
  { emoji: "😺", warmth: 2, universal: 2, isDefault: false, risk: 0, face: true },  // grinning cat: cat people grin back, others less so
  { emoji: "🍀", warmth: 2, universal: 2, isDefault: false, risk: 0, face: false }, // four-leaf clover: a luck wish, not read everywhere
  { emoji: "🐞", warmth: 2, universal: 2, isDefault: false, risk: 0, face: false }, // ladybug: cute to most, a bug to some
  { emoji: "💛", warmth: 2, universal: 3, isDefault: false, risk: 1, face: false }, // yellow heart: friendship colour, still a heart from a stranger
  { emoji: "😊", warmth: 2, universal: 3, isDefault: true, risk: 0, face: true },   // the default smile itself: warm, and exactly what criterion 4 discounts
];

// The judge's order: warmth, universality, chosen-rather-than-default,
// stranger-safety, then a living face; fewer bytes breaks a full tie (the
// leaderboard's own tie-break).
function beats(a: Candidate, b: Candidate): boolean {
  if (a.warmth !== b.warmth) return a.warmth > b.warmth;
  if (a.universal !== b.universal) return a.universal > b.universal;
  if (a.isDefault !== b.isDefault) return !a.isDefault;
  if (a.risk !== b.risk) return a.risk < b.risk;
  if (a.face !== b.face) return a.face;
  return Buffer.byteLength(a.emoji, "utf8") < Buffer.byteLength(b.emoji, "utf8");
}

function main(): void {
  for (const c of CANDIDATES) {
    const points = [...c.emoji].length;
    if (points !== 1) throw new Error(`candidate is not exactly one code point: ${c.emoji}`);
    const chars = c.emoji.length;
    if (chars < 1 || chars > 8) throw new Error(`candidate out of gate limits: ${c.emoji}`);
  }

  const wins = new Map<string, number>(CANDIDATES.map((c) => [c.emoji, 0]));
  for (let i = 0; i < CANDIDATES.length; i++) {
    for (let j = i + 1; j < CANDIDATES.length; j++) {
      const winner = beats(CANDIDATES[i], CANDIDATES[j]) ? CANDIDATES[i] : CANDIDATES[j];
      wins.set(winner.emoji, (wins.get(winner.emoji) ?? 0) + 1);
    }
  }

  const ranked = [...wins.entries()].sort((x, y) => y[1] - x[1]);
  for (const [emoji, w] of ranked) console.log(`${w}\t${emoji}`);
  const best = ranked[0][0];

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "entry.txt"), best, "utf8");
  console.log(`\nwrote ${join(OUT_DIR, "entry.txt")}: ${best} (${[...best].length} code point, ${Buffer.byteLength(best, "utf8")} bytes, no trailing newline)`);
}

main();
