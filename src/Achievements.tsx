import { useState, useEffect, useRef } from 'react';

/* ── DotCard — counter inside component (no hooks-in-map) ───────── */
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
  const [dotGo,   setDotGo]   = useState(false);

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

  /* dot starts after short delay */
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setDotGo(true), delay + 200);
    return () => clearTimeout(t);
  }, [active, delay]);

  const display =
    suffix === '/7' ? '24/7' :
    suffix === '%'  ? `${count}%` :
    suffix === 'x'  ? `${count}x` :
    `${count}+`;

  return (
    <div className="agx-dotcard-outer">
      {/* ── Moving dot — travels the 4 corners, exact path from reference ── */}
      <div
        className="agx-dotcard-dot"
        style={{ animationPlayState: dotGo ? 'running' : 'paused', opacity: dotGo ? 1 : 0 }}
      />

      {/* ── Card ── */}
      <div className="agx-dotcard-card">
        {/* Ray / spotlight behind number */}
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
  { target:2,  suffix:'+',  label:'Core Skills: Dev & SEO', duration:1000, delay:300, active:false },
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @font-face {
          font-family: 'FreshChunky';
          src: url('/fonts/FreshChunky-Regular-BF69e8470be9b15.otf') format('opentype');
          font-display: swap;
        }

        @keyframes agxDotMove {
          0%, 100% { top: 10%; right: 10%; }
          25%      { top: 10%; right: calc(100% - 35px); }
          50%      { top: calc(100% - 30px); right: calc(100% - 35px); }
          75%      { top: calc(100% - 30px); right: 10%; }
        }
        @keyframes agxRayPulse {
          0%,100% { opacity:0.55; }
          50%     { opacity:1; }
        }
        @keyframes agxSecGlow {
          0%,100% { opacity:0.1; transform:translateX(-50%) scale(1); }
          50%     { opacity:0.2; transform:translateX(-50%) scale(1.06); }
        }

        .agx-dotcard-outer {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 0.92;
          min-height: 190px;
        }
        .agx-dotcard-dot {
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 16px 5px rgba(180,220,255,0.65), 0 0 4px 1px #fff;
          z-index: 10;
          pointer-events: none;
          animation: agxDotMove 4.5s ease-in-out infinite;
          transition: opacity 0.5s;
          top: 10%;
          right: 10%;
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
          background: radial-gradient(circle at 50% 42%, rgba(160,210,255,0.16) 0%, rgba(160,210,255,0.05) 35%, transparent 65%);
          pointer-events: none;
          animation: agxRayPulse 3.5s ease-in-out infinite;
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
          font-family: 'Inter', sans-serif;
          font-size: clamp(38px, 4.6vw, 60px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 12px;
          background: linear-gradient(180deg, #ffffff 0%, #bfe3ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 18px rgba(150,205,255,0.35));
        }
        .agx-dotcard-label {
          position: relative;
          z-index: 1;
          font-family: 'Inter', sans-serif;
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
        {/* Section glow */}
        <div style={{
          position:     'absolute',
          top:          '30%',
          left:         '50%',
          width:        700,
          height:       500,
          borderRadius: '50%',
          background:   'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)',
          filter:       'blur(80px)',
          pointerEvents:'none',
          animation:    'agxSecGlow 6s ease-in-out infinite',
          zIndex:       0,
        }} />

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:64, position:'relative', zIndex:1 }}>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:10, fontWeight:600, letterSpacing:'0.22em', color:'#555', textTransform:'uppercase', margin:'0 0 14px' }}>
            By The Numbers
          </p>
          <h2 style={{ fontFamily:"'FreshChunky',sans-serif", fontSize:'clamp(36px,5vw,58px)', color:'#ffffff', margin:'0 0 14px', lineHeight:1.05 }}>
            Our Achievements
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:'#555', margin:0 }}>
            Results that speak louder than words
          </p>
        </div>

        {/* Cards */}
        <div className="agx-ach-grid" style={{ position:'relative', zIndex:1 }}>
          {STATS.map((s, i) => (
            <DotCard key={i} {...s} active={active} />
          ))}
        </div>
      </section>
    </>
  );
}