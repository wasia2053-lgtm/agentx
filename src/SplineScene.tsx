import { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Spline wrapper with a zero-size guard. The raw <Spline> component
 * creates its WebGL renderer as soon as it mounts — if its container
 * is still 0x0 at that moment (common on mobile while layout settles),
 * three.js logs a flood of "Framebuffer is incomplete: Attachment has
 * zero size" errors and the robot renders broken/tiny. We only mount
 * Spline once the container has a real, non-zero size.
 */
export default function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: '100%', minHeight: 200 }}>
      {ready ? (
        <Suspense
          fallback={
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#a3a3a3', fontSize: 13 }}>Loading...</span>
            </div>
          }
        >
          <Spline scene={scene} className={className} />
        </Suspense>
      ) : (
        <div style={{ width: '100%', height: '100%' }} aria-hidden="true" />
      )}
    </div>
  );
}
