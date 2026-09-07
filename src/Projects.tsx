import { useState, useEffect } from "react";
import { CardStack } from "./Cardstack";
import type { CardStackItem } from "./Cardstack";

const PROJECTS: CardStackItem[] = [
  {
    id: 1,
    tag: "WEB + SEO",
    title: "Tainted Flesh Body Art",
    description: "Full website design, development, and local SEO for a tattoo studio in Wilmington, DE — built to convert visitors into booked consultations.",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    image: "https://taintedfleshbodyartnorth.com/wp-content/uploads/2026/05/Picture-for-how-it-works-section.jpg",
    href: "https://taintedfleshbodyartnorth.com/",
  },
  {
    id: 2,
    tag: "WEB + SEO",
    title: "Pixiest Photography",
    description: "Portfolio website and local SEO for a Delaware-based photographer — service pages built around wedding, event, and drone photography search terms.",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    image: "https://pixiestphotography.com/wp-content/uploads/2025/11/Event-Photography-in-Newark-Delaware.jpg",
    href: "https://pixiestphotography.com/",
  },
  {
    id: 3,
    tag: "WEB + E-COMMERCE",
    title: "Black Eden 420",
    description: "Full e-commerce build for a licensed cannabis delivery service in California — product catalog, ordering flow, and location-based SEO across service areas.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    image: "https://blackeden420.com/wp-content/uploads/2025/11/Black-Eden.png",
    href: "https://blackeden420.com/",
  },
  {
    id: 4,
    tag: "WEB + SEO",
    title: "DM Power Construction",
    description: "Website design and development for a Massachusetts home renovation contractor — project galleries, service pages, and local SEO for the Greater Boston area.",
    gradient: "linear-gradient(135deg, #200122 0%, #6f0000 100%)",
    image: "https://www.dmpowerconstruction.com/wp-content/uploads/2025/07/IMG-20250714-WA0005.jpg",
    href: "https://www.dmpowerconstruction.com/",
  },
  {
    id: 5,
    tag: "WEB + SEO",
    title: "The Bean Guys",
    description: "Website build for a mobile coffee cart and event catering brand serving the Dallas-Fort Worth area — booking flow and content across service and location pages.",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a3a2a 50%, #0a2a1a 100%)",
    image: "https://images.squarespace-cdn.com/content/v1/67ad5879262782591823fa86/c3ba25f8-9d5c-49b6-847a-46faa15ff257/Bean+Guys-9.jpg",
    href: "https://www.thebeanguys.com/",
  },
  {
    id: 6,
    tag: "WEB + SEO",
    title: "Estelles Lighting",
    description: "Website design, development, and SEO for a lighting brand — product pages and site structure built for search visibility.",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3d1166 50%, #6b21a8 100%)",
    image: "/estelles-lighting.jpg",
    href: "https://estelleslighting.com/",
  },
];

export default function Projects() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 640;
  const cardWidth = isMobile ? Math.min(300, vw - 56) : 480;
  const cardHeight = isMobile ? Math.round(cardWidth * (300 / 480)) : 300;
  const spreadDeg = isMobile ? 24 : 42;
  const depthPx = isMobile ? 40 : 120;
  // Higher overlap + fewer visible side-cards = the stage needs less total width,
  // so it doesn't have to scale the active card down so much to fit.
  const overlap = isMobile ? 0.8 : 0.72;
  const maxVisible = isMobile ? 3 : 5;

  return (
    <>
      <style>{`
        @font-face { font-family:'FreshChunky'; src:url('/fonts/FreshChunky-Regular-BF69e8470be9b15.otf') format('opentype'); font-display:swap; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes agxGlowBreathe {
          0%,100% { opacity:0.18; transform:scale(1); }
          50%      { opacity:0.32; transform:scale(1.08); }
        }
        @keyframes agxGlowBreathe2 {
          0%,100% { opacity:0.10; transform:scale(1.05); }
          50%      { opacity:0.22; transform:scale(0.95); }
        }
        .agx-glow1 { animation: agxGlowBreathe  5s ease-in-out infinite; }
        .agx-glow2 { animation: agxGlowBreathe2 7s ease-in-out infinite; }
      `}</style>

      <section
        id="projects"
        style={{
          background: "#000000",
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Breathing glow bg ── */}
        <div
          className="agx-glow1"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          className="agx-glow2"
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(180,100,255,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          className="agx-glow2"
          style={{
            position: "absolute",
            top: "35%",
            right: "25%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,160,255,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 80, position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.22em", color: "#555",
            textTransform: "uppercase", margin: "0 0 14px",
          }}>
            Our Work
          </p>
          <h2 style={{
            fontFamily: "'FreshChunky',sans-serif",
            fontSize: "clamp(36px,5vw,58px)",
            color: "#ffffff", margin: "0 0 14px", lineHeight: 1.05,
          }}>
            Featured Projects
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#555", margin: 0 }}>
            Real results we've delivered for real clients
          </p>
        </div>

        {/* ── Card Stack ── */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900 }}>
          <CardStack
            items={PROJECTS}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            spreadDeg={spreadDeg}
            overlap={overlap}
            depthPx={depthPx}
            maxVisible={maxVisible}
            minStageHeight={isMobile ? 240 : 420}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            loop
            showDots
          />
        </div>

        {/* ── Drag hint ── */}
        <p style={{
          position: "relative", zIndex: 1,
          fontFamily: "'Inter',sans-serif",
          fontSize: 11, color: "#333",
          marginTop: 16,
        }}>
          Drag or click side cards to navigate
        </p>
      </section>
    </>
  );
}