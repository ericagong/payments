import { useState } from 'react';
import type { ChangeEvent } from 'react';

type UseInputProps = {
  defaultValue?: string;
  sanitize?: (value: string) => string;
};

const useInput = ({ defaultValue = '', sanitize }: UseInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = sanitize ? sanitize(rawValue) : rawValue;
    setValue(sanitizedValue);
  };

  return {
    value,
    onChange,
  };
};

export default useInput;
