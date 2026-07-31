import { useState } from 'react';
import FloatingPaths from './FloatingPaths';

const INFO = [
    { label: 'Email', value: 'hello@agentx.com' },
    { label: 'Phone', value: '+92 300 0000000' },
    { label: 'Location', value: 'Karachi, Pakistan' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire this up to your backend / email service (e.g. Formspree, EmailJS, or a custom API route)
        console.log('Contact form submitted:', form);
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .agx-ct-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #ffffff;
          outline: none;
          transition: border-color 200ms, background 200ms;
        }
        .agx-ct-input::placeholder { color: #555; }
        .agx-ct-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }
        .agx-ct-submit {
          width: 100%;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 10px;
          padding: 14px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: opacity 200ms, transform 200ms;
        }
        .agx-ct-submit:hover { opacity: 0.85; transform: translateY(-2px); }
        .agx-ct-submit:active { transform: translateY(0); }
      `}</style>

            <section
                id="contact"
                style={{
                    background: '#000000',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '120px 24px 130px',
                }}
            >
                <FloatingPaths position={1} opacity={0.4} />

                {/* ── Header ── */}
                <div style={{ textAlign: 'center', marginBottom: 72, position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
                        Get In Touch
                    </p>
                    <h2 style={{ fontFamily: "'FreshChunky',sans-serif", fontSize: 'clamp(36px,5vw,58px)', color: '#ffffff', margin: '0 0 14px', lineHeight: 1.05 }}>
                        Contact Us
                    </h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#555', margin: 0 }}>
                        Have a project in mind? Let's build it together.
                    </p>
                </div>

                {/* ── Content grid ── */}
                <div
                    style={{
                        position: 'relative', zIndex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'minmax(220px, 340px) minmax(280px, 480px)',
                        gap: 48,
                        justifyContent: 'center',
                        maxWidth: 920,
                        margin: '0 auto',
                    }}
                >
                    {/* Info panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                        {INFO.map((i) => (
                            <div key={i.label}>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase', margin: '0 0 6px' }}>
                                    {i.label}
                                </p>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: '#fff', margin: 0 }}>
                                    {i.value}
                                </p>
                            </div>
                        ))}
                        <div style={{ width: 36, height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginTop: 8 }} />
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#a3a3a3', lineHeight: 1.8, margin: 0 }}>
                            We usually reply within 24 hours. For urgent inquiries, reach out directly via email or phone.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex', flexDirection: 'column', gap: 14,
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 18,
                            padding: 28,
                            background: 'rgba(255,255,255,0.02)',
                        }}
                    >
                        <input
                            className="agx-ct-input"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="agx-ct-input"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="agx-ct-input"
                            name="message"
                            placeholder="Tell us about your project..."
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            required
                            style={{ resize: 'vertical', fontFamily: "'Inter',sans-serif" }}
                        />
                        <button className="agx-ct-submit" type="submit">
                            {sent ? 'Message Sent ✓' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}   