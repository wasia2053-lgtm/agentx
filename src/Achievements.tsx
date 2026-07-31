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
    <div style={{ position:'relative', width:'100%' }}>

      {/* ── Moving dot ── */}
      <div style={{
        position:     'absolute',
        width:        10,
        height:       10,
        borderRadius: '50%',
        background:   '#ffffff',
        boxShadow:    '0 0 14px 5px rgba(255,255,255,0.55)',
        zIndex:       10,
        pointerEvents:'none',
        animation:    dotGo ? 'agxDotMove 4s ease-in-out infinite' : 'none',
        opacity:      dotGo ? 1 : 0,
        transition:   'opacity 0.5s',
        /* start position matches 0%/100% keyframe */
        top:   '12px',
        right: '12px',
      }} />

      {/* ── Card ── */}
      <div style={{
        position:       'relative',
        background:     '#0d0d0d',
        border:         '1px solid rgba(255,255,255,0.08)',
        borderRadius:   16,
        padding:        '52px 20px 44px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        overflow:       'hidden',
        minHeight:      200,
      }}>

        {/* Ray / spotlight */}
        <div style={{
          position:     'absolute',
          inset:        0,
          background:   'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 65%)',
          pointerEvents:'none',
          animation:    'agxRayPulse 3.5s ease-in-out infinite',
        }} />

        {/* Corner lines */}
        {/* top-left */}
        <div style={{ position:'absolute', top:0,    left:0,  width:24, height:1, background:'rgba(255,255,255,0.18)' }} />
        <div style={{ position:'absolute', top:0,    left:0,  width:1,  height:24, background:'rgba(255,255,255,0.18)' }} />
        {/* top-right */}
        <div style={{ position:'absolute', top:0,    right:0, width:24, height:1, background:'rgba(255,255,255,0.18)' }} />
        <div style={{ position:'absolute', top:0,    right:0, width:1,  height:24, background:'rgba(255,255,255,0.18)' }} />
        {/* bottom-left */}
        <div style={{ position:'absolute', bottom:0, left:0,  width:24, height:1, background:'rgba(255,255,255,0.18)' }} />
        <div style={{ position:'absolute', bottom:0, left:0,  width:1,  height:24, background:'rgba(255,255,255,0.18)' }} />
        {/* bottom-right */}
        <div style={{ position:'absolute', bottom:0, right:0, width:24, height:1, background:'rgba(255,255,255,0.18)' }} />
        <div style={{ position:'absolute', bottom:0, right:0, width:1,  height:24, background:'rgba(255,255,255,0.18)' }} />

        {/* Number */}
        <div style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      'clamp(44px, 5vw, 68px)',
          fontWeight:    700,
          color:         '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight:    1,
          position:      'relative',
          zIndex:        1,
          marginBottom:  12,
        }}>
          {display}
        </div>

        {/* Label */}
        <div style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      10,
          fontWeight:    600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:         '#555',
          position:      'relative',
          zIndex:        1,
          textAlign:     'center',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── Stats ──────────────────────────────────────────────────────── */
const STATS: DotCardProps[] = [
  { target:50, suffix:'+',  label:'Projects Delivered',  duration:1800, delay:0,   active:false },
  { target:98, suffix:'%',  label:'Client Satisfaction', duration:2000, delay:150, active:false },
  { target:0,  suffix:'/7', label:'AI Systems Running',  duration:500,  delay:300, active:false },
  { target:3,  suffix:'x',  label:'Avg ROI for Clients', duration:1400, delay:450, active:false },
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
          0%,100% { top:12px; right:12px; }
          25%     { top:12px; right:calc(100% - 24px); }
          50%     { top:calc(100% - 24px); right:calc(100% - 24px); }
          75%     { top:calc(100% - 24px); right:12px; }
        }
        @keyframes agxRayPulse {
          0%,100% { opacity:0.55; }
          50%     { opacity:1; }
        }
        @keyframes agxSecGlow {
          0%,100% { opacity:0.1; transform:translateX(-50%) scale(1); }
          50%     { opacity:0.2; transform:translateX(-50%) scale(1.06); }
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