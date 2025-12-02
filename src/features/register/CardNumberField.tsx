import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric } from '@/utils';
import useInputField from '@/hooks/useInputField';
import useRovingFocus from '@/hooks/useRovingFocus';
import useBackspaceToPrev from '@/hooks/useBackspaceToPrev';

const DIGITS = 4;
const GROUP_SIZE = 4;

const isFull = (v: string) => v.length === GROUP_SIZE;
const isEmpty = (v: string) => v.length === 0;

const CardNumberField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({ length: DIGITS });

  const cell1 = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, GROUP_SIZE),
      advance: isFull,
    },
    onAdvance: () => focusNext(0),
  });

  const cell2 = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, GROUP_SIZE),
      advance: isFull,
    },
    onAdvance: () => focusNext(1),
  });

  const cell3 = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, GROUP_SIZE),
      advance: isFull,
    },
    onAdvance: () => focusNext(2),
  });

  const cell4 = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, GROUP_SIZE),
    },
  });

  const back2 = useBackspaceToPrev({
    shouldMovePrev: () => isEmpty(cell2.value),
    onPrev: () => focusPrev(1),
  });

  const back3 = useBackspaceToPrev({
    shouldMovePrev: () => isEmpty(cell3.value),
    onPrev: () => focusPrev(2),
  });

  const back4 = useBackspaceToPrev({
    shouldMovePrev: () => isEmpty(cell4.value),
    onPrev: () => focusPrev(3),
  });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 번호</Label>
      </Box>

      <Box className='field-input-group-container merged'>
        <Input
          className='input-group-cell'
          type='text'
          inputMode='numeric'
          ref={attachRef(0)}
          maxLength={GROUP_SIZE}
          value={cell1.value}
          onChange={cell1.onChange}
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          inputMode='numeric'
          ref={attachRef(1)}
          maxLength={GROUP_SIZE}
          value={cell2.value}
          onChange={cell2.onChange}
          onKeyDown={back2.onKeyDown}
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='password'
          inputMode='numeric'
          ref={attachRef(2)}
          maxLength={GROUP_SIZE}
          value={cell3.value}
          onChange={cell3.onChange}
          onKeyDown={back3.onKeyDown}
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='password'
          inputMode='numeric'
          ref={attachRef(3)}
          maxLength={GROUP_SIZE}
          value={cell4.value}
          onChange={cell4.onChange}
          onKeyDown={back4.onKeyDown}
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
