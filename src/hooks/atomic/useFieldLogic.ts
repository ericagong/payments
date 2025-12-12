type UseFieldLogicParams = {
  value: string;

  sanitize?: (value: string) => string;
  normalize?: (value: string) => string;
  validate?: (value: string) => string;

  required?: boolean;
  minLength?: number;
  maxLength?: number;

  setValue: (v: string) => void;
  markDirty: () => void;
  markTouched: () => void;
};

const identity = (v: string) => v;
const noErrorMessage = () => '';

const useFieldLogic = ({
  value,
  setValue,
  markDirty,
  markTouched,

  sanitize = identity,
  normalize = identity,
  validate = noErrorMessage,
  required = false,
  minLength = 0,
  maxLength = Infinity,
}: UseFieldLogicParams) => {
  const computeError = () => {
    if (required && value.length === 0) return '필수 입력입니다.';
    if (value.length < minLength) return `${minLength}자 이상 입력하세요.`;
    if (value.length > maxLength) return `${maxLength}자 이하 입력하세요.`;
    return validate(value);
  };

  const errorMessage = computeError();

  const onChange = (rawValue: string) => {
    markDirty();

    const pipeline = [sanitize, (v: string) => v.slice(0, maxLength)];

    const nextValue = pipeline.reduce((acc, fn) => fn(acc), rawValue);

    setValue(nextValue);
  };

  const onBlur = () => {
    markTouched();

    const nextValue = normalize(value);

    setValue(nextValue);
  };

  const fieldState = {
    error: errorMessage,
    isValid: errorMessage === '',
    isEmpty: value.length === 0,
    isCompleted: value.length === maxLength,
    length: value.length,
  };

  return {
    onChange,
    onBlur,
    fieldState,
  };
};

export default useFieldLogic;
