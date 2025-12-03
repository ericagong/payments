import useField from '@/hooks/useField';
import { onlyNumeric, maxLength, required } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 3;

const SecurityCodeField = () => {
  const { value, onChange } = useField({
    sanitizer: [onlyNumeric, maxLength(MAX_LENGTH)],
    validator: required,
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
        value={value}
        onChange={onChange}
        maxLength={MAX_LENGTH}
        required
      />
    </Box>
  );
};

export default SecurityCodeField;
