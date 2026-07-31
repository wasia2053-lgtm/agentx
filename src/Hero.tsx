import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import DottedSurface from './DottedSurface';
import SplineScene from './SplineScene';

const anim = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { type: 'spring' as const, stiffness: 260, damping: 22, delay },
});

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        @font-face {
          font-family: 'FreshChunky';
          src: url('/fonts/FreshChunky-Regular-BF69e8470be9b15.otf') format('opentype');
          font-display: swap;
        }
        .agx-cta {
          position: relative; display: inline-flex; align-items: center;
          height: 40px; padding-left: 20px; padding-right: 48px;
          border-radius: 100px; background: #ffffff; color: #000000;
          font-family: 'Inter',sans-serif; font-size: 13px; font-weight: 600;
          text-decoration: none; overflow: hidden; white-space: nowrap;
          cursor: pointer; flex-shrink: 0; border: none;
          transition: padding 450ms ease;
        }
        .agx-cta:hover { padding-left: 48px; padding-right: 20px; }
        .agx-cta:hover .agx-dot { right: calc(100% - 36px); transform: rotate(45deg); }
        .agx-dot {
          position: absolute; right: 4px; width: 32px; height: 32px;
          border-radius: 50%; background: #000; color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: right 450ms ease, transform 450ms ease;
        }
        .agx-hi { display: flex; align-items: center; width: 100%; height: 100%; padding: 0 80px; gap: 40px; position: relative; z-index: 10; }
        @media (max-width: 900px) {
          .agx-hi { flex-direction: column; padding: 120px 28px 40px; align-items: flex-start; gap: 0; }
          .agx-hr { width: 100% !important; height: 50vh !important; min-width: unset !important; flex: none !important; }
        }
      `}</style>

      <section id="home" style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        <DottedSurface />

        {/* bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to top, #000 30%, transparent)', zIndex: 5, pointerEvents: 'none' }} />

        <div className="agx-hi">

          {/* LEFT */}
          <div style={{ flex: '0 0 52%', display: 'flex', flexDirection: 'column', gap: 24, zIndex: 10 }}>

            <motion.div {...anim(0.2)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '6px 16px', fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500, color: '#a3a3a3' }}>
                ⚡ AI-Powered Agency
              </span>
            </motion.div>

            <motion.h1 {...anim(0.35)} style={{ fontFamily: "'FreshChunky',sans-serif", fontSize: 'clamp(40px,5vw,78px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0 }}>
              We Build AI That<br />Works For You.
            </motion.h1>

            <motion.p {...anim(0.5)} style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 400, color: '#a3a3a3', maxWidth: 460, lineHeight: 1.75, margin: 0 }}>
              From chatbots to voice agents — AgentX automates your business so you grow faster, not harder.
            </motion.p>

            <motion.div {...anim(0.65)} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" className="agx-cta">
                <span style={{ position: 'relative', zIndex: 10 }}>Get Started</span>
                <span className="agx-dot"><ArrowUpRight size={14} /></span>
              </a>
              <a href="#projects"
                style={{ display: 'inline-flex', alignItems: 'center', height: 40, padding: '0 20px', borderRadius: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'border-color 200ms', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
              >
                See Our Work →
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Robot */}
          <div className="agx-hr" style={{ flex: '1 1 48%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            <div style={{ position: 'absolute', left: 0, top: 0, width: 140, height: '100%', background: 'linear-gradient(to right, #000, transparent)', pointerEvents: 'none', zIndex: 10 }} />
          </div>

        </div>
      </section>
    </>
  );
}