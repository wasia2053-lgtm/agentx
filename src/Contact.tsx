import { useState, useRef } from 'react';
import { Reveal } from './Reveal';

const INFO = [
  { icon: '📧', label: 'Email', value: 'wasia2053@gmail.com' },
  { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';

    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSending(true);
    setError(false);

    try {
      const res = await fetch('https://formspree.io/f/xrpgyrkk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
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
      <Reveal blur style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
          Get In Touch
        </p>
        <h2 style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
          Let&apos;s build your growth machine
        </h2>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0 }}>
          Tell us about your project and we&apos;ll get back to you within 24 hours.
        </p>
      </Reveal>

      {/* Grid */}
      <Reveal style={{ width: '100%', maxWidth: 960, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}>
          {/* ── LEFT: info + Calendly ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {INFO.map((item) => (
              <div key={item.label} style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '24px 26px',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: '#777', textTransform: 'uppercase', margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 500, color: '#ffffff', margin: 0, wordBreak: 'break-all' }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Calendly */}
            <a href="https://calendly.com/wasia2053/30min" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 20, padding: '28px 26px',
                background: '#ffffff', color: '#000000',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: '#555', textTransform: 'uppercase', margin: 0 }}>Prefer to talk first?</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 22, fontWeight: 800, color: '#000000', margin: 0, lineHeight: 1.15 }}>Book a free 30-minute strategy call</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#555', margin: 0, lineHeight: 1.7 }}>
                  Get your website + chatbot + SEO roadmap — no pressure, no obligation.
                </p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600, color: '#000000', margin: '8px 0 0' }}>
                  Book a call →
                </p>
              </div>
            </a>
          </div>

          {/* ── RIGHT: form ── */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20, padding: '28px 26px',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <h3 style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 22, fontWeight: 800, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.15 }}>
              Send us a message
            </h3>

            {sent ? (
              <div style={{ padding: '20px 0' }}>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 15, color: '#4ade80', margin: '0 0 8px', fontWeight: 600 }}>
                  Message sent ✓
                </p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, lineHeight: 1.7 }}>
                  Thanks for reaching out — we&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 12,
                    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff', fontFamily: "'Archivo', sans-serif", fontSize: 14,
                    outline: 'none',
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 12,
                    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff', fontFamily: "'Archivo', sans-serif", fontSize: 14,
                    outline: 'none',
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your project…"
                  rows={4}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 12,
                    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff', fontFamily: "'Archivo', sans-serif", fontSize: 14,
                    outline: 'none', resize: 'vertical',
                  }}
                />
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: '16px', borderRadius: 12,
                    background: '#ffffff', color: '#000000',
                    fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
                    border: 'none', cursor: sending ? 'default' : 'pointer',
                    opacity: sending ? 0.6 : 1,
                  }}
                >
                  {sending ? 'Sending…' : 'Send message →'}
                </button>
                {error && (
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#f87171', margin: 0 }}>
                    Something went wrong — please email us at wasia2053@gmail.com instead.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
