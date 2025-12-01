import { useState, useCallback } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import useRovingFocus from '@/hooks/useRovingFocus';

type UseGroupedInputProps = {
  length: number;
  sanitize?: (value: string) => string;
  maxLength: number;
};

const isFilled = (value: string, maxLength: number) => {
  return value.length === maxLength;
};

const useGroupedInput = ({ length, sanitize, maxLength }: UseGroupedInputProps) => {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const { register, focusNext, focusPrev } = useRovingFocus({ length });

  const updateDigit = useCallback((index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      const sanitizedValue = sanitize ? sanitize(rawValue) : rawValue;

      updateDigit(index, sanitizedValue);

      if (isFilled(sanitizedValue, maxLength)) focusNext(index);
    },
    [updateDigit, maxLength, focusNext, sanitize],
  );

  const handleKeyDown = useCallback(
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && digits[index] === '') {
        e.preventDefault();
        focusPrev(index);
      }
    },
    [digits, focusPrev],
  );

  const registerGroupedInput = useCallback(
    (index: number) => ({
      ref: register(index),
      value: digits[index],
      onChange: handleChange(index),
      onKeyDown: handleKeyDown(index),
      maxLength,
    }),
    [digits, handleChange, handleKeyDown, register, maxLength],
  );

  return registerGroupedInput;
};

export default useGroupedInput;
