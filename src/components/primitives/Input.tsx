import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  asChild?: false;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <input ref={ref} {...props} autoComplete='off' />;
});

Input.displayName = 'Input';

export default Input;
