import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

interface Project {
  id: number;
  tag: string;
  title: string;
  description: string;
  outcome: string;
  gradient: string;
  image: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    id: 2,
    tag: 'WEB + SEO',
    title: 'Pixiest Photography',
    description: 'SEO + development work for a Delaware-based photographer — service pages built around wedding, event, and drone photography search terms.',
    outcome: 'Service pages built around wedding, event, and drone photography search terms.',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    image: 'https://pixiestphotography.com/wp-content/uploads/2025/11/Event-Photography-in-Newark-Delaware.jpg',
    href: 'https://pixiestphotography.com/',
  },
  {
    id: 5,
    tag: 'WEB + SEO',
    title: 'The Bean Guys',
    description: 'SEO + development work for a mobile coffee cart and event catering brand serving the Dallas-Fort Worth area — booking flow and content across service and location pages.',
    outcome: 'Booking flow and content across service and location pages.',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a3a2a 50%, #0a2a1a 100%)',
    image: 'https://images.squarespace-cdn.com/content/v1/67ad5879262782591823fa86/c3ba25f8-9d5c-49b6-847a-46faa15ff257/Bean+Guys-9.jpg',
    href: 'https://www.thebeanguys.com/',
  },
  {
    id: 4,
    tag: 'WEB + SEO',
    title: 'DM Power Construction',
    description: 'SEO + development work for a Massachusetts home renovation contractor — project galleries, service pages, and local SEO for the Greater Boston area.',
    outcome: 'Project galleries, service pages, and local SEO for the Greater Boston area.',
    gradient: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
    image: 'https://www.dmpowerconstruction.com/wp-content/uploads/2025/07/IMG-20250714-WA0005.jpg',
    href: 'https://www.dmpowerconstruction.com/',
  },
  {
    id: 1,
    tag: 'WEB + SEO',
    title: 'Tainted Flesh Body Art',
    description: 'SEO + development work for a tattoo studio in Wilmington, DE — built to convert visitors into booked consultations.',
    outcome: 'Built to convert visitors into booked consultations.',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    image: 'https://taintedfleshbodyartnorth.com/wp-content/uploads/2026/05/Picture-for-how-it-works-section.jpg',
    href: 'https://taintedfleshbodyartnorth.com/',
  },
  {
    id: 6,
    tag: 'WEB + SEO',
    title: 'Estelles Lighting',
    description: 'SEO + development work for a lighting brand — product pages and site structure built for search visibility.',
    outcome: 'Product pages and site structure built for search visibility.',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3d1166 50%, #6b21a8 100%)',
    image: '/estelles-lighting.jpg',
    href: 'https://estelleslighting.com/',
  },
  {
    id: 3,
    tag: 'WEB + E-COMMERCE',
    title: 'Black Eden 420',
    description: 'E-commerce + SEO work for a licensed cannabis delivery service in California — product catalog, ordering flow, and location-based SEO across service areas.',
    outcome: 'Product catalog, ordering flow, and location-based SEO across service areas.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    image: 'https://blackeden420.com/wp-content/uploads/2025/11/Black-Eden.png',
    href: 'https://blackeden420.com/',
  },
];

type Filter = 'All' | 'Web + SEO' | 'E-commerce';

/**
 * Fantasy-style scroll parallax: the image drifts slower than the page
 * inside its card (useScroll + useTransform). This is the visible
 * scroll motion — the page is never static while scrolling.
 * Parallax lives on a wrapper div; the img keeps its own hover zoom.
 */
function ParallaxImage({ src, alt, gradient }: { src: string; alt: string; gradient: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 10', background: gradient }}>
      <motion.div style={{ y, position: 'absolute', inset: '-8% 0' }}>
        <img
          className="agx-pj-img"
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 45%)', pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', top: 16, left: 16,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(0,0,0,0.45)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 100, padding: '4px 10px',
        backdropFilter: 'blur(8px)',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)' }} />
        <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#d1fae5' }}>
          LIVE
        </span>
      </div>
    </div>
  );
}

const FILTERS: Filter[] = ['All', 'Web + SEO', 'E-commerce'];

function matchesFilter(p: Project, filter: Filter): boolean {
  if (filter === 'All') return true;
  if (filter === 'E-commerce') return p.tag === 'WEB + E-COMMERCE';
  return p.tag === 'WEB + SEO';
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = PROJECTS.filter((p) => matchesFilter(p, filter));

  return (
    <>
      <style>{`
        .agx-pj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; width: 100%; max-width: 1080px; }
        .agx-pj-card { transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease; }
        .agx-pj-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.22) !important; box-shadow: 0 24px 60px rgba(0,0,0,0.6); }
        .agx-pj-card:hover .agx-pj-img { transform: scale(1.05); }
        .agx-pj-img { transition: transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .agx-pj-filter { transition: background 200ms, color 200ms, border-color 200ms; }
        @media (max-width: 860px) {
          .agx-pj-grid { grid-template-columns: 1fr; max-width: 580px; }
        }
      `}</style>

      <section
        id="projects"
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
        {/* ── Static soft glow (no animation — Fantasy is calm) ── */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Header ── */}
        <Reveal style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.22em', color: '#555',
              textTransform: 'uppercase', margin: '0 0 14px',
            }}
          >
            Our Work
          </p>
          <h2 style={{
            fontFamily: "'Archivo', sans-serif",
            fontStretch: '75%',
            fontSize: 'clamp(36px,5vw,58px)',
            fontWeight: 800,
            color: '#ffffff', margin: '0 0 14px', lineHeight: 1.02, letterSpacing: '-0.02em',
          }}>
            Projects We&apos;ve Worked On
          </h2>
          <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 14, color: '#a3a3a3', margin: 0 }}>
            SEO + development work delivered for real clients — projects by AnaxDesign.
          </p>
        </Reveal>

        {/* ── Filter controls ── */}
        <Reveal style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }} role="group" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className="agx-pj-filter"
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: 13, fontWeight: 600,
                    color: active ? '#000000' : '#ffffff',
                    background: active ? '#ffffff' : 'rgba(255,255,255,0.04)',
                    border: active ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 100, padding: '10px 22px', cursor: 'pointer',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Grid ── */}
        <div className="agx-pj-grid" style={{ position: 'relative', zIndex: 1 }}>
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08} style={{ height: '100%' }}>
              <article
                className="agx-pj-card"
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: '#080808',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image — scroll parallax */}
                <ParallaxImage src={p.image} alt={`${p.title} website`} gradient={p.gradient} />

                {/* Content */}
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{
                    fontFamily: "'Archivo', sans-serif", fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.15em', color: '#a3a3a3',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 100, padding: '4px 14px',
                    alignSelf: 'flex-start',
                  }}>
                    {p.tag}
                  </span>
                  <h3 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontStretch: '75%',
                    fontSize: 24, fontWeight: 800, color: '#ffffff',
                    lineHeight: 1.1, margin: '16px 0 10px', letterSpacing: '-0.02em',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 13, color: '#c9c9d1', lineHeight: 1.8, margin: 0 }}>
                    {p.description}
                  </p>
                  <p style={{ fontFamily: "'Archivo', sans-serif", fontSize: 12, color: '#777', margin: '16px 0 0' }}>
                    Worked on — SEO + Development
                  </p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 'auto', paddingTop: 20,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: "'Archivo', sans-serif", fontSize: 13, fontWeight: 600,
                      color: '#ffffff', textDecoration: 'none',
                    }}
                  >
                    Visit Site ↗
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
