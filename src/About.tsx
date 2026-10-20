import { Reveal } from './Reveal';
import { WASI_PHOTO, ALI_PHOTO } from './TeamPhotos';

const VALUES = [
  {
    title: 'Conversion-first',
    desc: 'Every design decision is measured by one metric: does it turn your visitors into customers?',
  },
  {
    title: 'Fast and responsive',
    desc: 'Your site stays lightning-fast and pixel-perfect on phones, tablets, and desktops.',
  },
  {
    title: 'Built to be found',
    desc: 'SEO isn’t an add-on — it’s baked into every page, so Google can find you and customers can too.',
  },
];

const TEAM = [
  { name: 'Wasi Ahmed', role: 'Founder — Development', photo: WASI_PHOTO },
  { name: 'Ali Ahmed', role: 'Founder — SEO', photo: ALI_PHOTO },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <Reveal blur style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
          About AgentX
        </p>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontStretch: '75%', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
          A small team, obsessed with results
        </h2>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, maxWidth: 560, lineHeight: 1.8 }}>
          AgentX is an AI-powered agency. We don’t sell websites — we build systems that bring you customers.
        </p>
      </Reveal>

      {/* Team positioning */}
      <Reveal blur style={{ textAlign: 'center', margin: '56px 0 0', position: 'relative', zIndex: 1, maxWidth: 720 }}>
        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontStretch: '75%', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          You work directly with the people who build it.
        </h3>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, lineHeight: 1.8 }}>
          Wasi leads development, Ali leads SEO. No account-manager telephone game — the people you talk to are the people who build your website, chatbot, and rankings.
        </p>
      </Reveal>

      {/* Values */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: '100%', maxWidth: 1080, marginTop: 48, position: 'relative', zIndex: 1 }}>
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08} style={{ height: '100%' }}>
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '28px 26px',
                background: 'rgba(255,255,255,0.02)',
                height: '100%',
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
              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontStretch: '75%', fontSize: 20, fontWeight: 800, color: '#ffffff', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{v.title}</h3>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, color: '#c9c9d1', lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Team */}
      <Reveal style={{ width: '100%', maxWidth: 1080, marginTop: 56, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 20px', textAlign: 'center' }}>
          The Team
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {TEAM.map((t) => (
            <div key={t.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '16px 22px',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <img src={t.photo} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, fontWeight: 600, color: '#ffffff', margin: 0 }}>{t.name}</p>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: '#a3a3a3', margin: 0 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
