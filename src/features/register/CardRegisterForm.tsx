import CardNumberField from './CardNumberField';
import ExpirationDateField from './ExpirationDateField';
import SecurityCodeField from './SecurityCodeField';
import OwnerNameField from './OwnerNameField';
import PasswordField from './PasswordField';
import './field.scss';

const CardRegisterForm = () => {
  return (
    <form>
      <CardNumberField />
      <ExpirationDateField />
      <SecurityCodeField />
      <OwnerNameField />
      <PasswordField />
    </form>
  );
};

export default CardRegisterForm;
