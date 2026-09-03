import { knowledgeBase } from "./knowledge";
import type { KnowledgeSection } from "./Types";

/**
 * Normalizes text so different ways of asking a question
 * can still be matched reliably.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Common question words that do not normally identify
 * the user's actual intent.
 */
const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "is",
  "me",
  "my",
  "of",
  "on",
  "please",
  "tell",
  "the",
  "to",
  "what",
  "whats",
  "where",
  "who",
  "with",
  "would",
  "you",
  "your",
]);

/**
 * Removes common question words and returns
 * the meaningful words from the message.
 */
function getMeaningfulWords(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .filter(
      (word) =>
        word.length > 2 &&
        !stopWords.has(word)
    );
}

/**
 * Handles simple singular/plural and word-form variations.
 *
 * Examples:
 * project -> projects
 * contact -> contacting
 * service -> services
 */
function wordsMatch(
  inputWord: string,
  keywordWord: string
): boolean {
  if (inputWord === keywordWord) {
    return true;
  }

  if (
    inputWord.length >= 4 &&
    keywordWord.length >= 4
  ) {
    if (
      inputWord.startsWith(keywordWord) ||
      keywordWord.startsWith(inputWord)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates how strongly a knowledge section
 * matches the user's message.
 */
function calculateScore(
  message: string,
  section: KnowledgeSection
): number {
  const input = normalizeText(message);
  const inputWords = getMeaningfulWords(input);

  let score = 0;

  for (const keyword of section.keywords) {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      continue;
    }

    /*
     * Exact phrase matches receive a strong score.
     *
     * Example:
     * "career goal"
     * "data analytics"
     * "smart-p analytics"
     */
    if (input.includes(normalizedKeyword)) {
      score += normalizedKeyword.includes(" ")
        ? 6
        : 4;

      continue;
    }

    /*
     * Match individual words inside keywords.
     */
    const keywordWords =
      getMeaningfulWords(normalizedKeyword);

    for (const keywordWord of keywordWords) {
      const matched = inputWords.some((inputWord) =>
        wordsMatch(inputWord, keywordWord)
      );

      if (matched) {
        score += 3;
      }
    }
  }

  return score;
}

/**
 * Finds the best matching knowledge section
 * based on the user's natural-language message.
 */
export function matchIntent(
  message: string
): KnowledgeSection | null {
  const input = normalizeText(message);

  if (!input) {
    return null;
  }

  let bestMatch: KnowledgeSection | null = null;
  let highestScore = 0;

  for (const section of knowledgeBase) {
    const score = calculateScore(
      input,
      section
    );

    if (score > highestScore) {
      highestScore = score;
      bestMatch = section;
    }
  }

  return bestMatch;
}
