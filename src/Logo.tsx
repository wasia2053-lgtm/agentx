import { motion } from 'framer-motion';

/**
 * AgentX wordmark logo, built from the Archivo font (Fantasy-style:
 * a clean condensed wordmark, no icon file needed).
 * "AGENT" in white + "X" in the pink->orange->purple gradient,
 * with a small gradient dot. Used in the navbar, loader and footer.
 *
 * `stagger` (loader only): the dot scales in first, then the letters
 * glide in one by one with a smooth Fantasy-like ease — the same
 * logo component everywhere, never two different logos.
 */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LETTERS = ['A', 'G', 'E', 'N', 'T'];

export default function Logo({
  size = 22,
  withDot = true,
  stagger = false,
}: {
  size?: number;
  withDot?: boolean;
  stagger?: boolean;
}) {
  const dot = (
    <span
      aria-hidden="true"
      style={{
        width: Math.max(8, size * 0.36),
        height: Math.max(8, size * 0.36),
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff5ca8, #ff8a3d, #8b5cff)',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );

  const wordmark = (
    <span
      aria-label="AgentX"
      style={{
        fontFamily: "'Archivo', sans-serif",
        fontStretch: '70%',
        fontSize: size,
        fontWeight: 800,
        letterSpacing: '0.04em',
        color: '#ffffff',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
      }}
    >
      {LETTERS.map((ch, i) =>
        stagger ? (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: EASE }}
            style={{ display: 'inline-block' }}
          >
            {ch}
          </motion.span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
      {stagger ? (
        <motion.span
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.15 + LETTERS.length * 0.07, ease: EASE }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          X
        </motion.span>
      ) : (
        <span
          style={{
            background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          X
        </span>
      )}
    </span>
  );

  if (!stagger) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}>
        {withDot && dot}
        {wordmark}
      </span>
    );
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}>
      {withDot && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ display: 'inline-flex' }}
        >
          {dot}
        </motion.span>
      )}
      {wordmark}
    </span>
  );
}
