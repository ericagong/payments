import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import useRovingFocus from '@/hooks/useRovingFocus';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 1;
const DIGIT_COUNT = 2;

const sanitizeNumeric = (value: string) => value.replace(/\D/g, '');
const isFilled = (value: string) => value.length === MAX_LENGTH;

const PasswordField = () => {
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(''));
  const { register, focusNext, focusPrev } = useRovingFocus({ length: DIGIT_COUNT });

  const updateDigit = (index: number, nextValue: string) => {
    setDigits((prev) => {
      const nextDigits = [...prev];
      nextDigits[index] = nextValue;
      return nextDigits;
    });
  };

  const handleDigitChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = sanitizeNumeric(event.target.value);

    updateDigit(index, sanitizedValue);

    if (isFilled(sanitizedValue)) {
      focusNext(index);
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
    focusPrev(index);
  };

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>카드 비밀번호</Label>
      </Box>
      <Box className='field-input-group-container seperated'>
        <Input
          className='input-group-cell'
          type='password'
          ref={register(0)}
          value={digits[0]}
          onChange={handleDigitChange(0)}
          onKeyDown={handleDigitKeyDown(0)}
          maxLength={MAX_LENGTH}
        />
        <Input
          className='input-group-cell'
          type='password'
          ref={register(1)}
          value={digits[1]}
          onChange={handleDigitChange(1)}
          onKeyDown={handleDigitKeyDown(1)}
          maxLength={MAX_LENGTH}
        />
        <Box className='input-group-cell filled'>.</Box>
        <Box className='input-group-cell filled'>.</Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
