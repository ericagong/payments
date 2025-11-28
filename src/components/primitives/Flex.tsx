// src/components/primitives/flex/Flex.tsx
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import Slot from './Slot';

type FlexProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

const Flex = forwardRef<HTMLDivElement, FlexProps>(({ asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp ref={ref} {...props}>
      {children}
    </Comp>
  );
});

Flex.displayName = 'Flex';

export default Flex;
