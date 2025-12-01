import SecurityCodeField from './SecurityCodeField';
import OwnerNameField from './OwnerNameField';
import PasswordField from './PasswordField';
import './field.scss';

const CardRegisterForm = () => {
  return (
    <form>
      <SecurityCodeField />
      <OwnerNameField />
      <PasswordField />
    </form>
  );
};

export default CardRegisterForm;
