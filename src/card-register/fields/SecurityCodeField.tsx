import useInput from '@/form/useInput';
import { onlyNumeric } from '@/utils';
import Box from '@/primitives/Box';
import Input from '@/primitives/Input';
import Label from '@/primitives/Label';

const MAX_LENGTH = 3;

const SecurityCodeField = () => {
  const securityCodeProps = useInput('securityCode', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
  });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>보안 코드(CVC/CVV)</Label>
      </Box>
      <Input
        className='field-input'
        type='password'
        inputMode='numeric'
        {...securityCodeProps}
        maxLength={MAX_LENGTH}
        required
      />
    </Box>
  );
};

export default SecurityCodeField;
