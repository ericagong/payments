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

  const cell1Field = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const cell2Field = useField({ sanitize: onlyNumeric, required: true, maxLength: DIGITS });

  const cell3Field = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const cell4Field = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const cell1Navigator = useAutoNavigation({
    shouldMoveNext: () => cell1Field.flags.isCompleted,
    onMoveNext: () => focusNext(0),
  });

  const cell2Navigator = useAutoNavigation({
    shouldMoveNext: () => cell2Field.flags.isCompleted,
    onMoveNext: () => focusNext(1),
    shouldMovePrev: () => cell2Field.flags.isEmpty,
    onMovePrev: () => focusPrev(1),
  });

  const cell3Navigator = useAutoNavigation({
    shouldMoveNext: () => cell3Field.flags.isCompleted,
    onMoveNext: () => focusNext(2),
    shouldMovePrev: () => cell3Field.flags.isEmpty,
    onMovePrev: () => focusPrev(2),
  });

  const cell4Navigator = useAutoNavigation({
    shouldMoveNext: () => cell4Field.flags.isCompleted,
    onMoveNext: () => focusNext(3),
    shouldMovePrev: () => cell4Field.flags.isEmpty,
    onMovePrev: () => focusPrev(3),
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
          ref={attachRef(0)}
          {...cell1Field.register}
          {...cell1Navigator.register}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          ref={attachRef(1)}
          {...cell2Field.register}
          {...cell2Navigator.register}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={attachRef(2)}
          {...cell3Field.register}
          {...cell3Navigator.register}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={attachRef(3)}
          {...cell4Field.register}
          {...cell4Navigator.register}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
