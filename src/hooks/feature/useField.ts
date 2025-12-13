import type { ChangeEvent } from 'react';

import type { FieldRules } from './fieldRules';

import { useFormContext } from '@/contexts/FormContext';
import useFieldLogic from '@/hooks/atomic/useFieldLogic';

type UseFieldParams = {
  name: string;
  rules: FieldRules;
};

const useField = ({ name, rules }: UseFieldParams) => {
  const form = useFormContext();

  const { onChange, onBlur, fieldState } = useFieldLogic({
    rules,
    getValue: () => form.getValue(name),
    setValue: (v: string) => form.setValue(name, v),
    markDirty: () => form.markDirty(name),
    markTouched: () => form.markTouched(name),
  });

  const handleChangeAdaptor = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  const fieldProps = {
    name,
    value: form.getValue(name),
    onChange: handleChangeAdaptor,
    onBlur,
  };

  return [fieldProps, fieldState] as const;
};

export default useField;
