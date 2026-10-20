import type { ReactNode } from 'react';

/**
 * Inline stroke icons (lucide-style, 24x24, currentColor).
 *
 * Why inline: the installed lucide-react@1.16.0 tarball ships EMPTY
 * .d.ts files (0 bytes, no "types" field), so ANY `import from
 * 'lucide-react'` fails `tsc` with TS2306. Inlining the handful of
 * icons we use keeps the build green with zero dependency changes.
 */

interface IconProps {
  size?: number;
}

function Base({ size = 24, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowUp({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </Base>
  );
}

export function ArrowUpRight({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Base>
  );
}

export function Menu({ size }: IconProps) {
  return (
    <Base size={size}>
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </Base>
  );
}

export function X({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Base>
  );
}

export function ChevronLeft({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="m15 18-6-6 6-6" />
    </Base>
  );
}

export function ChevronRight({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="m9 18 6-6-6-6" />
    </Base>
  );
}

export function CalendarCheck({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </Base>
  );
}

export function Map({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V6l-6 2-6-2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </Base>
  );
}

export function Rocket({ size }: IconProps) {
  return (
    <Base size={size}>
      <path d="M12 2c3 2 4.5 6 4.5 10l-1.5 3h-6L7.5 12C7.5 8 9 4 12 2Z" />
      <circle cx="12" cy="9" r="1.8" />
      <path d="M9 15c-2 0-3.5 1.5-4 3.5 2-.5 3.5-2 4-3.5Z" />
      <path d="M15 15c2 0 3.5 1.5 4 3.5-2-.5-3.5-2-4-3.5Z" />
      <path d="M12 18v3" />
    </Base>
  );
}
