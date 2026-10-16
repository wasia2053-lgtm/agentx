/**
 * AgentX chatbot engine — pure logic, no React.
 * Stateless except for `missCount`, which the UI tracks.
 *
 * Contract: EVERY input gets a reply. No input ever returns nothing,
 * throws, or leaves the visitor hanging.
 */

import { INTENTS, STARTER_CHIPS, fallbackReply } from './chatbotKnowledge';

export interface BotReply {
  text: string;
  chips: string[];
  /** 'answer' | 'fallback' — the UI uses it to count consecutive misses. */
  kind: 'answer' | 'fallback';
}

const ROMAN_URDU =
  /\b(kya|kaise|kaisi|kab|kitna|kitne|kahan|kaun|kyun|kyu|hai|hain|karna|chahiye|batao|bataein|bataen|mujhe|mera|meri|apka|aapka|karo|karke|wala|wali|mein|nahi|aur|bhi|toh|kia|kr|krna|shukriya|aoa|salam|zabardast|bohat|bohot|acha|theek|rabta|kaam|dikhao|paisa|kitni|kis|koi|yeh|woh|jab|tab)\b/;

/** Lowercase, strip punctuation/diacritics, collapse whitespace. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isRomanUrdu(raw: string): boolean {
  return ROMAN_URDU.test(normalize(raw));
}

/**
 * Score every intent by the TOTAL LENGTH of its patterns that appear in
 * the input. Longer, more specific phrases ("how it works", "why agentx",
 * "kitna time") therefore beat short generic keywords ("work", "agent",
 * "kitna") — a plain count would tie them and pick the wrong intent.
 */
function bestIntent(normalized: string): { index: number; score: number } {
  let best = { index: -1, score: 0 };
  INTENTS.forEach((intent, i) => {
    // Longest matches first; a shorter pattern that is a substring of an
    // already-counted one ('rank' inside 'ranking') adds nothing —
    // otherwise overlapping patterns would double-count the same word.
    const matched = intent.patterns
      .filter((p) => normalized.includes(p))
      .sort((a, b) => b.length - a.length);
    let score = 0;
    const counted: string[] = [];
    for (const p of matched) {
      if (counted.some((c) => c.includes(p))) continue;
      counted.push(p);
      score += p.length;
    }
    if (score > best.score) best = { index: i, score };
  });
  return best;
}

/**
 * Get a reply for any input.
 * @param input  raw visitor text (any string, even empty/gibberish)
 * @param missCount  consecutive unmatched messages so far (0 on first miss)
 */
export function getReply(input: string, missCount = 0): BotReply {
  const raw = String(input ?? '');
  const normalized = normalize(raw);

  // Empty / whitespace-only input — never leave it unanswered.
  if (!normalized) {
    return {
      text: isRomanUrdu(raw)
        ? 'Kuch likha nahi — kya poochna chahte hain? Services, pricing, timeline ya free call book karna?'
        : 'Looks like that message came through empty — what would you like to know? Services, pricing, timeline, or booking a free call?',
      chips: STARTER_CHIPS,
      kind: 'fallback',
    };
  }

  const { index, score } = bestIntent(normalized);
  const urdu = isRomanUrdu(raw);

  if (index >= 0 && score > 0) {
    const intent = INTENTS[index];
    return {
      text: urdu && intent.ur ? intent.ur : intent.en,
      chips: intent.chips ?? [],
      kind: 'answer',
    };
  }

  // No match — graded fallback. First miss: clarify. Second+ miss:
  // hand over to real contact details. Never guesses, never loops empty.
  const fb = fallbackReply(missCount + 1);
  return {
    text: urdu ? fb.ur : fb.en,
    chips: fb.chips,
    kind: 'fallback',
  };
}
