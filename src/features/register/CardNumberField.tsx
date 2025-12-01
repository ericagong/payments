import useGroupedInput from '@/hooks/useGroupedInput';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric } from '@/utils';

const MAX_LENGTH = 4;
const DIGIT_LENGTH = 4;

const CardNumberField = () => {
  const registerGroupedInput = useGroupedInput({ length: DIGIT_LENGTH, sanitize: onlyNumeric, maxLength: MAX_LENGTH });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 번호</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input className='input-group-cell' type='text' inputMode='numeric' {...registerGroupedInput(0)} />
        <Box className='input-group-cell separator'>-</Box>
        <Input className='input-group-cell' type='text' inputMode='numeric' {...registerGroupedInput(1)} />
        <Box className='input-group-cell separator'>-</Box>
        <Input className='input-group-cell' type='password' inputMode='numeric' {...registerGroupedInput(2)} />
        <Box className='input-group-cell separator'>-</Box>
        <Input className='input-group-cell' type='password' inputMode='numeric' {...registerGroupedInput(3)} />
      </Box>
    </Box>
  );
};

export default CardNumberField;
