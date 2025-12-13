import type { FieldRules } from '../feature/fieldRules';
import { ensureSafeFieldRules } from '../feature/fieldRules';
import { transformValue, normalizeValue, validateValue } from '../feature/fieldPipeline';

type UseFieldLogicParams = {
  rules: FieldRules;
  getValue: () => string;
  setValue: (v: string) => void;
  markDirty: () => void;
  markTouched: () => void;
};

const useFieldLogic = ({ rules, getValue, setValue, markDirty, markTouched }: UseFieldLogicParams) => {
  const fieldRules = ensureSafeFieldRules(rules);

  const onChange = (rawValue: string) => {
    markDirty();

    const nextValue = transformValue(rawValue, fieldRules);

    setValue(nextValue);
  };

  const onBlur = () => {
    markTouched();

    const nextValue = normalizeValue(getValue(), fieldRules);

    setValue(nextValue);
  };

  const deriveFieldState = () => {
    const fieldValue = getValue();
    const errorCode = validateValue(fieldValue, fieldRules);

    return {
      errorCode,
      isValid: errorCode === null,
      isEmpty: fieldValue.length === 0,
      isCompleted: fieldValue.length === fieldRules.maxLength,
      length: fieldValue.length,
    };
  };

  return {
    onChange,
    onBlur,
    fieldState: deriveFieldState(),
  };
};

export default useFieldLogic;
