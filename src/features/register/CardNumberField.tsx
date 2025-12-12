import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric } from '@/utils';
// import useField from '@/hooks/atomic/useFieldLogic';
// import useGroupNavigator from '@/hooks/feature/useGroupNavigator';
import useFormController from '@/hooks/feature/useFormController';

const DIGITS = 4;

const CardNumberField = () => {
  const [firstCardNumberDigitProps] = useFormController({
    name: 'firstCardNumberDigit',
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });
  const [secondCardNumberDigitProps] = useFormController({
    name: 'secondCardNumberDigit',
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  const [thirdCardNumberDigitProps] = useFormController({
    name: 'thirdCardNumberDigit',
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });
  const [fourthCardNumberDigitProps] = useFormController({
    name: 'fourthCardNumberDigit',
    sanitize: onlyNumeric,
    required: true,
    maxLength: DIGITS,
  });

  // const { registerRefs, navigationHandlers } = useGroupNavigator(fields);

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 번호</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input
          className='input-group-cell'
          type='text'
          // ref={registerRefs(0)}
          {...firstCardNumberDigitProps}
          // {...navigationHandlers[0]}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          // ref={registerRefs(1)}
          {...secondCardNumberDigitProps}
          // {...navigationHandlers[1]}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          // ref={registerRefs(2)}
          {...thirdCardNumberDigitProps}
          // {...navigationHandlers[2]}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          // ref={registerRefs(3)}
          {...fourthCardNumberDigitProps}
          // {...navigationHandlers[3]}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
