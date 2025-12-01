import useInput from '@/hooks/useInput';
import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 3;
const SecurityCodeField = () => {
  const { value, handleChange } = useInput({
    defaultValue: '',
    sanitize: onlyNumeric,
  });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>보안 코드(CVC/CVV)</Label>
      </Box>
      <Input className='field-input' type='password' value={value} onChange={handleChange} maxLength={MAX_LENGTH} />
    </Box>
  );
};

export default SecurityCodeField;
