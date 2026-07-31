import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPaths from "./FloatingPaths";
import AnimatedGradient from "./Animatedgradient";

const SERVICES = [
  { num: "01", tag: "AUTOMATE", title: "AI Automation", desc: "Intelligent systems that eliminate repetitive tasks and supercharge your workflows — running 24/7 without pause.", bg: "#09090f", preset: "Plasma" as const },
  { num: "02", tag: "SUPPORT", title: "Customer Support Chatbot", desc: "Smart AI chatbots that resolve queries instantly, cut support costs, and keep customers happy around the clock.", bg: "#071210", preset: "Pulse" as const },
  { num: "03", tag: "VOICE", title: "Voice Agents", desc: "Human-like AI voice agents that handle calls and conversations — indistinguishable from real staff.", bg: "#110808", preset: "Lava" as const },
  { num: "04", tag: "BUILD", title: "Web Design & Development", desc: "High-performance websites and apps engineered to convert — fast, modern, and built to scale.", bg: "#080e16", preset: "Prism" as const },
  { num: "05", tag: "GROW", title: "SEO", desc: "Data-driven strategies that push your business to the top of Google — and keep it there permanently.", bg: "#110f06", preset: "Mist" as const },
  { num: "06", tag: "DESIGN", title: "Graphic Designing", desc: "Bold visual identities, social content, and brand assets crafted to make your business unforgettable.", bg: "#0e0812", preset: "Vortex" as const },
];

const N = SERVICES.length;
const POS = [
  { scale: 1, y: 0 },
  { scale: 0.95, y: -14 },
  { scale: 0.90, y: -28 },
];

let GUID = 10;
const uid = () => ++GUID;

interface CardItem { uid: number; si: number; }

function ServiceCard({ item, index }: { item: CardItem; index: number }) {
  const svc = SERVICES[item.si % N];
  const pos = POS[index] ?? POS[2];
  const isActive = index === 0;

  return (
    <motion.div
      key={item.uid}
      initial={index === 2 ? { y: -32, scale: 0.9, opacity: 0 } : undefined}
      animate={{ y: pos.y, scale: pos.scale, opacity: 1 }}
      exit={isActive ? { y: 420, scale: 1.02, opacity: 0, zIndex: 10 } : undefined}
      transition={{ type: "spring", duration: 0.75, bounce: 0 }}
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        x: "-50%",
        width: "100%",
        height: 290,
        zIndex: 3 - index,
        borderRadius: 20,
        background: svc.bg,
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 24px 70px rgba(0,0,0,0.85)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "32px 44px 38px",
        willChange: "transform",
      }}
    >
      {/* ── AnimatedGradient on active card only ── */}
      {isActive && (
        <AnimatedGradient
          config={{ preset: svc.preset, speed: 18 }}
          noise={{ opacity: 0.12 }}
          style={{ opacity: 0.38, zIndex: 0 }}
        />
      )}

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#484848", letterSpacing: "0.06em" }}>
          {svc.num} / 0{N}
        </span>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.15em", color: "#555",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 100, padding: "4px 14px",
        }}>
          {svc.tag}
        </span>
      </div>

      {/* Content */}
      <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "clamp(22px,2.8vw,32px)",
          fontWeight: 700, color: "#ffffff",
          lineHeight: 1.1, margin: "0 0 12px",
          letterSpacing: "-0.025em",
        }}>
          {svc.title}
        </h3>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 13, color: "#a3a3a3",
          lineHeight: 1.8, margin: "0 0 24px", maxWidth: 390,
        }}>
          {svc.desc}
        </p>
        <div style={{ width: 36, height: 1.5, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [cards, setCards] = useState<CardItem[]>([{ uid: 1, si: 0 }, { uid: 2, si: 1 }, { uid: 3, si: 2 }]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goNext = useCallback(() => {
    setCards(prev => { const ns = (prev[prev.length - 1].si + 1) % N; return [...prev.slice(1), { uid: uid(), si: ns }]; });
    setActiveIdx(i => (i + 1) % N);
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setCards(prev => { const ps = (prev[0].si - 1 + N) % N; return [{ uid: uid(), si: ps }, ...prev.slice(0, 2)]; });
    setActiveIdx(i => (i - 1 + N) % N);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    const TOTAL = 5000, TICK = 50;
    const id = setInterval(() => {
      setProgress(p => { if (p >= 1) { goNext(); return 0; } return p + TICK / TOTAL; });
    }, TICK);
    return () => clearInterval(id);
  }, [paused, goNext]);

  const jumpTo = (target: number) => {
    const diff = (target - activeIdx + N) % N;
    if (diff === 0) return;
    let cur = [...cards];
    for (let i = 0; i < diff; i++) { const ns = (cur[cur.length - 1].si + 1) % N; cur = [...cur.slice(1), { uid: uid(), si: ns }]; }
    setCards(cur); setActiveIdx(target); setProgress(0);
  };

  return (
    <>
      <style>{`
        @font-face { font-family:'FreshChunky'; src:url('/fonts/FreshChunky-Regular-BF69e8470be9b15.otf') format('opentype'); font-display:swap; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .agx-sv-btn { width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 200ms,border-color 200ms;font-size:16px; }
        .agx-sv-btn:hover { background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25); }
        .agx-sv-dot { height:6px;border-radius:3px;cursor:pointer;transition:width 350ms ease,background 350ms ease; }
      `}</style>

      <section
        id="services"
        style={{ background: "#000000", position: "relative", overflow: "hidden", padding: "120px 24px 100px", display: "flex", flexDirection: "column", alignItems: "center" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Section BG: FloatingPaths ── */}
        <FloatingPaths position={1} opacity={0.55} />
        <FloatingPaths position={-1} opacity={0.35} />

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 80, position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", margin: "0 0 14px" }}>What We Do</p>
          <h2 style={{ fontFamily: "'FreshChunky',sans-serif", fontSize: "clamp(36px,5vw,58px)", color: "#ffffff", margin: "0 0 14px", lineHeight: 1.05 }}>Our Services</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#555", margin: 0 }}>Six ways AgentX transforms your business</p>
        </div>

        {/* ── Card stack ── */}
        <div style={{ position: "relative", zIndex: 1, height: 330, width: "min(580px,88vw)" }}>
          <AnimatePresence initial={false}>
            {cards.slice(0, 3).map((card, index) => (
              <ServiceCard key={card.uid} item={card} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Timer bar ── */}
        <div style={{ position: "relative", zIndex: 1, width: "min(580px,88vw)", height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginTop: 28, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "rgba(255,255,255,0.45)", borderRadius: 2, width: `${progress * 100}%`, transition: "width 50ms linear" }} />
        </div>

        {/* ── Controls ── */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 20, marginTop: 24 }}>
          <button className="agx-sv-btn" onClick={goPrev} aria-label="Prev">←</button>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            {SERVICES.map((_, i) => (
              <div key={i} className="agx-sv-dot" onClick={() => jumpTo(i)} style={{ width: i === activeIdx ? 22 : 6, background: i === activeIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
          <button className="agx-sv-btn" onClick={goNext} aria-label="Next">→</button>
        </div>

        <p style={{ position: "relative", zIndex: 1, fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#333", marginTop: 14 }}>
          {paused ? "⏸ Paused" : "Auto-advancing · hover to pause"}
        </p>
      </section>
    </>
  );
}