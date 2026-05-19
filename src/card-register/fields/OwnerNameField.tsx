import Box from '@/primitives/Box';
import Input from '@/primitives/Input';
import Label from '@/primitives/Label';
import useInput from '@/form/useInput';

const MAX_LENGTH = 30;
const OwnerNameField = () => {
  const ownerNameProps = useInput('ownerName', {
    maxLength: MAX_LENGTH,
  });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 소유자 이름(선택)</Label>
        <Box className='field-description'>{`${ownerNameProps.value.length}/${MAX_LENGTH}`}</Box>
      </Box>
      <Input
        className='field-input'
        type='text'
        placeholder='카드에 표시된 이름과 동일하게 입력하세요.'
        {...ownerNameProps}
        maxLength={MAX_LENGTH}
      />
    </Box>
  );
};

export default OwnerNameField;
