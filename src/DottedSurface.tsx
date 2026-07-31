import { useEffect, useRef } from 'react';

export default function DottedSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Match 21st.dev Three.js exactly
    const SEPARATION = 150;
    const AMOUNTX    = 40;
    const AMOUNTY    = 60;

    // Three.js camera: position.set(0, 355, 1220), looks toward -Z
    const CAM_Y     = 355;
    const CAM_Z     = 1220;
    const FOV_SCALE = 700;

    let count = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x3 = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          // Three.js: z from -(AMOUNTY*SEP)/2 to +(AMOUNTY*SEP)/2
          // Camera looks toward -Z, so visible z < CAM_Z
          const z3 = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          const y3 =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          // Perspective: camera at (0, CAM_Y, CAM_Z) looking toward -Z
          // dz = distance in Z from camera
          const dz = CAM_Z - z3;
          if (dz <= 10) continue;

          const scale = FOV_SCALE / dz;
          const sx    = cx + x3 * scale;

          // ✅ KEY FIX: camera ABOVE dots → dots appear BELOW center
          // In screen space: down = +Y, so dots below center = cy + positive
          // Camera at Y=355, dots at Y≈0 → camera - dots = 355 (positive)
          // Multiply by scale → positive sy offset → dots below center ✅
          const sy = cy + (CAM_Y - y3) * scale;

          if (sx < -10 || sx > canvas.width  + 10) continue;
          if (sy < -10 || sy > canvas.height + 10) continue;

          const radius = Math.max(0.4, 3.2 * scale);
          const alpha  = Math.min(0.8, 0.08 + scale * 0.55);

          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
          ctx.fill();
        }
      }

      count += 0.07;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        opacity:       0.65,
      }}
    />
  );
}