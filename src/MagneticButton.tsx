import * as React from 'react';
import gsap from 'gsap';

/**
 * Magnetic button: leans toward the cursor and springs back on leave.
 * Desktop pointers only; skipped for reduced-motion users.
 */
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const inner = React.useRef<HTMLElement | null>(null);

    const setRef = React.useCallback(
      (node: HTMLElement | null) => {
        inner.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    React.useEffect(() => {
      const el = inner.current;
      if (!el) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const opts = { duration: 0.8, ease: 'elastic.out(1, 0.5)' };
      const xTo = gsap.quickTo(el, 'x', opts);
      const yTo = gsap.quickTo(el, 'y', opts);
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35);
        yTo((e.clientY - r.top - r.height / 2) * 0.5);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
        gsap.killTweensOf(el);
      };
    }, []);

    return (
      <Component ref={setRef} className={className} {...props}>
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
