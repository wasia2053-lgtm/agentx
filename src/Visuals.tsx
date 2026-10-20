import type { CSSProperties } from 'react';

/**
 * Reusable pure-SVG/CSS visuals — no binary images.
 * Every section gets a visual; no text-only cards.
 */

const FRAME: CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 12,
  overflow: 'hidden',
  position: 'relative',
};

export function BrowserMock({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, marginLeft: 8, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.06)' }} />
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 26, borderRadius: 6, background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)', opacity: 0.9 }} />
        <div style={{ height: 10, width: '70%', borderRadius: 5, background: 'rgba(255,255,255,0.14)' }} />
        <div style={{ height: 10, width: '45%', borderRadius: 5, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div style={{ height: 22, width: 64, borderRadius: 11, background: '#ffffff' }} />
          <div style={{ height: 22, width: 64, borderRadius: 11, border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  );
}

export function ChatMock({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', ...style }}>
      <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', fontSize: 11, color: '#c9c9d1', lineHeight: 1.5 }}>
        Do you deliver on Sundays?
      </div>
      <div style={{ alignSelf: 'flex-end', maxWidth: '80%', padding: '8px 12px', borderRadius: 12, background: '#ffffff', fontSize: 11, color: '#000', lineHeight: 1.5, fontWeight: 600 }}>
        Yes — we deliver 7 days a week. Want to book?
      </div>
      <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.07)' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a3a3a3' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a3a3a3' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a3a3a3' }} />
      </div>
    </div>
  );
}

export function ChartMock({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', padding: 12, ...style }}>
      <svg viewBox="0 0 260 110" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
          <line x1="0" y1="28" x2="260" y2="28" />
          <line x1="0" y1="55" x2="260" y2="55" />
          <line x1="0" y1="82" x2="260" y2="82" />
        </g>
        <g fill="rgba(255,255,255,0.14)">
          <rect x="18" y="62" width="26" height="40" rx="4" />
          <rect x="58" y="50" width="26" height="52" rx="4" />
          <rect x="98" y="42" width="26" height="60" rx="4" />
          <rect x="138" y="30" width="26" height="72" rx="4" />
          <rect x="178" y="22" width="26" height="80" rx="4" />
        </g>
        <polyline points="20,70 60,56 100,46 140,34 180,26 235,10" fill="none" stroke="#ff8a3d" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="235" cy="10" r="5" fill="#ff5ca8" />
      </svg>
    </div>
  );
}

export function WaveformMock({ style }: { style?: CSSProperties }) {
  const heights = [22, 38, 58, 34, 72, 48, 88, 60, 40, 76, 52, 30, 66, 44, 26, 54, 36, 20];
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '0 16px', ...style }}>
      {heights.map((h, i) => (
        <span key={i} style={{ width: 4, height: `${h}%`, borderRadius: 2, background: i % 3 === 0 ? '#8b5cff' : i % 3 === 1 ? '#ff5ca8' : '#ff8a3d', opacity: 0.85 }} />
      ))}
    </div>
  );
}

export function FlowMock({ style }: { style?: CSSProperties }) {
  const node = (active?: boolean): CSSProperties => ({
    padding: '8px 12px',
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 600,
    color: active ? '#000' : '#fff',
    background: active ? '#ffffff' : 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    whiteSpace: 'nowrap',
  });
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 10px', ...style }}>
      <span style={node()}>New lead</span>
      <span style={{ color: '#ff8a3d', fontSize: 14 }}>→</span>
      <span style={node()}>AI replies</span>
      <span style={{ color: '#ff8a3d', fontSize: 14 }}>→</span>
      <span style={node(true)}>Booked ✓</span>
    </div>
  );
}

export function PaletteMock({ style }: { style?: CSSProperties }) {
  const swatches = ['#ff5ca8', '#ff8a3d', '#8b5cff', '#ffffff', '#1a1a1a'];
  return (
    <div style={{ ...FRAME, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, padding: '0 16px', ...style }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {swatches.map((c) => (
          <span key={c} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.2)' }} />
        ))}
      </div>
      <div style={{ height: 16, width: '55%', borderRadius: 4, background: 'rgba(255,255,255,0.85)' }} />
      <div style={{ height: 9, width: '80%', borderRadius: 4, background: 'rgba(255,255,255,0.14)' }} />
      <div style={{ height: 9, width: '60%', borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
    </div>
  );
}

export function AboutVisual({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ ...FRAME, background: '#050505', border: '1px solid rgba(255,255,255,0.08)', minHeight: 220, ...style }}>
      <svg viewBox="0 0 600 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="agx-av-orb" cx="38%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#ff5ca8" stopOpacity="0.55" />
            <stop offset="38%" stopColor="#ff8a3d" stopOpacity="0.35" />
            <stop offset="68%" stopColor="#8b5cff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
          <line x1="0" y1="55" x2="600" y2="55" />
          <line x1="0" y1="110" x2="600" y2="110" />
          <line x1="0" y1="165" x2="600" y2="165" />
          <line x1="150" y1="0" x2="150" y2="220" />
          <line x1="300" y1="0" x2="300" y2="220" />
          <line x1="450" y1="0" x2="450" y2="220" />
        </g>
        <ellipse cx="300" cy="110" rx="210" ry="120" fill="url(#agx-av-orb)" />
        <circle cx="300" cy="110" r="86" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="300" cy="110" r="52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <circle cx="300" cy="110" r="6" fill="#ffffff" />
        <rect x="72" y="52" width="92" height="18" rx="9" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
        <rect x="438" y="150" width="92" height="18" rx="9" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
      </svg>
    </div>
  );
}
