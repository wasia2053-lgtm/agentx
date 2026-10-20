/**
 * AgentXChatWidget — the REAL AgentX chatbot as a floating widget.
 *
 * Standard chat-widget behaviour: a bubble pinned to the bottom-right
 * corner; click it and the chat panel opens. Uses the same engine +
 * knowledge base as the section version (chatbotEngine.ts /
 * chatbotKnowledge.ts), so it answers every query and never gets stuck.
 *
 * IMPORTANT — styling: this project has NO Tailwind. Styles live in the
 * <style> block below (same pattern as ChatbotDemo / Footer). Do NOT
 * rewrite this component with Tailwind utility classes — they are not
 * defined anywhere and the widget would render unstyled.
 *
 * Usage in App.tsx:  import AgentXChatWidget from './AgentXChatWidget';
 *                     <AgentXChatWidget />   (once, near the end of App)
 */
import { useEffect, useRef, useState } from 'react';
import { getReply } from './chatbotEngine';
import { STARTER_CHIPS } from './chatbotKnowledge';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

/** Render URLs / emails / phone numbers inside bot text as clickable links. */
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+|\+92\s?\d{3}\s?\d{7})/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer" style={{ color: '#ff5ca8', textDecoration: 'underline' }}>
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} style={{ color: '#ff5ca8', textDecoration: 'underline' }}>
          {part}
        </a>
      );
    }
    if (/^\+92/.test(part)) {
      return (
        <a key={i} href={`tel:${part.replace(/\s/g, '')}`} style={{ color: '#ff5ca8', textDecoration: 'underline' }}>
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const FONT = "'Archivo', sans-serif";
const GRADIENT = 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)';

export default function AgentXChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi! I'm the AgentX assistant. I can tell you what we build, what it costs, how fast we start, and show you our work — or book you a free strategy call. What would you like to know?",
    },
  ]);
  const [chips, setChips] = useState<string[]>(STARTER_CHIPS);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [misses, setMisses] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setChips([]);
    setTyping(true);
    timerRef.current = setTimeout(() => {
      const reply = getReply(text, misses);
      setMisses(reply.kind === 'fallback' ? misses + 1 : 0);
      setMessages((m) => [...m, { role: 'bot', text: reply.text }]);
      setChips(reply.chips);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <style>{`
        @keyframes agxChatPanelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes agxChatMsgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes agxChatTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .agx-chat-bubble {
          position: fixed; right: 20px; bottom: 20px; z-index: 10000;
          width: 60px; height: 60px; border-radius: 50%;
          background: ${GRADIENT};
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 32px rgba(255, 92, 168, 0.45), 0 4px 12px rgba(0,0,0,0.5);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .agx-chat-bubble:hover { transform: scale(1.08) translateY(-2px); box-shadow: 0 18px 40px rgba(255, 92, 168, 0.55), 0 6px 16px rgba(0,0,0,0.5); }
        .agx-chat-panel { animation: agxChatPanelIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .agx-chat-msg { animation: agxChatMsgIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .agx-chat-chip {
          border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05);
          color: #e4e4e7; border-radius: 999px; padding: 6px 12px;
          font-family: ${FONT}; font-size: 12px; font-weight: 500; cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .agx-chat-chip:hover { background: ${GRADIENT}; border-color: transparent; color: #fff; transform: translateY(-1px); }
        .agx-chat-send {
          background: ${GRADIENT}; color: #fff; border: none; border-radius: 999px;
          padding: 10px 18px; font-family: ${FONT}; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
          white-space: nowrap;
        }
        .agx-chat-send:hover:not(:disabled) { transform: scale(1.05); box-shadow: 0 8px 24px rgba(255,92,168,0.4); }
        .agx-chat-send:disabled { opacity: 0.5; cursor: default; }
        .agx-chat-input {
          flex: 1; background: #000; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px; padding: 10px 16px; color: #fff;
          font-family: ${FONT}; font-size: 13px; outline: none;
          transition: border-color 0.3s ease;
        }
        .agx-chat-input:focus { border-color: #ff5ca8; }
        .agx-chat-input::placeholder { color: #71717a; }
        .agx-chat-close {
          background: transparent; border: none; color: #a3a3a3; cursor: pointer;
          font-size: 20px; line-height: 1; padding: 4px 6px; border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .agx-chat-close:hover { color: #fff; background: rgba(255,255,255,0.08); }
      `}</style>

      {/* Floating bubble — bottom-right corner */}
      <button
        type="button"
        className="agx-chat-bubble"
        aria-label={open ? 'Close chat' : 'Open AgentX chat'}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <span style={{ color: '#fff', fontSize: 24, lineHeight: 1 }}>×</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5C21 16.19 16.97 20 12 20C10.6 20 9.27 19.73 8.07 19.23L3 21L4.7 16.5C3.63 15.28 3 13.68 3 11.5C3 6.81 7.03 3 12 3C16.97 3 21 6.81 21 11.5Z"
              fill="#ffffff"
            />
            <circle cx="8.2" cy="11.5" r="1.3" fill="#ff5ca8" />
            <circle cx="12" cy="11.5" r="1.3" fill="#ff8a3d" />
            <circle cx="15.8" cy="11.5" r="1.3" fill="#8b5cff" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="agx-chat-panel"
          role="dialog"
          aria-label="AgentX chat"
          style={{
            position: 'fixed', right: 20, bottom: 92, zIndex: 10000,
            width: 'min(380px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 140px))',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)',
            background: '#050505',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.4)',
            fontFamily: FONT,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: GRADIENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
              A
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: 0 }}>AgentX Assistant</p>
              <p style={{ color: '#a3a3a3', fontSize: 11, margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                Online — replies instantly
              </p>
            </div>
            <button type="button" className="agx-chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} className="agx-chat-msg" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '85%', borderRadius: 16,
                    borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                    borderBottomLeftRadius: m.role === 'user' ? 16 : 4,
                    padding: '10px 14px', fontSize: 14, lineHeight: 1.55,
                    background: m.role === 'user' ? GRADIENT : '#141414',
                    border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    color: m.role === 'user' ? '#fff' : '#e4e4e7',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.role === 'bot' ? linkify(m.text) : m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="agx-chat-msg" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, borderRadius: 16, borderBottomLeftRadius: 4, padding: '12px 14px', background: '#141414', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a3a3a3', display: 'inline-block', animation: `agxChatTyping 1.2s ease-in-out ${d * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick chips */}
          {chips.length > 0 && !typing && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 16px 12px' }}>
              {chips.map((chip) => (
                <button key={chip} type="button" className="agx-chat-chip" onClick={() => send(chip)}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, borderTop: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about AgentX…"
              className="agx-chat-input"
            />
            <button type="submit" className="agx-chat-send" disabled={typing}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
