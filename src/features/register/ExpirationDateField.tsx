import type { ChangeEvent, KeyboardEvent } from 'react';

import useInputs from '@/hooks/useInputs';
import { onlyNumeric } from '@/utils';
import useRovingFocus from '@/hooks/useRovingFocus';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;
const toNext = (value: string) => value.length === MAX_LENGTH;
const toPrev = (value: string) => value.length === 0;
const validate = (value: number) => {
  return 1 <= value && value <= 12;
};

const ExpirationDateField = () => {
  const { values, setValue } = useInputs({ length: DIGIT_COUNT });
  const { register, focusNext, focusPrev } = useRovingFocus({ length: DIGIT_COUNT });

  const createChangeHandler = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = onlyNumeric(e.target.value);

    if (index === 0 && toNext(sanitizedValue) && !validate(Number(sanitizedValue))) return;

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
          ref={register(0)}
          value={values[0]}
          onChange={createChangeHandler(0)}
          onKeyDown={createKeyDownHandler(0)}
          maxLength={MAX_LENGTH}
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='YY'
          inputMode='numeric'
          ref={register(1)}
          value={values[1]}
          onChange={createChangeHandler(1)}
          onKeyDown={createKeyDownHandler(1)}
          maxLength={MAX_LENGTH}
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
