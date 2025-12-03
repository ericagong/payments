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

  const cell1Navigator = useAutoNavigation({
    shouldTriggerNext: () => cell1.flags.isCompleted,
    onNext: () => focusNext(0),
  });

  const cell2Navigator = useAutoNavigation({
    shouldTriggerNext: () => cell2.flags.isCompleted,
    onNext: () => focusNext(1),
    shouldTriggerPrev: () => cell2.flags.isEmpty,
    onPrev: () => focusPrev(1),
  });

  const cell3Navigator = useAutoNavigation({
    shouldTriggerNext: () => cell3.flags.isCompleted,
    onNext: () => focusNext(2),
    shouldTriggerPrev: () => cell3.flags.isEmpty,
    onPrev: () => focusPrev(2),
  });

  const cell4Navigator = useAutoNavigation({
    shouldTriggerNext: () => cell4.flags.isCompleted,
    onNext: () => focusNext(3),
    shouldTriggerPrev: () => cell4.flags.isEmpty,
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
          ref={attachRef(0)}
          {...cell1.register}
          onKeyDown={cell1Navigator.onKeyDown}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          ref={attachRef(1)}
          {...cell2.register}
          onKeyDown={cell2Navigator.onKeyDown}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={attachRef(2)}
          {...cell3.register}
          onKeyDown={cell3Navigator.onKeyDown}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={attachRef(3)}
          {...cell4.register}
          onKeyDown={cell4Navigator.onKeyDown}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
