import { useState } from 'react';
import type { ChangeEvent } from 'react';

import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 3;

const numericOnly = (value: string) => {
  return value.replace(/\D/g, '');
};
const SecurityCodeField = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const normalizedValue = numericOnly(rawValue);
    setValue(normalizedValue);
  };

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
