import Box from '@/primitives/Box';
import Input from '@/primitives/Input';
import Label from '@/primitives/Label';
import useAutoAdvance from '@/card-register/useAutoAdvance';
import useInput from '@/form/useInput';
import { onlyNumeric } from '@/utils';

const MAX_LENGTH = 2;
const DIGIT_COUNT = 2;
const CELL_COUNT = 2;

const ExpirationDateField = () => {
  const monthFieldProps = useInput('month', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
    // 사용자가 "1"만 입력하고 blur 하면 "01"로 정규화한다. (사용자 의도는 1월)
    // 검증은 정규화 전 값 기준이라도 1~12 범위만 통과시키므로 두 단계는 독립적이다.
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
