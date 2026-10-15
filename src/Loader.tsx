import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fantasy-style loader: full-screen black overlay, AGENTX letters
 * stagger in + thin progress bar. Always unmounts — a hard safety
 * timeout guarantees the page can never get trapped behind it.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const finish = () => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current();
      }
    };
    // Reduced motion: skip the animation, hide immediately.
    if (reduceMotion) {
      finish();
      return;
    }
    // Minimum display ~1800ms, hard safety timeout 2500ms.
    const t1 = window.setTimeout(finish, 1800);
    const t2 = window.setTimeout(finish, 2500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  const letters = 'AGENTX'.split('');

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#000000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 28,
      }}
    >
      <div style={{ display: 'flex', gap: 4 }} aria-hidden="true">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4, ease: 'easeOut' }}
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontStretch: '75%',
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em',
            }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <div style={{ width: 180, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ height: '100%', background: '#ffffff', borderRadius: 2 }}
        />
      </div>
    </div>
  );
}
