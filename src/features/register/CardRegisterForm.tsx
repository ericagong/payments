import SecurityCodeField from './SecurityCodeField';
import OwnerNameField from './OwnerNameField';
import './field.scss';

const CardRegisterForm = () => {
  return (
    <form>
      <SecurityCodeField />
      <OwnerNameField />
    </form>
  );
};

export default CardRegisterForm;
