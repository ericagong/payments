import { useFormContext } from '@/form/FormContext';

type RequiredFieldSpec = {
  name: string;
  minLength: number;
  validate?: (value: string) => boolean;
};

// 필수 필드 명세. 폼 키와 minLength, 추가 validate 규칙을 정의한다.
const REQUIRED_FIELDS: RequiredFieldSpec[] = [
  { name: 'cardNumber', minLength: 16 },
  { name: 'month', minLength: 2, validate: (v) => 1 <= Number(v) && Number(v) <= 12 },
  { name: 'year', minLength: 2 },
  { name: 'securityCode', minLength: 3 },
  { name: 'firstPasswordDigit', minLength: 1 },
  { name: 'secondPasswordDigit', minLength: 1 },
];

// 모든 필수 필드가 완성되었는지 판단한다. 미리보기와 동일하게 매 입력마다 재계산된다.
const useNextButtonState = () => {
  const form = useFormContext();

  const isAllRequiredComplete = REQUIRED_FIELDS.every((spec) => {
    const value = form.getValue(spec.name);
    if (value.length < spec.minLength) return false;
    if (spec.validate && !spec.validate(value)) return false;
    return true;
  });

  return { isAllRequiredComplete };
};

export default useNextButtonState;
