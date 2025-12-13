import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';
import useField from '@/hooks/feature/useField';

const MAX_LENGTH = 30;
const OwnerNameField = () => {
  const [fieldProps, fieldState] = useField({
    name: 'ownerName',
    rules: {
      maxLength: MAX_LENGTH,
      required: true,
    },
  });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 소유자 이름(선택)</Label>
        <Box className='field-description'>{`${fieldState.length}/${MAX_LENGTH}`}</Box>
      </Box>
      <Input
        className='field-input'
        type='text'
        placeholder='카드에 표시된 이름과 동일하게 입력하세요.'
        {...fieldProps}
        maxLength={MAX_LENGTH}
      />
    </Box>
  );
};

export default OwnerNameField;
