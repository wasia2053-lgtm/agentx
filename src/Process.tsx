import { CalendarCheck, Map, Rocket } from './Icons';
import { Reveal } from './Reveal';

interface Step {
  num: string;
  title: string;
  desc: string;
  cta: boolean;
  icon: typeof CalendarCheck;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Book a free call',
    desc: 'Pick a time that suits you. No forms, no waiting — straight to a real conversation.',
    cta: true,
    icon: CalendarCheck,
  },
  {
    num: '02',
    title: 'Get your 30-minute plan',
    desc: 'We map your website, chatbot, and SEO in one call.',
    cta: false,
    icon: Map,
  },
  {
    num: '03',
    title: 'Get your roadmap',
    desc: 'A fixed quote + timeline. No pressure, no obligation — the roadmap is yours either way.',
    cta: false,
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <>
      <style>{`
        .agx-pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; max-width: 1080px; position: relative; }
        .agx-pr-line { display: block; position: absolute; top: 72px; left: 18%; right: 18%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent); }
        @media (max-width: 900px) {
          .agx-pr-grid { grid-template-columns: 1fr; max-width: 580px; }
          .agx-pr-line { display: none; }
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
        <Reveal style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
            How It Works
          </p>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
            Three steps. No surprises.
          </h2>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, maxWidth: 520, lineHeight: 1.8 }}>
            Here is exactly what happens when you work with AgentX.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="agx-pr-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="agx-pr-line" aria-hidden="true" />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={i * 0.1} style={{ height: '100%' }}>
                <div
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    padding: '32px 30px',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 280,
                    height: '100%',
                    position: 'relative',
                    transition: 'transform 300ms ease, border-color 300ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: '#ffffff', color: '#000000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={22} />
                    </span>
                    <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#484848', letterSpacing: '0.06em' }}>
                      {step.num}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontStretch: '75%',
                    fontSize: 22, fontWeight: 800, color: '#ffffff',
                    lineHeight: 1.15, margin: '22px 0 10px', letterSpacing: '-0.02em',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#c9c9d1', lineHeight: 1.8, margin: 0 }}>
                    {step.desc}
                  </p>
                  {step.cta && (
                    <a
                      href="https://calendly.com/wasia2053/30min"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        marginTop: 'auto', paddingTop: 20,
                        fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 600,
                        color: '#ffffff', textDecoration: 'none',
                      }}
                    >
                      Book a free call →
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
