
import CardNumberField from './fields/CardNumberField';
import ExpirationDateField from './fields/ExpirationDateField';
import OwnerNameField from './fields/OwnerNameField';
import PasswordField from './fields/PasswordField';
import SecurityCodeField from './fields/SecurityCodeField';
import useNextButtonState from './useNextButtonState';

import { useFormContext } from '@/form/FormContext';
import Form from '@/primitives/Form';
import Button from '@/primitives/Button';

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
