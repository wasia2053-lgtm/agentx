import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
    // Normal path: hide after the intro plays, with a hard safety timeout
    // so the overlay can never trap the page.
    const t1 = window.setTimeout(finish, 1400);
    const t2 = window.setTimeout(finish, 2200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  const letters = 'AGENTX'.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
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
              fontFamily: "'ClashDisplay', sans-serif",
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em',
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
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={{ height: '100%', background: '#ffffff', borderRadius: 2 }}
        />
      </div>
    </motion.div>
  );
}
