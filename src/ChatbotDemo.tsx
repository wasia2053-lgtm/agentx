import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';

type Role = 'bot' | 'user';

interface Message {
  role: Role;
  text: string;
}

interface Chip {
  id: string;
  label: string;
  reply: string;
}

const CHIPS: Chip[] = [
  {
    id: 'build',
    label: 'What does AgentX build?',
    reply: 'Websites, AI chatbots, and SEO — one bundle, one team, done for you.',
  },
  {
    id: 'cost',
    label: 'How much does it cost?',
    reply: 'Every project gets a fixed quote after a free strategy call — no hourly billing, no surprises.',
  },
  {
    id: 'start',
    label: 'How fast can we start?',
    reply: 'Most bundles kick off within a week of your free strategy call.',
  },
];

const GREETING = "Hi! I'm the AgentX assistant. Ask me what we build, what it costs, or how fast we can start.";

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const handleChip = (chip: Chip) => {
    if (typing) return;
    setMessages((m) => [...m, { role: 'user', text: chip.label }]);
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: chip.reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <style>{`
        @keyframes agxTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .agx-typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a3a3a3; display: inline-block;
          animation: agxTypingBounce 1.2s ease-in-out infinite;
        }
        .agx-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .agx-typing-dot:nth-child(3) { animation-delay: 0.3s; }
        .agx-demo-chip { transition: background 200ms, border-color 200ms, opacity 200ms; }
        .agx-demo-chip:hover:not(:disabled) { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.30); }
        .agx-demo-chip:disabled { opacity: 0.5; cursor: default; }
      `}</style>

      <section
        id="demo"
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
        <Reveal style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
            Live Demo
          </p>
          <h2 style={{ fontFamily: "'Archivo', sans-serif", fontStretch: '75%', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 800, color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
            Try the chatbot
          </h2>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0, maxWidth: 540, lineHeight: 1.8 }}>
            This is how an AgentX chatbot answers your customers — instantly, day and night.
          </p>
        </Reveal>

        {/* Chat window */}
        <Reveal style={{ width: '100%', maxWidth: 640, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '100%',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 20, overflow: 'hidden',
            background: '#080808',
            boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
          }}>
            {/* Chat header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 700 }}>A</span>
              <div>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>AgentX Assistant</p>
                <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 11, color: '#4ade80', margin: 0 }}>● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ height: 320, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end',
                    maxWidth: '82%',
                    padding: '12px 16px',
                    borderRadius: 16,
                    background: msg.role === 'bot' ? 'rgba(255,255,255,0.06)' : '#ffffff',
                    border: msg.role === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    color: msg.role === 'bot' ? '#ffffff' : '#000000',
                    fontFamily: "'Archivo', sans-serif", fontSize: 14, lineHeight: 1.6,
                  }}
                >
                  {msg.text}
                </div>
              ))}
              {typing && (
                <div style={{
                  alignSelf: 'flex-start',
                  padding: '14px 18px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  <span className="agx-typing-dot" />
                  <span className="agx-typing-dot" />
                  <span className="agx-typing-dot" />
                </div>
              )}
            </div>

            {/* Question chips */}
            <div style={{ padding: '16px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className="agx-demo-chip"
                  disabled={typing}
                  onClick={() => handleChip(chip)}
                  style={{
                    fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 500,
                    color: '#ffffff', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 100, padding: '10px 18px', cursor: 'pointer',
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Caption + CTA */}
        <Reveal>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#777', margin: '16px 0 0', textAlign: 'center' }}>
            Demo — scripted preview of how an AgentX chatbot answers.
          </p>
          <div style={{ textAlign: 'center' }}>
            <a
              href="https://calendly.com/wasia2053/30min"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 28,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 100,
                background: '#ffffff', color: '#000000',
                fontFamily: "'Archivo', sans-serif", fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Get one for your business → Book a free call
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
