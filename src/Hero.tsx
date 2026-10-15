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
        .agx-hi { display: flex; align-items: center; width: 100%; height: 100%; padding: 0 80px; gap: 40px; position: relative; z-index: 10; }
        @media (max-width: 900px) {
          .agx-hi { flex-direction: column; padding: 120px 28px 40px; align-items: flex-start; gap: 0; }
          .agx-hr { width: 100% !important; height: 50vh !important; min-width: unset !important; flex: none !important; }
        }
      `}</style>

      <section id="home" style={{ position: 'relative', height: '100vh', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

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
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontStretch: '75%',
                fontSize: 'clamp(56px, 6.8vw, 104px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
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

          {/* RIGHT — robot + ONE orb, kept low so the head/eyes stay clean */}
          <div className="agx-hr" style={{ flex: '1 1 48%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* Soft neutral light behind the robot so it renders at full brightness */}
            <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
            {/* The single orb — low, around the lower torso/legs, dim near the head */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '62%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'none', zIndex: 0 }}>
              <div className="agx-orb" style={{ width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, rgba(255,92,168,0.20) 0%, rgba(255,138,61,0.16) 38%, rgba(139,92,255,0.18) 62%, transparent 72%)', filter: 'blur(56px)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </div>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 140, height: '100%', background: 'linear-gradient(to right, #000, transparent)', pointerEvents: 'none', zIndex: 10 }} />
          </div>

        </div>
      </section>
    </>
  );
}
