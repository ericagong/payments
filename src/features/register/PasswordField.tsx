import { onlyNumeric, maxLength, required } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useField from '@/hooks/useField';
import useAutoNavigation from '@/hooks/useAutoNavigation';
import useRovingFocus from '@/hooks/useRovingFocus';

const GROUP_SIZE = 2;
const MAX_LENGTH = 1;

const PasswordField = () => {
  const firstDigit = useField({
    sanitizer: [onlyNumeric, maxLength(MAX_LENGTH)],
    validator: required,
  });

  const secondDigit = useField({
    sanitizer: [onlyNumeric, maxLength(MAX_LENGTH)],
    validator: required,
  });

  const { attachRef, focusNext, focusPrev } = useRovingFocus({ length: GROUP_SIZE });

  useAutoNavigation({
    whenNext: () => firstDigit.value.length === MAX_LENGTH,
    onNext: () => focusNext(0),
  });

  const secondDigitNavigator = useAutoNavigation({
    whenPrev: () => secondDigit.value.length === 0,
    onPrev: () => focusPrev(1),
  });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>카드 비밀번호</Label>
      </Box>
      <Box className='field-input-group-container seperated'>
        <Input
          className='field-input'
          type='password'
          inputMode='numeric'
          ref={attachRef(0)}
          value={firstDigit.value}
          onChange={firstDigit.onChange}
          onBlur={firstDigit.onBlur}
          maxLength={MAX_LENGTH}
          required
        />
        <Input
          className='field-input'
          type='password'
          inputMode='numeric'
          ref={attachRef(1)}
          value={secondDigit.value}
          onChange={secondDigit.onChange}
          onBlur={secondDigit.onBlur}
          onKeyDown={secondDigitNavigator.onKeyDown}
          maxLength={MAX_LENGTH}
          required
        />
        <Box className='input-group-cell filled'>.</Box>
        <Box className='input-group-cell filled'>.</Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
