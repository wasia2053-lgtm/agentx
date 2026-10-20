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
 * the banner is never blank. Hard 8000ms safety timeout.
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

  // Seamless handoff: remove the static splash (index.html) the moment
  // the React loader mounts — never a gap/flash between the two logos.
  useEffect(() => {
    document.getElementById('agx-splash')?.remove();
  }, []);

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
    }, 2200);
    const tMax = window.setTimeout(finish, 8000);
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
    <motion.div
      // Fantasy-style exit: the whole black screen lifts away.
      exit={{ y: '-100%' }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#000000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Logo size={34} stagger />
    </motion.div>
  );
}
