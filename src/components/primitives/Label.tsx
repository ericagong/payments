import type { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...props }: LabelProps) => {
  return <label {...props}>{children}</label>;
};

export default Label;
