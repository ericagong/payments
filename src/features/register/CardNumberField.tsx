import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric, maxLength, required } from '@/utils';
import useField from '@/hooks/useField';
import useAutoNavigation from '@/hooks/useAutoNavigation';
import useRovingFocus from '@/hooks/useRovingFocus';

const GROUP_SIZE = 4;
const DIGITS = 4;

const CardNumberField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({
    length: DIGITS,
  });

  const cell1 = useField({
    sanitizer: [onlyNumeric, maxLength(GROUP_SIZE)],
    validator: required,
  });

  const cell2 = useField({
    sanitizer: [onlyNumeric, maxLength(GROUP_SIZE)],
    validator: required,
  });

  const cell3 = useField({
    sanitizer: [onlyNumeric, maxLength(GROUP_SIZE)],
    validator: required,
  });

  const cell4 = useField({
    sanitizer: [onlyNumeric, maxLength(GROUP_SIZE)],
    validator: required,
  });

  useAutoNavigation({
    whenNext: () => cell1.value.length === GROUP_SIZE,
    onNext: () => focusNext(0),
  });

  const nav2 = useAutoNavigation({
    whenNext: () => cell2.value.length === GROUP_SIZE,
    onNext: () => focusNext(1),
    whenPrev: () => cell2.value.length === 0,
    onPrev: () => focusPrev(1),
  });

  const nav3 = useAutoNavigation({
    whenNext: () => cell3.value.length === GROUP_SIZE,
    onNext: () => focusNext(2),
    whenPrev: () => cell3.value.length === 0,
    onPrev: () => focusPrev(2),
  });

  const nav4 = useAutoNavigation({
    whenNext: () => cell4.value.length === GROUP_SIZE,
    onNext: () => focusNext(3),
    whenPrev: () => cell4.value.length === 0,
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
          onBlur={cell1.onBlur}
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
          onBlur={cell2.onBlur}
          onKeyDown={nav2.onKeyDown}
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
          onBlur={cell3.onBlur}
          onKeyDown={nav3.onKeyDown}
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
          onBlur={cell4.onBlur}
          onKeyDown={nav4.onKeyDown}
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
