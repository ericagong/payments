// src/components/primitives/box/Box.tsx
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import Slot from './Slot';

type BoxProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

const Box = forwardRef<HTMLDivElement, BoxProps>(({ asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp ref={ref} {...props}>
      {children}
    </Comp>
  );
});

Box.displayName = 'Box';
export default Box;
