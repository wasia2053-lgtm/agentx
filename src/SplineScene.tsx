import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

/**
 * Spline wrapper.
 *
 * Eager import (not lazy): the robot's JS starts loading with the page
 * bundle, so the robot is rendered by the time the loader lifts.
 *
 * Mounts Spline IMMEDIATELY — no ResizeObserver gate. The gate was the
 * prime suspect when the robot never appeared: if the container ever
 * measures 0 (layout still settling, font swap, mobile URL-bar resize),
 * the gate blocks Spline forever and the hero stays blank. The container
 * has an explicit minHeight (see Hero), so a 0-size mount can't happen.
 *
 * `onReady` fires from Spline's onLoad: the loader waits for it.
 * If Spline errors, retry once after 3s (remount via key). If it still
 * fails, `onReady` is still called so the loader never traps the page.
 */
export default function SplineScene({
  scene,
  className,
  onReady,
}: {
  scene: string;
  className?: string;
  onReady?: () => void;
}) {
  const [attempt, setAttempt] = useState(0);
  const readyFired = useRef(false);
  const fireReady = () => {
    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }
  };

  useEffect(() => {
    if (attempt >= 1) return;
    const t = window.setTimeout(() => {
      // Spline didn't report ready after 6s — retry once.
      if (!readyFired.current) setAttempt(1);
    }, 6000);
    return () => window.clearTimeout(t);
  }, [attempt]);

  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: 480 }}>
      <Spline
        key={attempt}
        scene={scene}
        onLoad={fireReady}
        onError={() => {
          if (attempt < 1) {
            setAttempt(1);
          } else {
            // Give up on the robot, but never trap the loader.
            fireReady();
          }
        }}
      />
    </div>
  );
}
