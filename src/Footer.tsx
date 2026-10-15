import { Reveal } from './Reveal';

/**
 * Clean footer matching the finalized design:
 * CTA block + nav links + copyright.
 * No curtain reveal, no giant outlined text, no marquee,
 * no magnetic buttons, no heartbeat.
 */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 24px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* CTA */}
        <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontFamily: "'Archivo', sans-serif",
            fontStretch: '75%',
            fontSize: 'clamp(28px,4vw,44px)',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 12px',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Ready to start your project?
          </h2>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: '0 0 28px', lineHeight: 1.8 }}>
            Book a free 30-minute strategy call — get your roadmap, no pressure.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://calendly.com/wasia2053/30min"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 100,
                background: '#ffffff', color: '#000000',
                fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Book a free call →
            </a>
            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 100,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View Our Work
            </a>
          </div>
        </Reveal>

        {/* Nav row */}
        <nav aria-label="Footer" style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px 28px',
          justifyContent: 'center', alignItems: 'center',
          padding: '28px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { label: 'Home', href: '#home' },
            { label: 'Services', href: '#services' },
            { label: 'Projects', href: '#projects' },
            { label: 'Process', href: '#process' },
            { label: 'FAQ', href: '#faq' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
            { label: 'Privacy Policy', href: '/privacy-policy.html' },
            { label: 'Terms of Service', href: '/terms-of-service.html' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 500,
                color: '#a3a3a3', textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px 16px',
          justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 28,
        }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#777', margin: 0 }}>
            © 2026 AgentX. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#777', margin: 0 }}>
            Crafted by AgentX
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 100, padding: '8px 18px', cursor: 'pointer',
              fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 500,
              color: '#ffffff',
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
