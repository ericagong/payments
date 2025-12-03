import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useField from '@/hooks/useField';
import useAutoNavigation from '@/hooks/useAutoNavigation';
import useRovingFocus from '@/hooks/useRovingFocus';
import { onlyNumeric, maxLength } from '@/utils';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;

const isMonth = (value: string) => 1 <= Number(value) && Number(value) <= 12;

const ExpirationDateField = () => {
  const { attachRef, focusNext, focusPrev } = useRovingFocus({
    length: DIGIT_COUNT,
  });

  const month = useField({
    sanitizer: [onlyNumeric, maxLength(MAX_LENGTH)],
    normalizer: (value) => value.padStart(2, '0'),
    validator: isMonth,
  });

  const year = useField({
    sanitizer: [onlyNumeric, maxLength(MAX_LENGTH)],
  });

  useAutoNavigation({
    whenNext: () => month.value.length === MAX_LENGTH,
    onNext: () => {
      focusNext(0);
    },
  });

  const navYear = useAutoNavigation({
    whenPrev: () => year.value.length === 0,
    onPrev: () => focusPrev(1),
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
          ref={attachRef(0)}
          value={month.value}
          onChange={month.onChange}
          onBlur={month.onBlur}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>/</Box>
        <Input
          className='input-group-cell'
          type='text'
          placeholder='YY'
          ref={attachRef(1)}
          value={year.value}
          onChange={year.onChange}
          onBlur={year.onBlur}
          onKeyDown={navYear.onKeyDown}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
      </Box>
    </Box>
  );
};

export default ExpirationDateField;
