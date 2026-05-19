import { forwardRef } from 'react';
import type { FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

const Form = forwardRef<HTMLFormElement, FormProps>(({ children, ...props }, ref) => {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  );
});

Form.displayName = 'Form';
export default Form;
