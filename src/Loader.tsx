import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fantasy-style loader: full-screen black overlay, AGENTX letters
 * stagger in + thin progress bar. It stays until BOTH conditions hold:
 * (a) at least ~1800ms have passed, and (b) the window `load` event fired
 * (so it is never skipped on a slow connection), with a hard 4000ms
 * safety timeout so the page can never get trapped behind it.
 * The identical static splash in index.html covers the pre-React boot.
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
    let minElapsed = false;
    let loaded = document.readyState === 'complete';
    const tryFinish = () => {
      if (minElapsed && loaded) finish();
    };
    const tMin = window.setTimeout(() => {
      minElapsed = true;
      tryFinish();
    }, 1800);
    const tMax = window.setTimeout(finish, 4000);
    const onLoad = () => {
      loaded = true;
      tryFinish();
    };
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(tMin);
      window.clearTimeout(tMax);
      window.removeEventListener('load', onLoad);
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
              fontStretch: '70%',
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 800, letterSpacing: '0.06em',
              ...(ch === 'X'
                ? {
                    background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }
                : { color: '#ffffff' }),
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
      <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#777', margin: 0 }}>
        Websites · AI Chatbots · SEO
      </p>
    </div>
  );
}
