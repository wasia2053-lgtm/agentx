import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Logo from './Logo';

/**
 * Fantasy-style loader: the SAME <Logo/> component as the navbar
 * (gradient dot + AGENT + gradient X), entering with a smooth
 * Fantasy-like ease — dot scales in first, then the letters glide
 * in one by one. It stays until ALL hold: >=1800ms passed AND the
 * window `load` event fired AND the robot (`ready`) is rendered —
 * so the moment the loader lifts, the robot is already there and
 * the banner is never blank. Hard 5000ms safety timeout.
 * The identical static splash in index.html covers the pre-React boot.
 */
export default function Loader({ onDone, ready }: { onDone: () => void; ready: boolean }) {
  const reduceMotion = useReducedMotion();
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  const readyRef = useRef(ready);
  const minRef = useRef(false);
  const loadedRef = useRef(typeof document !== 'undefined' && document.readyState === 'complete');
  readyRef.current = ready;

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
    const tryFinish = () => {
      if (minRef.current && loadedRef.current && readyRef.current) finish();
    };
    const tMin = window.setTimeout(() => {
      minRef.current = true;
      tryFinish();
    }, 1800);
    const tMax = window.setTimeout(finish, 5000);
    const onLoad = () => {
      loadedRef.current = true;
      tryFinish();
    };
    window.addEventListener('load', onLoad);
    tryFinish();
    return () => {
      window.clearTimeout(tMin);
      window.clearTimeout(tMax);
      window.removeEventListener('load', onLoad);
    };
  }, [reduceMotion, ready]);

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
      {/* Same logo as the navbar — dot scales in, letters glide in */}
      <Logo size={64} stagger />
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
