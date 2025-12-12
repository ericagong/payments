import CardNumberField from './CardNumberField';
import ExpirationDateField from './ExpirationDateField';
import SecurityCodeField from './SecurityCodeField';
import OwnerNameField from './OwnerNameField';
import PasswordField from './PasswordField';

import './field.scss';
import Button from '@/components/primitives/Button';
import { FormProvider, useFormContext } from '@/contexts/FormContext';
import Form from '@/components/primitives/Form';

const CardRegisterForm = () => {
  return (
    <FormProvider>
      <RegisterForm />
    </FormProvider>
  );
};

const RegisterForm = () => {
  const form = useFormContext();

  const handleSubmit = form.handleSubmit((formData) => {
    console.log('called');
    console.log('Submitted Values:', formData);
  });

  return (
    <Form onSubmit={handleSubmit}>
      <CardNumberField />
      <ExpirationDateField />
      <SecurityCodeField />
      <OwnerNameField />
      <PasswordField />
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default CardRegisterForm;
