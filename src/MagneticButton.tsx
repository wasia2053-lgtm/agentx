import * as React from 'react';

/**
 * Plain button/anchor passthrough. The old magnetic hover effect was
 * removed to match the calm Fantasy motion language — buttons keep
 * their look, but no longer chase the cursor.
 */
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
    const ref = (node: HTMLElement | null) => {
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    };
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
