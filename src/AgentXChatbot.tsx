/**
 * AgentXChatbot — the REAL AgentX chatbot.
 * Drop-in replacement for the scripted ChatbotDemo section:
 *   in App.tsx:  import AgentXChatbot from './AgentXChatbot';
 *                <ChatbotDemo />  ->  <AgentXChatbot />
 *
 * Free-text input, intent matching from chatbotKnowledge.ts, graded
 * fallback that always ends with real contact details — so the bot
 * never gets stuck and never guesses.
 */
import { useEffect, useRef, useState } from 'react';
import { getReply } from './chatbotEngine';
import { CONTACT, STARTER_CHIPS } from './chatbotKnowledge';

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
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline text-[#ff5ca8]">
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="underline text-[#ff5ca8]">
          {part}
        </a>
      );
    }
    if (/^\+92/.test(part)) {
      return (
        <a key={i} href={`tel:${part.replace(/\s/g, '')}`} className="underline text-[#ff5ca8]">
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function AgentXChatbot() {
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

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

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
    <section id="chatbot-demo" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#ff5ca8] uppercase">Live demo</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Talk to our AI assistant.
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          This is a live preview of the chatbots we build — ask anything about AgentX,
          and it answers instantly. No waiting, no missed leads.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900/80 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#ff5ca8] via-[#ff8a3d] to-[#a855f7] text-base font-black text-white">
            A
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">AgentX Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online — replies instantly
            </p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-[380px] space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                  m.role === 'user'
                    ? 'rounded-br-md bg-gradient-to-r from-[#ff5ca8] via-[#ff8a3d] to-[#a855f7] text-white'
                    : 'rounded-bl-md border border-white/10 bg-zinc-900 text-zinc-200'
                }`}
              >
                {m.role === 'bot' ? linkify(m.text) : m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-zinc-900 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick chips */}
        {chips.length > 0 && !typing && (
          <div className="flex flex-wrap gap-2 px-5 pb-4">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => send(chip)}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#ff5ca8] hover:via-[#ff8a3d] hover:to-[#a855f7] hover:text-white"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 border-t border-white/10 bg-zinc-900/80 px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about AgentX…"
            className="flex-1 rounded-full border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5ca8] focus:outline-none"
          />
          <button
            type="submit"
            disabled={typing}
            className="rounded-full bg-gradient-to-r from-[#ff5ca8] via-[#ff8a3d] to-[#a855f7] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ff5ca8]/30 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <a
          href={CONTACT.calendly}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-gradient-to-r hover:from-[#ff5ca8] hover:via-[#ff8a3d] hover:to-[#a855f7] hover:text-white hover:shadow-lg hover:shadow-[#ff5ca8]/30"
        >
          Book your free strategy call →
        </a>
        <p className="mt-3 text-sm text-zinc-500">
          Prefer email? {CONTACT.email} · Phone/WhatsApp {CONTACT.phone}
        </p>
      </div>
    </section>
  );
}
