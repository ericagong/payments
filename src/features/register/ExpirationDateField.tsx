import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useAutoAdvance from '@/hooks/atomic/useAutoAdvance';
import useInput from '@/hooks/atomic/useInput';
import { onlyNumeric } from '@/utils';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;
const CELL_COUNT = 2;

const ExpirationDateField = () => {
  const monthFieldProps = useInput('month', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
    normalize: (value: string) => value.padStart(DIGIT_COUNT, '0'),
    validate: (value: string) => 1 <= Number(value) && Number(value) <= 12,
  });

  const yearFieldProps = useInput('year', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
    normalize: (value: string) => value.padStart(DIGIT_COUNT, '0'),
  });

  const auto = useAutoAdvance({ length: CELL_COUNT, cellMaxLength: MAX_LENGTH });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>만료일</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input
          ref={auto.register(0)}
          className='input-group-cell'
          type='text'
          placeholder='MM'
          {...monthFieldProps}
          onChange={(e) => {
            monthFieldProps.onChange(e);
            auto.onChange(0, e.target.value);
          }}
          onKeyDown={(e) => auto.onKeyDown(0, e)}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          ref={auto.register(1)}
          className='input-group-cell'
          type='text'
          placeholder='YY'
          {...yearFieldProps}
          onKeyDown={(e) => auto.onKeyDown(1, e)}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
