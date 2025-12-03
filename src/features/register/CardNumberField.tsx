import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric } from '@/utils';
import useField from '@/hooks/useField';
import useAutoNavigation from '@/hooks/useAutoNavigation';
import useRovingFocus from '@/hooks/useRovingFocus';

const GROUP_SIZE = 4;
const DIGITS = 4;

const CardNumberField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({
    length: GROUP_SIZE,
  });

  const cell1 = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const cell2 = useField({ sanitize: onlyNumeric, required: true, maxLength: DIGITS });

  const cell3 = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const cell4 = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  useAutoNavigation({
    whenNext: () => cell1.flags.isCompleted,
    onNext: () => focusNext(0),
  });

  const nav2 = useAutoNavigation({
    whenNext: () => cell2.flags.isCompleted,
    onNext: () => focusNext(1),
    whenPrev: () => cell2.flags.isEmpty,
    onPrev: () => focusPrev(1),
  });

  const nav3 = useAutoNavigation({
    whenNext: () => cell3.flags.isCompleted,
    onNext: () => focusNext(2),
    whenPrev: () => cell3.flags.isEmpty,
    onPrev: () => focusPrev(2),
  });

  const nav4 = useAutoNavigation({
    whenNext: () => cell4.flags.isCompleted,
    onNext: () => focusNext(3),
    whenPrev: () => cell4.flags.isEmpty,
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
          maxLength={DIGITS}
          {...cell1.register}
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          inputMode='numeric'
          ref={attachRef(1)}
          maxLength={DIGITS}
          {...cell2.register}
          onKeyDown={nav2.onKeyDown}
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          inputMode='numeric'
          ref={attachRef(2)}
          maxLength={DIGITS}
          {...cell3.register}
          onKeyDown={nav3.onKeyDown}
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          inputMode='numeric'
          ref={attachRef(3)}
          maxLength={DIGITS}
          {...cell4.register}
          onKeyDown={nav4.onKeyDown}
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
