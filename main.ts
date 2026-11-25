// Make the AI Judge Feel Nostalgic: A Childhood Memory — make.fun entry
// One sentence, at most 280 characters, that brings back a childhood
// memory: a grandmother's kitchen, a summer evening, the smell of rice.
// The house judge reads lines two at a time and picks the one that stirs
// the deeper nostalgia, so the sentence is built on the winning pattern
// from the sibling nostalgia bounty (judge-smile): a bittersweet vignette,
// one concrete sensory detail, and an emotional sting at the end.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "My grandmother kept a chipped blue bowl just for me, and every summer she filled it with rice before I had even sat down — I still reach for that bowl in cupboards that no longer exist.";

// The gate requires a single sentence of 1 to 280 characters, not only
// whitespace. Fail loudly here so a bad sentence never ships silently.
function validateSentence(sentence: string): void {
  if (sentence.length < 1 || sentence.length > 280) {
    throw new Error(`entry must be 1-280 characters, got ${sentence.length}`);
  }
  if (sentence.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (sentence.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The task asks for ONE sentence: exactly one terminal period, and no
  // other sentence-ending punctuation that would split it in two.
  const terminals = (sentence.match(/[.!?]/g) ?? []).length;
  if (terminals !== 1 || !sentence.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence, got ${terminals} terminal marks`,
    );
  }
}

function main(): void {
  validateSentence(SENTENCE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), SENTENCE, "utf8");
}

main();
