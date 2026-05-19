import Box from '@/primitives/Box';
import Input from '@/primitives/Input';
import Label from '@/primitives/Label';
import useAutoAdvance from '@/card-register/useAutoAdvance';
import useInput from '@/form/useInput';
import { onlyNumeric } from '@/utils';

const MAX_LENGTH = 1;
const CELL_COUNT = 2;

const PasswordField = () => {
  const firstDigitFieldProps = useInput('firstPasswordDigit', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
  });
  const secondDigitFieldProps = useInput('secondPasswordDigit', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
  });

  const auto = useAutoAdvance({ length: CELL_COUNT, cellMaxLength: MAX_LENGTH });

  return (
    <Box className='field-container' style={{ width: '50%' }}>
      <Box className='field-header'>
        <Label>카드 비밀번호</Label>
      </Box>
      <Box className='field-input-group-container seperated'>
        <Input
          ref={auto.register(0)}
          className='field-input'
          type='password'
          {...firstDigitFieldProps}
          onChange={(e) => {
            firstDigitFieldProps.onChange(e);
            auto.onChange(0, e.target.value);
          }}
          onKeyDown={(e) => auto.onKeyDown(0, e)}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Input
          ref={auto.register(1)}
          className='field-input'
          type='password'
          {...secondDigitFieldProps}
          onKeyDown={(e) => auto.onKeyDown(1, e)}
          maxLength={MAX_LENGTH}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell filled' aria-hidden>
          .
        </Box>
        <Box className='input-group-cell filled' aria-hidden>
          .
        </Box>
      </Box>
    </Box>
  );
};

export default PasswordField;
