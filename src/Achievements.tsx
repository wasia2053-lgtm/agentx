import { useState, useEffect, useRef } from 'react';
import { Reveal } from './Reveal';

/* ── DotCard — calm counter only (no travelling dot) ───────── */
interface DotCardProps {
  target:   number;
  suffix:   string;
  label:    string;
  duration: number;
  delay:    number;
  active:   boolean;
}

function DotCard({ target, suffix, label, duration, delay, active }: DotCardProps) {
  const [count,   setCount]   = useState(0);

  /* counter */
  useEffect(() => {
    if (!active) return;
    if (suffix === '/7') { setCount(0); return; }
    const t = setTimeout(() => {
      let val = 0;
      const inc = Math.ceil(target / (duration / 50));
      const id = setInterval(() => {
        val += inc;
        if (val >= target) { val = target; clearInterval(id); }
        setCount(val);
      }, 50);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, duration, delay, suffix]);

  const display =
    suffix === '/7' ? '24/7' :
    suffix === '%'  ? `${count}%` :
    suffix === 'x'  ? `${count}x` :
    suffix === 'in1' ? '3-in-1' :
    `${count}+`;

  return (
    <div className="agx-dotcard-outer">
      {/* ── Card ── */}
      <div className="agx-dotcard-card">
        {/* Static soft spotlight behind number (no pulse) */}
        <div className="agx-dotcard-ray" />

        {/* Corner tick-mark frame (top-left + bottom-right brackets) */}
        <div className="agx-dotcard-line agx-dc-topl" />
        <div className="agx-dotcard-line agx-dc-leftl" />
        <div className="agx-dotcard-line agx-dc-bottoml" />
        <div className="agx-dotcard-line agx-dc-rightl" />

        {/* Number */}
        <div className="agx-dotcard-text">{display}</div>

        {/* Label */}
        <div className="agx-dotcard-label">{label}</div>
      </div>
    </div>
  );
}

/* ── Stats ──────────────────────────────────────────────────────── */
const STATS: DotCardProps[] = [
  { target:6,  suffix:'+',  label:'Live Websites Delivered', duration:1400, delay:0,   active:false },
  { target:100,suffix:'%',  label:'Projects Still Live Today', duration:1400, delay:150, active:false },
  { target:3,  suffix:'in1', label:'Web + Chatbot + SEO — One Bundle', duration:1000, delay:300, active:false },
  { target:0,  suffix:'/7', label:'Direct Founder Access',   duration:500,  delay:450, active:false },
];

/* ── Section ────────────────────────────────────────────────────── */
export default function Achievements() {
  const ref    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .agx-dotcard-outer {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.92;
          min-height: 190px;
        }
        .agx-dotcard-card {
          position: relative;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse 140% 100% at 50% -10%, #1c1c1c 0%, #0a0a0a 55%, #060606 100%);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -20px rgba(0,0,0,0.6);
        }
        .agx-dotcard-ray {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 42%, rgba(160,210,255,0.10) 0%, rgba(160,210,255,0.03) 35%, transparent 65%);
          pointer-events: none;
        }
        .agx-dotcard-line {
          position: absolute;
          background: rgba(255,255,255,0.16);
          pointer-events: none;
        }
        .agx-dc-topl    { top: 22px;    left: 22px;  width: 36px; height: 1px; }
        .agx-dc-leftl   { top: 22px;    left: 22px;  width: 1px;  height: 36px; }
        .agx-dc-bottoml { bottom: 22px; right: 22px; width: 36px; height: 1px; }
        .agx-dc-rightl  { bottom: 22px; right: 22px; width: 1px;  height: 36px; }
        .agx-dotcard-text {
          position: relative;
          z-index: 1;
          font-family: 'Inter Tight', sans-serif;
          font-stretch: 75%;
          font-size: clamp(38px, 4.6vw, 60px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 12px;
          background: linear-gradient(180deg, #ffffff 0%, #bfe3ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .agx-dotcard-label {
          position: relative;
          z-index: 1;
          font-family: 'Inter Tight', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #666;
          text-align: center;
          padding: 0 14px;
        }

        .agx-ach-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 960px;
        }
        @media (max-width: 860px) {
          .agx-ach-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .agx-ach-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        id="achievements"
        ref={ref}
        style={{
          background:    '#000000',
          position:      'relative',
          overflow:      'hidden',
          padding:       '120px 24px 100px',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
        }}
      >
        {/* Static section glow (no animation) */}
        <div style={{
          position:     'absolute',
          top:          '30%',
          left:         '50%',
          width:        700,
          height:       500,
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)',
          filter:       'blur(80px)',
          pointerEvents:'none',
          zIndex:       0,
        }} />

        {/* Header */}
        <Reveal blur style={{ textAlign:'center', marginBottom:64, position:'relative', zIndex:1 }}>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:10, fontWeight:600, letterSpacing:'0.22em', color:'#555', textTransform:'uppercase', margin:'0 0 14px' }}>
            By The Numbers
          </p>
          <h2 style={{ fontFamily:"'Inter Tight', sans-serif", fontStretch:'75%', fontSize:'clamp(36px,5vw,58px)', fontWeight:800, color:'#ffffff', margin:'0 0 14px', lineHeight:1.02, letterSpacing:'-0.02em' }}>
            Our Achievements
          </h2>
          <p style={{ fontFamily:"'Inter Tight', sans-serif", fontSize:14, color:'#555', margin:0 }}>
            Results that speak louder than words
          </p>
        </Reveal>

        {/* Cards */}
        <div className="agx-ach-grid" style={{ position:'relative', zIndex:1 }}>
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <DotCard {...s} active={active} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
