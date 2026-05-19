import { formatCardNumber, maskAfterEighth } from '../cardNumberFormat';

import Box from '@/primitives/Box';
import Input from '@/primitives/Input';
import Label from '@/primitives/Label';
import useInput from '@/form/useInput';
import useOverlayLayer from '@/card-register/useOverlayLayer';
import { onlyNumeric } from '@/utils';

import '../overlay.scss';

const MAX_LENGTH = 16;
const PLACEHOLDER = 'XXXX-XXXX-XXXX-XXXX';

const CardNumberField = () => {
  const cardNumberProps = useInput('cardNumber', {
    sanitize: onlyNumeric,
    required: true,
    maxLength: MAX_LENGTH,
  });

  const displayValue = useOverlayLayer(cardNumberProps.value, formatCardNumber, maskAfterEighth);

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 번호</Label>
      </Box>
      <Box className='overlay-root'>
        <Input
          className='overlay-raw'
          type='text'
          inputMode='numeric'
          autoComplete='cc-number'
          maxLength={MAX_LENGTH}
          required
          {...cardNumberProps}
        />
        <Box className='overlay-display' aria-hidden>
          {displayValue || <span className='overlay-placeholder'>{PLACEHOLDER}</span>}
        </Box>
      </Box>
    </Box>
  );
};

export default CardNumberField;
