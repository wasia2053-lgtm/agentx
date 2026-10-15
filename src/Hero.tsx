import { motion } from 'framer-motion';
import { ArrowUpRight } from './Icons';
import SplineScene from './SplineScene';
import { WordReveal } from './Reveal';

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 22, delay },
});

export default function Hero() {
  return (
    <>
      <style>{`
        .agx-cta {
          position: relative; display: inline-flex; align-items: center;
          height: 40px; padding-left: 20px; padding-right: 48px;
          border-radius: 100px; background: #ffffff; color: #000000;
          font-family: 'Archivo', sans-serif; font-size: 13px; font-weight: 600;
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
        .agx-hero-sec { height: 100vh; min-height: 640px; }
        .agx-hi { display: flex; align-items: center; width: 100%; height: 100%; padding: 0 80px; gap: 40px; position: relative; z-index: 10; }
        @media (max-width: 900px) {
          /* Mobile: stack, never clip. The old 100vh + column layout
             overflowed and clipped the headline and squashed the robot. */
          .agx-hero-sec { height: auto !important; min-height: 100svh; padding-top: 96px; }
          .agx-hi { flex-direction: column; padding: 24px 24px 8px; align-items: stretch; gap: 8px; height: auto; }
          .agx-hr { width: 100% !important; height: 340px !important; min-height: 340px !important; min-width: unset !important; flex: none !important; }
        }
      `}</style>

      <section id="home" className="agx-hero-sec" style={{ position: 'relative', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to top, #000 30%, transparent)', zIndex: 5, pointerEvents: 'none' }} />

        <div className="agx-hi">

          {/* LEFT — plain black, clean white type */}
          <div style={{ flex: '0 0 52%', display: 'flex', flexDirection: 'column', gap: 24, zIndex: 10 }}>

            <motion.div {...anim(0.2)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '6px 16px', fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 500, color: '#a3a3a3' }}>
                ⚡ AI-Powered Agency
              </span>
            </motion.div>

            <WordReveal
              lines={['More leads while', 'you sleep.']}
              delay={0.3}
              gradientLine={1}
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontStretch: '70%',
                fontSize: 'clamp(44px, 6.8vw, 104px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            />

            <motion.p {...anim(0.6)} style={{ fontFamily: "'Archivo', sans-serif", fontSize: 16, fontWeight: 400, color: '#c9c9d1', maxWidth: 460, lineHeight: 1.75, margin: 0 }}>
              AgentX builds your website, trains your AI chatbot, and ranks you on Google — one team, one bundle, done for you.
            </motion.p>

            <motion.div {...anim(0.75)} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://calendly.com/wasia2053/30min" target="_blank" rel="noreferrer" className="agx-cta">
                <span style={{ position: 'relative', zIndex: 10 }}>Book a free strategy call</span>
                <span className="agx-dot"><ArrowUpRight size={14} /></span>
              </a>
              <a href="#projects"
                style={{ display: 'inline-flex', alignItems: 'center', height: 40, padding: '0 20px', borderRadius: 100, background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'border-color 200ms', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
              >
                See Our Work →
              </a>
            </motion.div>
          </div>

          {/* RIGHT — robot, clean on black. No glow behind it: the old
              orb + white light washed the robot out and looked cheap. */}
          <div className="agx-hr" style={{ flex: '1 1 48%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
