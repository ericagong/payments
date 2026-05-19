
import CardNumberField from './CardNumberField';
import ExpirationDateField from './ExpirationDateField';
import OwnerNameField from './OwnerNameField';
import PasswordField from './PasswordField';
import SecurityCodeField from './SecurityCodeField';
import useNextButtonState from './useNextButtonState';

import { useFormContext } from '@/contexts/FormContext';
import Form from '@/components/primitives/Form';
import Button from '@/components/primitives/Button';

import './field.scss';

type CardRegisterFormProps = {
  onSubmitted?: () => void;
};

const CardRegisterForm = ({ onSubmitted }: CardRegisterFormProps) => {
  const form = useFormContext();
  const { isAllRequiredComplete } = useNextButtonState();

  const handleSubmit = form.handleSubmit(() => {
    onSubmitted?.();
  });

  return (
    <Form onSubmit={handleSubmit}>
      <CardNumberField />
      <ExpirationDateField />
      <SecurityCodeField />
      <OwnerNameField />
      <PasswordField />
      <Button type='submit' className='submit-button' disabled={!isAllRequiredComplete}>
        다음
      </Button>
    </Form>
  );
};

export default CardRegisterForm;
