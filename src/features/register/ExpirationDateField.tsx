import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;

const sanitizeNumeric = (value: string) => value.replace(/\D/g, '').slice(0, MAX_LENGTH);
const isFilled = (value: string) => value.length === MAX_LENGTH;

const ExpirationDateField = () => {
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(DIGIT_COUNT).fill(null));

  const registerInputRef = (index: number) => (node: HTMLInputElement | null) => {
    inputRefs.current[index] = node;
  };

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateDigit = (index: number, nextValue: string) => {
    setDigits((prev) => {
      const nextDigits = [...prev];
      nextDigits[index] = nextValue;
      return nextDigits;
    });
  };

  const handleDigitChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeNumeric(event.target.value);

    if (index === 0 && sanitizedValue.length === MAX_LENGTH) {
      const monthNumber = Number(sanitizedValue);

      if (monthNumber < 1 || monthNumber > 12) {
        return;
      }
    }

    updateDigit(index, sanitizedValue);

    if (isFilled(sanitizedValue)) {
      focusInput(index + 1);
    }
  };

  const handleDigitKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Backspace') {
      return;
    }

    if (digits[index]) {
      return;
    }

    const previousIndex = index - 1;
    if (previousIndex < 0) {
      return;
    }

    event.preventDefault();
    updateDigit(previousIndex, '');
    focusInput(previousIndex);
  };

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>만료일</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='MM'
          inputMode='numeric'
          ref={registerInputRef(0)}
          value={digits[0]}
          onChange={handleDigitChange(0)}
          onKeyDown={handleDigitKeyDown(0)}
          maxLength={MAX_LENGTH}
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='YY'
          inputMode='numeric'
          ref={registerInputRef(1)}
          value={digits[1]}
          onChange={handleDigitChange(1)}
          onKeyDown={handleDigitKeyDown(1)}
          maxLength={MAX_LENGTH}
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
