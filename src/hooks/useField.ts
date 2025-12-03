import { useState } from 'react';
import type { ChangeEvent } from 'react';

type UseFieldParams = {
  sanitize?: (value: string) => string;
  normalize?: (value: string) => string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validate?: (value: string) => boolean;
  defaultValue?: string;
};

const identity = (value: string) => value;

const useField = ({
  sanitize = identity,
  normalize = identity,
  required = false,
  minLength = 0,
  maxLength = Infinity,
  validate = () => true,
  defaultValue = '',
}: UseFieldParams) => {
  const [value, setValue] = useState(defaultValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isEmpty = value.length === 0;
  const isCompleted = Number.isFinite(maxLength) && value.length === maxLength;

  const isValid = (() => {
    const rules = [required && !isEmpty, value.length >= minLength, value.length <= maxLength, validate(value)];

    return rules.every(Boolean);
  })();

  const updateValue = (next: string) => {
    if (!isDirty && next !== defaultValue) setIsDirty(true);
    setValue(next);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    const transformSteps = [sanitize, (v: string) => v.slice(0, maxLength)];

    const transformedValue = transformSteps.reduce((acc, step) => step(acc), raw);

    updateValue(transformedValue);
  };

  const handleBlur = () => {
    if (!isTouched) setIsTouched(true);

    const normalizedValue = normalize(value);

    updateValue(normalizedValue);
  };

  const register = {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  const flags = {
    isValid,
    isDirty,
    isTouched,
    isEmpty,
    isCompleted,
  };

  return { register, flags };
};

export default useField;
