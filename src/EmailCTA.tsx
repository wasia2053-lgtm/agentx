import { Reveal } from './Reveal';

/**
 * Final email CTA band — the last section before the footer.
 * One headline, one email button, one Calendly button.
 */
export default function EmailCTA() {
  return (
    <section
      id="cta"
      style={{
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Reveal style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 16px' }}>
          Start Today
        </p>
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontStretch: '75%',
          fontSize: 'clamp(36px,5.5vw,64px)',
          fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 18px',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
        }}>
          Let&apos;s build something that sells while you sleep.
        </h2>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15, color: '#a3a3a3', margin: '0 0 36px', lineHeight: 1.8 }}>
          Tell us about your project — or skip the typing and book a free 30-minute strategy call.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="mailto:wasia2053@gmail.com"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 14px 34px rgba(255,255,255,0.16)';
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 30px', borderRadius: 100,
              background: '#ffffff', color: '#000000',
              fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'transform 250ms ease, box-shadow 250ms ease',
            }}
          >
            Email us — wasia2053@gmail.com
          </a>
          <a
            href="https://calendly.com/wasia2053/30min"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 30px', borderRadius: 100,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'transform 250ms ease, border-color 250ms ease',
            }}
          >
            Book a free strategy call →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
