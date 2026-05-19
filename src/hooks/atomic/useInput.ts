import type { ChangeEvent } from 'react';

import useInputLogic from '@/hooks/atomic/useInputLogic';
import type { InputRule } from '@/hooks/feature/inputRule';
import { useFormContext } from '@/contexts/FormContext';

const useInput = (name: string, rule: InputRule) => {
  const form = useFormContext();

  const { value, onChange, onBlur } = useInputLogic({
    rule,
    getValue: () => form.getValue(name),
    setValue: (v) => form.setValue(name, v),
    markDirty: () => form.markDirty(name),
    markTouched: () => form.markTouched(name),
  });

  const fieldProps = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    onBlur,
  };

  return fieldProps;
};

export default useInput;
