/**
 * AgentX wordmark logo, built from the Archivo font (Fantasy-style:
 * a clean condensed wordmark, no icon file needed).
 * "AGENT" in white + "X" in the pink->orange->purple gradient,
 * with a small gradient dot. Used in the navbar, loader and footer.
 */
export default function Logo({ size = 22, withDot = true }: { size?: number; withDot?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}>
      {withDot && (
        <span
          aria-hidden="true"
          style={{
            width: Math.max(8, size * 0.36),
            height: Math.max(8, size * 0.36),
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff5ca8, #ff8a3d, #8b5cff)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      <span
        aria-label="AgentX"
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontStretch: '70%',
          fontSize: size,
          fontWeight: 800,
          letterSpacing: '0.04em',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}
      >
        AGENT
        <span
          style={{
            background: 'linear-gradient(90deg, #ff5ca8, #ff8a3d, #8b5cff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          X
        </span>
      </span>
    </span>
  );
}
