import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.agx-ft-curtain {
  position: relative;
  width: 100%;
  height: 100vh;
}

.agx-ft-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background: #000000;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes agxFtBreathe {
  0%   { transform: translate(-50%, -50%) scale(1);    opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12);  opacity: 1; }
}
@keyframes agxFtMarquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes agxFtHeartbeat {
  0%, 100% { transform: scale(1); }
  15%, 45% { transform: scale(1.22); }
  30%      { transform: scale(1); }
}

.agx-ft-aurora {
  position: absolute;
  top: 50%; left: 50%;
  width: 80vw; height: 60vh;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, transparent 75%);
  animation: agxFtBreathe 8s ease-in-out infinite alternate;
}

.agx-ft-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.agx-ft-giant-text {
  position: absolute;
  bottom: -5vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  font-family: 'FreshChunky', sans-serif;
  font-size: min(24vw, 260px);
  line-height: 0.75;
  letter-spacing: -0.01em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.agx-ft-marquee-wrap {
  position: absolute;
  top: 56px;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(10px);
  padding: 16px 0;
  z-index: 1;
  transform: rotate(-2deg) scale(1.1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.agx-ft-marquee-track {
  display: flex;
  width: max-content;
  animation: agxFtMarquee 40s linear infinite;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #777;
}
.agx-ft-marquee-row { display: flex; align-items: center; gap: 3rem; padding: 0 1.5rem; }
.agx-ft-dot { color: rgba(255,255,255,0.3); }

.agx-ft-center {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 24px;
  margin-top: 90px;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.agx-ft-heading {
  font-family: 'FreshChunky', sans-serif;
  font-size: clamp(32px, 6.5vw, 82px);
  line-height: 1.03;
  margin: 0 0 44px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.12));
}

.agx-ft-links { display: flex; flex-direction: column; align-items: center; gap: 22px; width: 100%; }
.agx-ft-cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; width: 100%; }
.agx-ft-secondary-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; width: 100%; margin-top: 6px; }

.agx-ft-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.8);
  backdrop-filter: blur(16px);
  color: #ffffff;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s, color 0.4s;
}
.agx-ft-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2);
}
.agx-ft-pill-primary { padding: 18px 34px; border-radius: 100px; font-weight: 700; font-size: 14px; }
.agx-ft-pill-sm { padding: 12px 22px; border-radius: 100px; font-weight: 500; font-size: 12px; color: #999; }
.agx-ft-pill-sm:hover { color: #ffffff; }

.agx-ft-bottom {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.agx-ft-copy {
  font-family: 'Inter', sans-serif;
  font-size: 10px; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; color: #555;
  order: 2;
}
.agx-ft-credit {
  padding: 12px 20px; border-radius: 100px;
  display: flex; align-items: center; gap: 8px;
  cursor: default; order: 1;
}
.agx-ft-credit span {
  font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase; color: #777;
}
.agx-ft-brand { color: #ffffff !important; }
.agx-ft-heart { color: #ef4444; font-size: 14px; animation: agxFtHeartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }
.agx-ft-top-btn {
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #999; order: 3;
}
.agx-ft-top-btn:hover { color: #ffffff; }

@media (min-width: 768px) {
  .agx-ft-bottom { flex-direction: row; justify-content: space-between; }
  .agx-ft-copy    { order: 1; }
  .agx-ft-credit  { order: 2; }
  .agx-ft-top-btn { order: 3; }
}
`;

const MARQUEE_ITEMS = [
    'AI Automation',
    'Custom Chatbots',
    'Voice Agents',
    'Web Development',
    'SEO That Ranks',
    'Bold Design',
];

function MarqueeRow() {
    return (
        <div className="agx-ft-marquee-row">
            {MARQUEE_ITEMS.map((item) => (
                <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    {item}
                    <span className="agx-ft-dot">✦</span>
                </span>
            ))}
        </div>
    );
}

export default function Footer() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const giantTextRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                giantTextRef.current,
                { y: '10vh', scale: 0.8, opacity: 0 },
                {
                    y: '0vh', scale: 1, opacity: 1, ease: 'power1.out',
                    scrollTrigger: { trigger: wrapperRef.current, start: 'top 80%', end: 'bottom bottom', scrub: 1 },
                }
            );

            gsap.fromTo(
                [headingRef.current, linksRef.current],
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: wrapperRef.current, start: 'top 40%', end: 'bottom bottom', scrub: 1 },
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <style>{STYLES}</style>

            {/* Curtain-reveal wrapper: footer stays fixed underneath, clipped to this box */}
            <div
                ref={wrapperRef}
                className="agx-ft-curtain"
                style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
            >
                <footer className="agx-ft-footer">
                    <div className="agx-ft-aurora" />
                    <div className="agx-ft-grid" />
                    <div ref={giantTextRef} className="agx-ft-giant-text">AGENTX</div>

                    <div className="agx-ft-marquee-wrap">
                        <div className="agx-ft-marquee-track">
                            <MarqueeRow />
                            <MarqueeRow />
                        </div>
                    </div>

                    <div className="agx-ft-center">
                        <h2 ref={headingRef} className="agx-ft-heading">Ready to start your project?</h2>

                        <div ref={linksRef} className="agx-ft-links">
                            <div className="agx-ft-cta-row">
                                <MagneticButton as="a" href="#contact" className="agx-ft-pill agx-ft-pill-primary">
                                    Book a Call <ArrowUpRight size={16} />
                                </MagneticButton>
                                <MagneticButton as="a" href="#projects" className="agx-ft-pill agx-ft-pill-primary">
                                    View Our Work <ArrowUpRight size={16} />
                                </MagneticButton>
                            </div>

                            <div className="agx-ft-secondary-row">
                                <MagneticButton as="a" href="#" className="agx-ft-pill agx-ft-pill-sm">Privacy Policy</MagneticButton>
                                <MagneticButton as="a" href="#" className="agx-ft-pill agx-ft-pill-sm">Terms of Service</MagneticButton>
                                <MagneticButton as="a" href="#contact" className="agx-ft-pill agx-ft-pill-sm">Support</MagneticButton>
                            </div>
                        </div>
                    </div>

                    <div className="agx-ft-bottom">
                        <div className="agx-ft-copy">© 2026 AgentX. All rights reserved.</div>

                        <div className="agx-ft-pill agx-ft-credit">
                            <span>Crafted with</span>
                            <span className="agx-ft-heart">❤</span>
                            <span>by</span>
                            <span className="agx-ft-brand">AgentX</span>
                        </div>

                        <MagneticButton
                            as="button"
                            onClick={scrollToTop}
                            className="agx-ft-pill agx-ft-top-btn"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={18} />
                        </MagneticButton>
                    </div>
                </footer>
            </div>
        </>
    );
}