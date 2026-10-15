import { motion } from 'framer-motion';

interface Step {
  num: string;
  title: string;
  desc: string;
  cta: boolean;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Book a free call',
    desc: 'Pick a time that suits you. No forms, no waiting — straight to a real conversation.',
    cta: true,
  },
  {
    num: '02',
    title: 'Get your 30-minute plan',
    desc: 'We map your website, chatbot, and SEO in one call.',
    cta: false,
  },
  {
    num: '03',
    title: 'Get your roadmap',
    desc: 'A fixed quote + timeline. No pressure, no obligation — the roadmap is yours either way.',
    cta: false,
  },
];

export default function Process() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .agx-pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: 1080px; }
        @media (max-width: 900px) {
          .agx-pr-grid { grid-template-columns: 1fr; max-width: 580px; }
        }
      `}</style>

      <section
        id="process"
        style={{
          background: '#050505',
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 24px 100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
            How It Works
          </p>
          <h2 style={{ fontFamily: "'ClashDisplay',sans-serif", fontSize: 'clamp(36px,5vw,58px)', color: '#ffffff', margin: '0 0 14px', lineHeight: 1.05 }}>
            Three steps. No surprises.
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, maxWidth: 520, lineHeight: 1.8 }}>
            Here is exactly what happens when you work with AgentX.
          </p>
        </div>

        {/* Steps */}
        <div className="agx-pr-grid" style={{ position: 'relative', zIndex: 1 }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '32px 30px',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 260,
              }}
            >
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, color: '#484848', letterSpacing: '0.06em' }}>
                {step.num}
              </span>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 22, fontWeight: 700, color: '#ffffff',
                lineHeight: 1.15, margin: '18px 0 10px', letterSpacing: '-0.02em',
              }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: '#c9c9d1', lineHeight: 1.8, margin: 0 }}>
                {step.desc}
              </p>
              {step.cta && (
                <a
                  href="https://calendly.com/wasia2053/30min"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 'auto', paddingTop: 20,
                    fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600,
                    color: '#ffffff', textDecoration: 'none',
                  }}
                >
                  Book a free call →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
