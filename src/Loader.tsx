import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

/**
 * Fantasy-style loader: the SAME <Logo/> component as the navbar
 * (gradient dot + AGENT + gradient X), entering with a smooth
 * Fantasy-like ease — dot scales in first, then the wordmark glides
 * up. No per-letter snap. Stays until BOTH: >=1800ms passed AND the
 * window `load` event fired, with a hard 4000ms safety timeout.
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

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#000000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 28,
      }}
    >
      {/* Same logo as the navbar — smooth Fantasy-like entrance */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo size={64} />
      </motion.div>
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
