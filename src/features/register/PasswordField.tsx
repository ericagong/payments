import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useField from '@/hooks/feature/useField';

const MAX_LENGTH = 1;

const PasswordField = () => {
  const [firstDigitFieldProps] = useField({
    name: 'firstPasswordDigit',
    rules: {
      sanitize: onlyNumeric,
      required: true,
      maxLength: MAX_LENGTH,
    },
  });
  const [secondDigitFieldProps] = useField({
    name: 'secondPasswordDigit',
    rules: {
      sanitize: onlyNumeric,
      required: true,
      maxLength: MAX_LENGTH,
    },
  });

  // const { registerRefs, navigationHandlers } = useGroupNavigator([firstDigitField, secondDigitField]);

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>카드 비밀번호</Label>
      </Box>
      <Box className='field-input-group-container seperated'>
        <Input
          className='field-input'
          type='password'
          // ref={registerRefs(0)}
          {...firstDigitFieldProps}
          // {...navigationHandlers[0]}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Input
          className='field-input'
          type='password'
          // ref={registerRefs(1)}
          {...secondDigitFieldProps}
          // {...navigationHandlers[1]}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell filled'>.</Box>
        <Box className='input-group-cell filled'>.</Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
