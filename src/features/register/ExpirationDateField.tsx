import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useField from '@/hooks/useField';
import useAutoNavigation from '@/hooks/useAutoNavigation';
import useRovingFocus from '@/hooks/useRovingFocus';
import { onlyNumeric } from '@/utils';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;

const ExpirationDateField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({
    length: DIGIT_COUNT,
  });

  const monthField = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
    normalize: (value) => value.padStart(2, '0'),
    validate: (value) => 1 <= Number(value) && Number(value) <= 12,
  });

  const yearField = useField({
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
  });

  const monthNavigator = useAutoNavigation({
    shouldMoveNext: () => monthField.flags.isCompleted,
    onMoveNext: () => focusNext(0),
  });

  const yearNavigator = useAutoNavigation({
    shouldMovePrev: () => yearField.flags.isEmpty,
    onMovePrev: () => focusPrev(1),
  });

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
          ref={attachRef(0)}
          {...monthField.register}
          {...monthNavigator.register}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='YY'
          ref={attachRef(1)}
          {...yearField.register}
          {...yearNavigator.register}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
