import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import Slot from './Slot';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp ref={ref} {...props}>
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';
export default Button;
