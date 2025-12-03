import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import { onlyNumeric } from '@/utils';
import useField from '@/hooks/atomic/useField';
import useGroupNavigator from '@/hooks/feature/useGroupNavigator';

const DIGITS = 4;

const CardNumberField = () => {
  const fields = [
    useField({
      sanitize: onlyNumeric,
      required: true,
      maxLength: DIGITS,
    }),
    useField({ sanitize: onlyNumeric, required: true, maxLength: DIGITS }),
    useField({ sanitize: onlyNumeric, required: true, maxLength: DIGITS }),
    useField({ sanitize: onlyNumeric, required: true, maxLength: DIGITS }),
  ];

  const { registerRefs, navigationHandlers } = useGroupNavigator(fields);

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 번호</Label>
      </Box>
      <Box className='field-input-group-container merged'>
        <Input
          className='input-group-cell'
          type='text'
          ref={registerRefs(0)}
          {...fields[0].register}
          {...navigationHandlers[0]}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />

        <Box className='input-group-cell separator'>-</Box>

        <Input
          className='input-group-cell'
          type='text'
          ref={registerRefs(1)}
          {...fields[1].register}
          {...navigationHandlers[1]}
          maxLength={DIGITS}
          required
          inputMode='numeric'
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={registerRefs(2)}
          {...fields[2].register}
          {...navigationHandlers[2]}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
        <Box className='input-group-cell separator'>-</Box>
        <Input
          className='input-group-cell'
          type='password'
          ref={registerRefs(3)}
          {...fields[3].register}
          {...navigationHandlers[3]}
          inputMode='numeric'
          maxLength={DIGITS}
          required
        />
      </Box>
    </Box>
  );
};

export default CardNumberField;
