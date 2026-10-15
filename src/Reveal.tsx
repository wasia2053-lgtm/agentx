import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Fantasy-style scroll reveal: content arrives with a blur-to-sharp
 * + slight upward slide, once only. Slow and cinematic, never flashy.
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
}

export function Reveal({ children, delay = 0, className, style, y = 18 }: RevealProps) {
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
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
}

/**
 * Fantasy-style hero headline: arrives WORD-BY-WORD, each word
 * blur-to-sharp + slight upward slide, once only.
 */
export function WordReveal({ lines, delay = 0, className, style }: WordRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }
  let wordIndex = 0;
  return (
    <div className={className} style={style} aria-label={lines.join(' ')}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        return (
          <div key={li} aria-hidden="true" style={{ overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
            {words.map((word, j) => {
              const d = delay + wordIndex * 0.07;
              wordIndex += 1;
              return (
                <span key={j} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] }}
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
