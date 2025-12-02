import { onlyNumeric } from '@/utils';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useGroupedInput from '@/hooks/useGroupedInput';

const DIGIT_LENGTH = 2;
const MAX_LENGTH = 1;
const toNext = (value: string) => value.length === MAX_LENGTH;

const PasswordField = () => {
  const registerGroupedInput = useGroupedInput({ length: DIGIT_LENGTH, sanitize: onlyNumeric, toNext });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>카드 비밀번호</Label>
      </Box>
      <Box className='field-input-group-container seperated'>
        {Array.from({ length: DIGIT_LENGTH }).map((_, index) => (
          <Input
            key={index}
            className='input-group-cell'
            type='password'
            inputMode='numeric'
            maxLength={MAX_LENGTH}
            {...registerGroupedInput(index)}
          />
        ))}
        <Box className='input-group-cell filled'>.</Box>
        <Box className='input-group-cell filled'>.</Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
