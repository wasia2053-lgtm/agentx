import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GLSLHills from './GLSLHills';

const SQRT_5000 = Math.sqrt(5000);

interface Testimonial {
    tempId: number;
    testimonial: string;
    by: string;
    imgSrc: string;
}

const TESTIMONIALS: Testimonial[] = [
    { tempId: 0, testimonial: "My favorite solution in the market. We work 5x faster with AgentX.", by: "Alex, CEO at TechCorp", imgSrc: "https://i.pravatar.cc/150?img=1" },
    { tempId: 1, testimonial: "I'm confident my data is safe with AgentX. I can't say that about other providers.", by: "Dan, CTO at SecureNet", imgSrc: "https://i.pravatar.cc/150?img=2" },
    { tempId: 2, testimonial: "I know it's cliche, but we were lost before we found AgentX. Can't thank you guys enough!", by: "Stephanie, COO at InnovateCo", imgSrc: "https://i.pravatar.cc/150?img=3" },
    { tempId: 3, testimonial: "AgentX's automation makes planning for the future seamless. Can't recommend them enough!", by: "Marie, CFO at FuturePlanning", imgSrc: "https://i.pravatar.cc/150?img=4" },
    { tempId: 4, testimonial: "If I could give 11 stars, I'd give 12.", by: "Andre, Head of Design at CreativeSolutions", imgSrc: "https://i.pravatar.cc/150?img=5" },
    { tempId: 5, testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.", by: "Jeremy, Product Manager at TimeWise", imgSrc: "https://i.pravatar.cc/150?img=6" },
    { tempId: 6, testimonial: "Took some convincing, but now that we're on AgentX, we're never going back.", by: "Pam, Marketing Director at BrandBuilders", imgSrc: "https://i.pravatar.cc/150?img=7" },
    { tempId: 7, testimonial: "I would be lost without AgentX's chatbots. The ROI is EASILY 100X for us.", by: "Daniel, Data Scientist at AnalyticsPro", imgSrc: "https://i.pravatar.cc/150?img=8" },
    { tempId: 8, testimonial: "It's just the best. Period.", by: "Fernando, UX Designer at UserFirst", imgSrc: "https://i.pravatar.cc/150?img=9" },
    { tempId: 9, testimonial: "I switched agencies and never looked back.", by: "Andy, DevOps Engineer at CloudMasters", imgSrc: "https://i.pravatar.cc/150?img=10" },
];

interface TestimonialCardProps {
    position: number;
    testimonial: Testimonial;
    handleMove: (steps: number) => void;
    cardSize: number;
}

function TestimonialCard({ position, testimonial, handleMove, cardSize }: TestimonialCardProps) {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => handleMove(position)}
            className="agx-ts-card"
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                cursor: 'pointer',
                padding: 32,
                width: cardSize,
                height: cardSize,
                boxSizing: 'border-box',
                border: `2px solid ${isCenter ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)'}`,
                background: isCenter ? '#ffffff' : 'rgba(10,10,10,0.75)',
                backdropFilter: 'blur(6px)',
                color: isCenter ? '#000000' : '#ffffff',
                zIndex: isCenter ? 10 : 1,
                clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
                transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter ? '0px 8px 0px 4px rgba(255,255,255,0.15)' : 'none',
                transition: 'all 500ms ease-in-out',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    display: 'block',
                    transformOrigin: 'top right',
                    transform: 'rotate(45deg)',
                    background: isCenter ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 2,
                }}
            />
            <img
                src={testimonial.imgSrc}
                alt={testimonial.by.split(',')[0]}
                style={{
                    marginBottom: 16,
                    height: 56,
                    width: 48,
                    objectFit: 'cover',
                    objectPosition: 'top',
                    background: 'rgba(255,255,255,0.1)',
                    boxShadow: `3px 3px 0px ${isCenter ? '#ffffff' : '#000000'}`,
                }}
            />
            <h3
                style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 'clamp(15px,1.6vw,19px)',
                    fontWeight: 500,
                    lineHeight: 1.45,
                    margin: 0,
                    color: isCenter ? '#000000' : '#ffffff',
                }}
            >
                "{testimonial.testimonial}"
            </h3>
            <p
                style={{
                    position: 'absolute',
                    bottom: 32,
                    left: 32,
                    right: 32,
                    marginTop: 8,
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 13,
                    fontStyle: 'italic',
                    color: isCenter ? 'rgba(0,0,0,0.65)' : '#a3a3a3',
                }}
            >
                - {testimonial.by}
            </p>
        </div>
    );
}

export default function Testimonials() {
    const [cardSize, setCardSize] = useState(365);
    const [sectionH, setSectionH] = useState(600);
    const [list, setList] = useState(TESTIMONIALS);

    const handleMove = (steps: number) => {
        const newList = [...list];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setList(newList);
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia('(min-width: 640px)');
            setCardSize(matches ? 365 : 260);
            setSectionH(matches ? 600 : 520);
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .agx-ts-card:hover { border-color: rgba(255,255,255,0.4) !important; }
        .agx-ts-btn {
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          color: #ffffff;
          cursor: pointer;
          transition: background 200ms, border-color 200ms, transform 200ms;
        }
        .agx-ts-btn:hover { background: #ffffff; color: #000000; border-color: #ffffff; transform: translateY(-2px); }
      `}</style>

            <section
                id="testimonials"
                style={{
                    position: 'relative',
                    background: '#000000',
                    overflow: 'hidden',
                    padding: '120px 24px 90px',
                }}
            >
                {/* ── Header ── */}
                <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 2 }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: '#555', textTransform: 'uppercase', margin: '0 0 14px' }}>
                        What Clients Say
                    </p>
                    <h2 style={{ fontFamily: "'FreshChunky',sans-serif", fontSize: 'clamp(36px,5vw,58px)', color: '#ffffff', margin: '0 0 14px', lineHeight: 1.05 }}>
                        Testimonials
                    </h2>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#555', margin: 0 }}>
                        Real results, from real businesses we've worked with
                    </p>
                </div>

                {/* ── Stage: GLSL hills bg + stagger cards ── */}
                <div style={{ position: 'relative', width: '100%', height: sectionH }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8 }}>
                        <GLSLHills width="100%" height="100%" cameraZ={125} planeSize={256} speed={0.5} />
                    </div>

                    {/* fade edges into black so hills blend with the rest of the page */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, #000 0%, transparent 18%, transparent 82%, #000 100%)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
                        {list.map((t, index) => {
                            const position = list.length % 2
                                ? index - (list.length + 1) / 2
                                : index - list.length / 2;
                            return (
                                <TestimonialCard
                                    key={t.tempId}
                                    testimonial={t}
                                    handleMove={handleMove}
                                    position={position}
                                    cardSize={cardSize}
                                />
                            );
                        })}

                        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
                            <button className="agx-ts-btn" onClick={() => handleMove(-1)} aria-label="Previous testimonial">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="agx-ts-btn" onClick={() => handleMove(1)} aria-label="Next testimonial">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}