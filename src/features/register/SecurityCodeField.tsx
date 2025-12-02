import { useState } from 'react';

import useInputField from '@/hooks/useInputField';
import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 3;

const SecurityCodeField = () => {
  const [value, setValue] = useState('');

  const { register } = useInputField({
    value,
    setValue,
    steps: {
      sanitize: (s) => ({
        ...s,
        rawValue: onlyNumeric(s.rawValue),
      }),
      normalize: (s) => ({
        ...s,
        rawValue: s.rawValue.slice(0, MAX_LENGTH),
      }),
    },
  });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>보안 코드(CVC/CVV)</Label>
      </Box>
      <Input className='field-input' type='password' inputMode='numeric' {...register()} />
    </Box>
  );
};

export default SecurityCodeField;
