import { motion } from 'framer-motion';
import FloatingPaths from './FloatingPaths';

interface Service {
  num: string;
  tag: string;
  title: string;
  desc: string;
  outcome: string;
  core: boolean;
}

const CORE_SERVICES: Service[] = [
  {
    num: '01',
    tag: 'BUILD',
    title: 'Web Design & Development',
    desc: 'High-performance websites engineered to convert — fast, modern, and built to scale.',
    outcome: 'A fast, modern website built to turn visitors into enquiries.',
    core: true,
  },
  {
    num: '02',
    tag: 'ANSWER',
    title: 'AI Chatbot',
    desc: 'Smart AI chatbots trained on your business that resolve questions instantly, cut support costs, and keep customers happy around the clock.',
    outcome: 'Instant answers for every visitor, day and night — no missed leads.',
    core: true,
  },
  {
    num: '03',
    tag: 'GROW',
    title: 'SEO',
    desc: 'Data-driven strategies that push your business to the top of Google — and keep it there.',
    outcome: 'Higher Google rankings that bring in steady, compounding traffic.',
    core: true,
  },
];

const SUPPORTING_SERVICES: Service[] = [
  {
    num: '04',
    tag: 'AUTOMATE',
    title: 'AI Automation',
    desc: 'Intelligent systems that eliminate repetitive tasks and supercharge your workflows — running 24/7 without pause.',
    outcome: 'Repetitive work handled automatically, so your team focuses on customers.',
    core: false,
  },
  {
    num: '05',
    tag: 'VOICE',
    title: 'Voice Agents',
    desc: 'Natural-sounding AI voice agents that answer calls, book appointments, and follow up — day and night.',
    outcome: 'Every call answered, appointments booked — even after hours.',
    core: false,
  },
  {
    num: '06',
    tag: 'DESIGN',
    title: 'Graphic Designing',
    desc: 'Bold visual identities, social content, and brand assets crafted to make your business unforgettable.',
    outcome: 'A sharp brand identity that makes your business look established.',
    core: false,
  },
];

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={svc.core ? 'agx-sv-card agx-sv-core' : 'agx-sv-card'}
      style={{
        position: 'relative',
        borderRadius: 20,
        border: svc.core ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.08)',
        background: svc.core ? '#0a0a0a' : 'rgba(255,255,255,0.02)',
        padding: svc.core ? '32px 30px' : '26px 26px',
        minHeight: svc.core ? 300 : 240,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {svc.core && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)' }} />
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#484848', letterSpacing: '0.06em' }}>
          {svc.num} / 06
        </span>
        <span style={{
          fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.15em', color: '#a3a3a3',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 100, padding: '4px 14px',
        }}>
          {svc.tag}
        </span>
      </div>

      {/* Content */}
      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: svc.core ? 'clamp(20px,2.4vw,26px)' : 19,
        fontWeight: 700, color: '#ffffff',
        lineHeight: 1.15, margin: '22px 0 10px',
        letterSpacing: '-0.02em',
      }}>
        {svc.title}
      </h3>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 13, color: '#c9c9d1',
        lineHeight: 1.8, margin: 0,
      }}>
        {svc.desc}
      </p>

      {/* Outcome */}
      <div style={{ marginTop: 'auto', paddingTop: 20 }}>
        <div style={{ width: 36, height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginBottom: 12 }} />
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: '#ffffff', lineHeight: 1.7, margin: 0 }}>
          <span style={{ color: '#777' }}>What you get: </span>
          {svc.outcome}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      <style>{`
        @font-face { font-family:'ClashDisplay'; src:url('/fonts/ClashDisplay-Regular-BF69e8470be9b15.otf') format('opentype'); font-display:swap; }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .agx-sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: 1080px; }
        @media (max-width: 900px) {
          .agx-sv-grid { grid-template-columns: 1fr; max-width: 580px; }
        }
      `}</style>

      <section
        id="services"
        style={{ background: '#000000', position: 'relative', overflow: 'hidden', padding: '120px 24px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* ── Section BG: one light FloatingPaths only ── */}
        <FloatingPaths position={1} opacity={0.35} />

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>What We Do</p>
          <h2 style={{ fontFamily: "'ClashDisplay',sans-serif", fontSize: 'clamp(36px,5vw,58px)', color: '#ffffff', margin: '0 0 14px', lineHeight: 1.05 }}>One bundle. Three core disciplines.</h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, maxWidth: 560, lineHeight: 1.8 }}>
            Website, AI chatbot, and SEO — one team, one bundle — plus supporting services when you need them.
          </p>
        </div>

        {/* ── Core bento grid: all visible at once ── */}
        <div className="agx-sv-grid" style={{ position: 'relative', zIndex: 1 }}>
          {CORE_SERVICES.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>

        {/* ── Supporting label ── */}
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '56px 0 24px', position: 'relative', zIndex: 1 }}>
          Supporting services
        </p>

        {/* ── Supporting grid ── */}
        <div className="agx-sv-grid" style={{ position: 'relative', zIndex: 1 }}>
          {SUPPORTING_SERVICES.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
