import useField from '@/hooks/atomic/useField';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 30;
const OwnerNameField = () => {
  const { register } = useField({
    maxLength: MAX_LENGTH,
    required: true,
  });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 소유자 이름(선택)</Label>
        <Box className='field-description'>{`${register.value.length}/${MAX_LENGTH}`}</Box>
      </Box>
      <Input
        className='field-input'
        type='text'
        placeholder='카드에 표시된 이름과 동일하게 입력하세요.'
        {...register}
        maxLength={MAX_LENGTH}
      />
    </Box>
  );
};

export default OwnerNameField;
