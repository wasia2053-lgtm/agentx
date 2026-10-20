import { motion } from 'framer-motion';

/**
 * AgentX logo, Fantasy-style: a small four-lobed mark followed by a
 * light, wide-tracked AGENTX wordmark. Pure white, no gradient.
 * `stagger` (loader only): the letters fade in one by one from dim
 * grey to white while the blur clears.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LETTERS = ['A', 'G', 'E', 'N', 'T', 'X'];

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path
        d="M12 1.2C12.9 6.8 17.2 11.1 22.8 12C17.2 12.9 12.9 17.2 12 22.8C11.1 17.2 6.8 12.9 1.2 12C6.8 11.1 11.1 6.8 12 1.2Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function Logo({
  size = 22,
  withDot = true,
  stagger = false,
}: {
  size?: number;
  withDot?: boolean;
  stagger?: boolean;
}) {
  const wordStyle = {
    fontFamily: "'Inter Tight', sans-serif",
    fontSize: size,
    fontWeight: 300,
    letterSpacing: '0.34em',
    color: '#ffffff',
    whiteSpace: 'nowrap' as const,
    display: 'inline-flex',
    lineHeight: 1,
    marginRight: '-0.34em',
  };

  return (
    <span aria-label="AgentX" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.55, lineHeight: 1 }}>
      {withDot && (
        stagger ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ display: 'inline-flex' }}
          >
            <Mark size={size * 1.1} />
          </motion.span>
        ) : (
          <Mark size={size * 1.1} />
        )
      )}
      <span style={wordStyle} aria-hidden="true">
        {LETTERS.map((ch, i) =>
          stagger ? (
            <motion.span
              key={i}
              initial={{ opacity: 0, color: '#555555', filter: 'blur(8px)' }}
              animate={{ opacity: 1, color: '#ffffff', filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE }}
              style={{ display: 'inline-block' }}
            >
              {ch}
            </motion.span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
    </span>
  );
}
