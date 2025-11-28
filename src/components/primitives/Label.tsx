import type { LabelHTMLAttributes } from 'react';

import Slot from './Slot';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  asChild?: boolean;
};

const Label = ({ asChild, children, ...props }: LabelProps) => {
  if (asChild) {
    return <Slot {...props}>{children}</Slot>;
  }

  return <label {...props}>{children}</label>;
};

export default Label;
