import { useState } from 'react';
import type { ChangeEvent } from 'react';

type Sanitizer = (raw: string) => string;
type Normalizer = (value: string) => string;
type Validator = (value: string) => boolean;

type UseFieldParams = {
  sanitizer?: Sanitizer | Sanitizer[];
  normalizer?: Normalizer;
  validator?: Validator;
  defaultValue?: string;
};

const useField = ({ sanitizer, normalizer, validator, defaultValue = '' }: UseFieldParams) => {
  const [value, setValue] = useState(defaultValue);
  const [isDirty, setIsDirty] = useState(false); // defaultValue !== value 최초 발생 여부
  const [isTouched, setIsTouched] = useState(false); // onBlur 최초 발생 여부

  const setValueWithDirtyCheck = (next: string) => {
    if (!isDirty && next !== defaultValue) {
      setIsDirty(true);
    }
    setValue(next);
  };

  const isValid = validator ? validator(value) : true;

  const sanitize = (rawValue: string) => {
    if (!sanitizer) return rawValue;
    if (Array.isArray(sanitizer)) {
      return sanitizer.reduce((acc, fn) => fn(acc), rawValue);
    }
    return sanitizer(rawValue);
  };

  const normalize = () => {
    if (!normalizer) return;
    setValueWithDirtyCheck(normalizer(value));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setValueWithDirtyCheck(sanitize(rawValue));
  };

  const onBlur = () => {
    if (!isTouched) setIsTouched(true);
    normalize();
  };

  return {
    value,
    onChange,
    onBlur,
    isValid,
    isDirty,
    isTouched,
  };
};

export default useField;
