import DottedSurface from './DottedSurface';

interface TeamMember {
    name: string;
    role: string;
    initials: string;
}

const TEAM: TeamMember[] = [
    { name: 'Wasi Ahmed', role: 'Founder & Lead Developer', initials: 'WA' },
    { name: 'Team Member', role: 'AI & Automation Lead', initials: 'AI' },
    { name: 'Team Member', role: 'Design Lead', initials: 'GD' },
    { name: 'Team Member', role: 'Growth & SEO', initials: 'SE' },
];

const VALUES = [
    { num: '01', title: 'Innovation First', desc: 'We chase what\u2019s next, not what\u2019s comfortable \u2014 modern stacks, modern results.' },
    { num: '02', title: 'Built To Scale', desc: 'Every system we ship is engineered to grow with your business, not against it.' },
    { num: '03', title: 'Client Obsessed', desc: 'Your goals set the roadmap. We measure success by your outcomes, not our output.' },
];

export default function About() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .agx-ab-card { transition: transform 300ms ease, border-color 300ms ease, background 300ms ease; }
        .agx-ab-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.04); }
        .agx-ab-avatar { transition: transform 300ms ease, box-shadow 300ms ease; }
        .agx-ab-card:hover .agx-ab-avatar { transform: scale(1.06); box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 20px 40px rgba(0,0,0,0.6); }
      `}</style>

            <section
                id="about"
                style={{
                    background: '#050505',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '120px 24px 110px',
                }}
            >
                <DottedSurface />

                {/* ── Header ── */}
                <div style={{ textAlign: 'center', marginBottom: 72, position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
                        Who We Are
                    </p>
                    <h2 style={{ fontFamily: "'FreshChunky',sans-serif", fontSize: 'clamp(36px,5vw,58px)', color: '#ffffff', margin: '0 0 18px', lineHeight: 1.05 }}>
                        About AgentX
                    </h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#a3a3a3', margin: '0 auto', maxWidth: 560, lineHeight: 1.8 }}>
                        We're a full-stack digital agency building AI automation, chatbots, voice agents, websites, and
                        brand identities for businesses that refuse to stand still.
                    </p>
                </div>

                {/* ── Values ── */}
                <div
                    style={{
                        position: 'relative', zIndex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 20,
                        maxWidth: 980, margin: '0 auto 90px',
                    }}
                >
                    {VALUES.map((v) => (
                        <div
                            key={v.num}
                            className="agx-ab-card"
                            style={{
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16,
                                padding: '28px 24px',
                                background: 'rgba(255,255,255,0.02)',
                            }}
                        >
                            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#484848', letterSpacing: '0.06em' }}>
                                {v.num}
                            </span>
                            <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', margin: '14px 0 8px' }}>
                                {v.title}
                            </h3>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#a3a3a3', lineHeight: 1.7, margin: 0 }}>
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Team ── */}
                <p style={{ textAlign: 'center', fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 36px', position: 'relative', zIndex: 1 }}>
                    The Team
                </p>
                <div
                    style={{
                        position: 'relative', zIndex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 20,
                        maxWidth: 980, margin: '0 auto',
                    }}
                >
                    {TEAM.map((m) => (
                        <div
                            key={m.name + m.role}
                            className="agx-ab-card"
                            style={{
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16,
                                padding: '30px 20px',
                                textAlign: 'center',
                                background: 'rgba(255,255,255,0.02)',
                            }}
                        >
                            <div
                                className="agx-ab-avatar"
                                style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    margin: '0 auto 16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff',
                                }}
                            >
                                {m.initials}
                            </div>
                            <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
                                {m.name}
                            </h4>
                            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: '#777', margin: 0 }}>
                                {m.role}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}   