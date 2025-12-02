import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useInputField from '@/hooks/useInputField';
import useRovingFocus from '@/hooks/useRovingFocus';
import useBackspaceToPrev from '@/hooks/useBackspaceToPrev';

const GROUP_SIZE = 2;
const MAX_LENGTH = 1;
const isFull = (value: string) => value.length === MAX_LENGTH;
const isEmpty = (value: string) => value.length === 0;

const PasswordField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({ length: GROUP_SIZE });

  const { value: firstDigit, onChange: onChangeFirstDigit } = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, MAX_LENGTH),
      advance: isFull,
    },
    onAdvance: () => {
      focusNext(0);
    },
  });

  const { value: secondDigit, onChange: onChangeSecondDigit } = useInputField({
    steps: {
      sanitize: onlyNumeric,
      normalize: (raw) => raw.slice(0, MAX_LENGTH),
    },
  });

  const { onKeyDown: onKeyDownSecondDigit } = useBackspaceToPrev({
    shouldMovePrev: () => isEmpty(secondDigit),
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
          value={firstDigit}
          maxLength={MAX_LENGTH}
          onChange={onChangeFirstDigit}
        />
        <Input
          className='field-input'
          type='password'
          inputMode='numeric'
          ref={attachRef(1)}
          value={secondDigit}
          maxLength={MAX_LENGTH}
          onChange={onChangeSecondDigit}
          onKeyDown={onKeyDownSecondDigit}
        />
        <Box className='input-group-cell filled'>.</Box>
        <Box className='input-group-cell filled'>.</Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
