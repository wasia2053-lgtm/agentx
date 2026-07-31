import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  tag?: string;
  gradient: string; // CSS gradient string
  href?: string;
};

type CardStackProps = {
  items: CardStackItem[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function GradientCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 16, overflow: "hidden" }}>
      {/* Gradient background */}
      <div style={{ position: "absolute", inset: 0, background: item.gradient }} />

      {/* Noise overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      {/* Bottom gradient for text */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Tag */}
      {item.tag && (
        <div style={{
          position: "absolute", top: 20, left: 20,
          fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)",
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 100, padding: "4px 12px",
          backdropFilter: "blur(8px)",
        }}>
          {item.tag}
        </div>
      )}

      {/* Active glow dot */}
      {active && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          width: 8, height: 8, borderRadius: "50%",
          background: "#ffffff",
          boxShadow: "0 0 12px rgba(255,255,255,0.8)",
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 24px 28px",
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 22, fontWeight: 700,
          color: "#ffffff", letterSpacing: "-0.02em",
          lineHeight: 1.15, marginBottom: 8,
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}>
          {item.title}
        </div>
        {item.description && (
          <div style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 13, color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}>
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
}

export function CardStack({
  items,
  initialIndex     = 0,
  maxVisible       = 5,
  cardWidth        = 500,
  cardHeight       = 320,
  overlap          = 0.5,
  spreadDeg        = 44,
  perspectivePx    = 1100,
  depthPx          = 130,
  tiltXDeg         = 10,
  activeLiftPx     = 24,
  activeScale      = 1.03,
  inactiveScale    = 0.93,
  springStiffness  = 280,
  springDamping    = 28,
  loop             = true,
  autoAdvance      = true,
  intervalMs       = 3000,
  pauseOnHover     = true,
  showDots         = true,
}: CardStackProps) {
  const reduceMotion = useReducedMotion();
  const len          = items.length;

  const [active,   setActive]   = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => { setActive(a => wrapIndex(a, len)); }, [len]);

  const maxOffset   = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg     = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const next = React.useCallback(() => { if (!len) return; setActive(a => wrapIndex(a + 1, len)); }, [len]);
  const prev = React.useCallback(() => { if (!len) return; setActive(a => wrapIndex(a - 1, len)); }, [len]);

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;
    const id = window.setInterval(next, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, next]);

  if (!len) return null;

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        style={{ position: "relative", width: "100%", height: Math.max(420, cardHeight + 100) }}
        tabIndex={0}
        onKeyDown={e => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }}
      >
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          perspective: `${perspectivePx}px`,
        }}>
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off     = signedOffset(i, active, len, loop);
              const abs     = Math.abs(off);
              if (abs > maxOffset) return null;

              const rotateZ = off * stepDeg;
              const x       = off * cardSpacing;
              const y       = abs * 8;
              const z       = -abs * depthPx;
              const isActive = off === 0;
              const scale   = isActive ? activeScale : inactiveScale;
              const lift    = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex  = 100 - abs;

              const dragProps = isActive ? {
                drag: "x" as const,
                dragConstraints: { left: 0, right: 0 },
                dragElastic: 0.18,
                onDragEnd: (_e: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
                  if (reduceMotion) return;
                  const t = info.offset.x, v = info.velocity.x;
                  const thr = Math.min(160, cardWidth * 0.22);
                  if (t > thr || v > 650) prev();
                  else if (t < -thr || v < -650) next();
                },
              } : {};

              return (
                <motion.div
                  key={item.id}
                  style={{
                    position: "absolute", bottom: 0,
                    width: cardWidth, height: cardHeight,
                    zIndex,
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: isActive
                      ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)"
                      : "0 16px 40px rgba(0,0,0,0.5)",
                    cursor: isActive ? "grab" : "pointer",
                    userSelect: "none",
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                  }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                  animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                  transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div style={{ width: "100%", height: "100%", transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}>
                    <GradientCard item={item} active={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      {showDots && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {items.map((it, idx) => (
            <button
              key={it.id}
              onClick={() => setActive(idx)}
              aria-label={`Go to ${it.title}`}
              style={{
                width: idx === active ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: idx === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                transition: "all 300ms ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}