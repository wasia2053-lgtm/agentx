import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Fantasy-style scroll reveal — VISIBLE motion, no jank.
 * Scroll reveals use opacity + rise only: blur() on many elements
 * was the main-thread cost behind the INP warnings (203ms blocked UI).
 * Blur is kept ONLY for the hero headline (few words, one-time).
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
}

export function Reveal({ children, delay = 0, className, style, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface WordRevealProps {
  lines: string[];
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Index of the line rendered with the pink->orange->purple gradient. */
  gradientLine?: number;
}

/**
 * Fantasy-style hero headline: arrives WORD-BY-WORD, each word
 * blur-to-sharp + a bigger upward slide, once only.
 */
export function WordReveal({ lines, delay = 0, className, style, gradientLine }: WordRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {lines.map((line, i) => (
          <div key={i} className={gradientLine === i ? 'agx-gradient-text' : undefined}>{line}</div>
        ))}
      </div>
    );
  }
  let wordIndex = 0;
  return (
    <div className={className} style={style} aria-label={lines.join(' ')}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        const isGradient = gradientLine === li;
        return (
          <div key={li} aria-hidden="true" className={isGradient ? 'agx-gradient-text' : undefined} style={{ overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
            {words.map((word, j) => {
              const d = delay + wordIndex * 0.09;
              wordIndex += 1;
              return (
                <span key={j} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                  {j < words.length - 1 ? '\u00A0' : ''}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
