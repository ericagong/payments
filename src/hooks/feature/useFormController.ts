import type { ChangeEvent } from 'react';

import { useFormContext } from '@/contexts/FormContext';
import useFieldLogic from '@/hooks/atomic/useFieldLogic';

type UseControllerParams = {
  name: string;

  sanitize?: (value: string) => string;
  normalize?: (value: string) => string;
  validate?: (value: string) => string;

  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

const useFormController = ({
  name,
  sanitize,
  normalize,
  validate,
  required,
  minLength,
  maxLength,
}: UseControllerParams) => {
  const form = useFormContext();

  const fieldValue = form.getValue(name);

  const { onChange, onBlur, fieldState } = useFieldLogic({
    value: fieldValue,
    sanitize,
    normalize,
    validate,
    required,
    minLength,
    maxLength,
    setValue: (value: string) => form.setValue(name, value),
    markDirty: () => form.markDirty(name),
    markTouched: () => form.markTouched(name),
  });

  const fieldProps = {
    name,
    value: fieldValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    onBlur,
  };

  return [fieldProps, fieldState] as const;
};

export default useFormController;
