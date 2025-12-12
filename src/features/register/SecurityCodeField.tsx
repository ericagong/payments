// import useField from '@/hooks/atomic/useFieldLogic';
import useFormController from '@/hooks/feature/useFormController';
import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 3;

const SecurityCodeField = () => {
  const [fieldProps] = useFormController({
    name: 'securityCode',
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
        {...fieldProps}
        maxLength={MAX_LENGTH}
        required
      />
    </Box>
  );
};

export default SecurityCodeField;
