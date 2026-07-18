import { knowledgeBase } from "./knowledge";
import type { KnowledgeSection } from "./types";

/**
 * Finds the best matching knowledge section
 * based on the user's message.
 */
export function matchIntent(
  message: string
): KnowledgeSection | null {
  const input = message.toLowerCase();

  let bestMatch: KnowledgeSection | null = null;
  let highestScore = 0;

  for (const section of knowledgeBase) {
    let score = 0;

    for (const keyword of section.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = section;
    }
  }

  return bestMatch;
}