import { Reveal } from './Reveal';

/**
 * Final email CTA band — the last section before the footer.
 * One headline, one email button, one Calendly button.
 * The orb artwork (public/images/orb-art.svg) sits behind the copy
 * at low opacity — the single colour moment outside the hero.
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
      <img
        src="/images/orb-art.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 520,
          height: 520,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <Reveal style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 16px' }}>
          Start Today
        </p>
        <h2 style={{
          fontFamily: "'Archivo', sans-serif",
          fontStretch: '70%',
          fontSize: 'clamp(36px,5.5vw,64px)',
          fontWeight: 800,
          color: '#ffffff',
          margin: '0 0 18px',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
        }}>
          Let&apos;s build something that sells while you sleep.
        </h2>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 15, color: '#a3a3a3', margin: '0 0 36px', lineHeight: 1.8 }}>
          Tell us about your project — or skip the typing and book a free 30-minute strategy call.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="mailto:wasia2053@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 30px', borderRadius: 100,
              background: '#ffffff', color: '#000000',
              fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Email us — wasia2053@gmail.com
          </a>
          <a
            href="https://calendly.com/wasia2053/30min"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 30px', borderRadius: 100,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Book a free strategy call →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
