import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type BoxProps = HTMLAttributes<HTMLDivElement>;

const Box = forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

Box.displayName = 'Box';
export default Box;
