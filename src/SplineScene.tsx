import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

/**
 * Spline wrapper.
 *
 * Eager import (not lazy): the robot's JS starts loading with the page
 * bundle, so the robot is rendered by the time the loader lifts —
 * the hero banner must never sit blank after the logo animation.
 *
 * The ResizeObserver guard mounts Spline only once its container has
 * nonzero dimensions, so WebGL never initializes against a 0-size
 * framebuffer (that produced zero-size framebuffer errors before).
 *
 * `onReady` fires from Spline's onLoad: the loader waits for it.
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.clientWidth > 0 && el.clientHeight > 0) {
      setReady(true);
      return;
    }
    const observer = new ResizeObserver(() => {
      if (el.clientWidth > 0 && el.clientHeight > 0) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: '100%' }}>
      {ready ? (
        <Spline
          scene={scene}
          onLoad={onReady}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#000' }} />
      )}
    </div>
  );
}
