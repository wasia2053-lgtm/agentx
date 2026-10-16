import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: 'What does the bundle include?',
    a: 'A custom website, an AI chatbot trained on your business, and SEO setup — one team builds all three, so nothing gets lost between vendors.',
  },
  {
    q: 'How much does it cost?',
    a: 'Every project gets a fixed quote after a free strategy call — no hourly billing, no surprises. You approve the quote before any work starts.',
  },
  {
    q: 'How long does it take?',
    a: 'Most bundles launch in 2–4 weeks depending on scope. You get a clear timeline in your roadmap before we start.',
  },
  {
    q: 'What do you need from me?',
    a: 'A 30-minute call plus your logo and content if you have it — otherwise we create it. Most clients spend under an hour total getting started.',
  },
  {
    q: 'I already have a website — can you still help?',
    a: 'Yes. We can rebuild it, add a chatbot to it, or run SEO on it — or any combination. Your free call maps out the best next step for the site you already have.',
  },
  {
    q: 'Do you work with businesses outside Pakistan?',
    a: 'Yes — we work with clients internationally, and your free strategy call can be booked in a timezone that suits you.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
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
      <Reveal blur style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
          Questions
        </p>
        <h2 style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
          Frequently asked questions
        </h2>
        <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0 }}>
          Everything you need to know before booking your free call.
        </p>
      </Reveal>

      {/* Accordion */}
      <Reveal style={{ width: '100%', maxWidth: 760, position: 'relative', zIndex: 1 }}>
        <div>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  marginBottom: 12,
                  background: 'rgba(255,255,255,0.02)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`agx-faq-panel-${i}`}
                  id={`agx-faq-button-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    padding: '20px 24px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    fontFamily: "'Archivo', sans-serif", fontSize: 15, fontWeight: 600,
                    color: '#ffffff', textAlign: 'left',
                  }}
                >
                  {item.q}
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, fontSize: 20, fontWeight: 400, color: '#a3a3a3',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms ease',
                    }}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  id={`agx-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`agx-faq-button-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    fontFamily: "'Archivo', sans-serif", fontSize: 14,
                    color: '#c9c9d1', lineHeight: 1.8,
                    margin: 0, padding: '0 24px 20px',
                  }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
