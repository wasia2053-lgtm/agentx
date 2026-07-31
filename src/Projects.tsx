import { CardStack } from "./Cardstack";
import type { CardStackItem } from "./Cardstack";

const PROJECTS: CardStackItem[] = [
  {
    id: 1,
    tag: "AI AUTOMATION",
    title: "E-Commerce AI Engine",
    description: "Full automation pipeline for a retail brand — order processing, inventory alerts, and customer follow-ups running 24/7.",
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    href: "#",
  },
  {
    id: 2,
    tag: "CHATBOT",
    title: "Telecom Support Bot",
    description: "AI chatbot handling 10,000+ monthly queries for a telecom company — 80% resolution without human intervention.",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    href: "#",
  },
  {
    id: 3,
    tag: "VOICE AGENT",
    title: "HealthCare Voice Booking",
    description: "Voice AI that manages appointment bookings and patient follow-ups for a chain of clinics — fully automated.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    href: "#",
  },
  {
    id: 4,
    tag: "WEB DEVELOPMENT",
    title: "SaaS Platform Launch",
    description: "End-to-end design and development of a B2B SaaS dashboard — built for scale, launched in 6 weeks.",
    gradient: "linear-gradient(135deg, #200122 0%, #6f0000 100%)",
    href: "#",
  },
  {
    id: 5,
    tag: "SEO",
    title: "300% Traffic Growth",
    description: "Technical SEO overhaul and content strategy for an e-commerce brand — tripled organic traffic in 4 months.",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a3a2a 50%, #0a2a1a 100%)",
    href: "#",
  },
  {
    id: 6,
    tag: "GRAPHIC DESIGN",
    title: "Brand Identity Suite",
    description: "Complete visual identity — logo, typography, color system, and marketing assets — for a fintech startup.",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3d1166 50%, #6b21a8 100%)",
    href: "#",
  },
];

export default function Projects() {
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
        <div style={{ textAlign: "center", marginBottom: 80, position: "relative", zIndex: 1 }}>
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
            cardWidth={480}
            cardHeight={300}
            spreadDeg={42}
            overlap={0.52}
            depthPx={120}
            maxVisible={5}
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