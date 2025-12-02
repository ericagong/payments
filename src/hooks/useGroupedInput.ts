import type { ChangeEvent, KeyboardEvent } from 'react';

import useInputs from '@/hooks/useInputs';
import useRovingFocus from '@/hooks/useRovingFocus';

type UseGroupedInputProps = {
  length: number;
  sanitize?: (value: string) => string;
  toNext: (value: string) => boolean;
};

const toPrev = (value: string) => value.length === 0;

const useGroupedInput = ({ length, sanitize, toNext }: UseGroupedInputProps) => {
  const { values, setValue } = useInputs({ length });

  const { register, focusNext, focusPrev } = useRovingFocus({ length });

  const createChangeHandler = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = sanitize ? sanitize(rawValue) : rawValue;

    setValue(index, sanitizedValue);

    if (toNext(sanitizedValue)) {
      focusNext(index);
    }
  };

  const createKeyDownHandler = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && toPrev(values[index])) {
      e.preventDefault();
      focusPrev(index);
    }
  };

  const registerGroupedInput = (index: number) => ({
    ref: register(index),
    value: values[index],
    onChange: createChangeHandler(index),
    onKeyDown: createKeyDownHandler(index),
  });

  return registerGroupedInput;
};

export default useGroupedInput;
