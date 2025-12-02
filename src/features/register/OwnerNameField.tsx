import useInputField from '@/hooks/useInputField';
import Box from '@/components/primitives/Box';
import Input from '@/components/primitives/Input';
import Label from '@/components/primitives/Label';

const MAX_LENGTH = 30;

const OwnerNameField = () => {
  const { value, onChange } = useInputField({
    steps: {
      normalize: (raw) => raw.slice(0, MAX_LENGTH),
    },
  });

  return (
    <Box className='field-container'>
      <Box className='field-header'>
        <Label>카드 소유자 이름(선택)</Label>
        <Box className='field-description'>{`${value.length}/${MAX_LENGTH}`}</Box>
      </Box>
      <Input
        className='field-input'
        type='text'
        placeholder='카드에 표시된 이름과 동일하게 입력하세요.'
        value={value}
        onChange={onChange}
        maxLength={MAX_LENGTH}
      />
    </Box>
  );
};

export default OwnerNameField;
