import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
// import useGroupNavigator from '@/hooks/feature/useGroupNavigator';
import { onlyNumeric } from '@/utils';
import useField from '@/hooks/feature/useField';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;

const ExpirationDateField = () => {
  const [monthFieldProps] = useField({
    name: 'month',
    rules: {
      sanitize: onlyNumeric,
      required: true,
      maxLength: MAX_LENGTH,
      normalize: (value: string) => value.padStart(DIGIT_COUNT, '0'),
      validate: (value: string) => 1 <= Number(value) && Number(value) <= 12,
    },
  });

  const [yearFieldProps] = useField({
    name: 'year',
    rules: {
      sanitize: onlyNumeric,
      required: true,
      maxLength: MAX_LENGTH,
      normalize: (value: string) => value.padStart(DIGIT_COUNT, '0'),
    },
  });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>만료일</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='MM'
          // ref={registerRefs(0)}
          {...monthFieldProps}
          // {...navigationHandlers[0]}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='YY'
          // ref={registerRefs(1)}
          {...yearFieldProps}
          // {...navigationHandlers[1]}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
