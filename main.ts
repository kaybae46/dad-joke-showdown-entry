// Dad Joke Showdown — entry program.
//
// Writes a single dad joke (1-200 UTF-8 chars) to /output/entry.txt.
// The joke: a suitcase, a cancelled vacation, and the emotional baggage
// that follows. Setup first, pun lands on the last two words.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I told my suitcase we weren't going on vacation this year. Now I'm dealing with emotional baggage.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = JOKE.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${text.length}`);
}
if (!text.trim()) {
  throw new Error("joke must not be whitespace-only");
}

writeFileSync(join(outDir, "entry.txt"), text, "utf8");

// Read-back check: the file on disk must hold exactly the joke we validated.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the validated joke");
}
console.log(`Wrote ${text.length} characters to ${join(outDir, "entry.txt")}`);
