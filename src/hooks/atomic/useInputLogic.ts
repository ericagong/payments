import type { InputRule } from '@/hooks/feature/inputRule';
import { transformValue, normalizeValue, validateValue } from '@/hooks/feature/valuePipeline';
import { ensureSafeInputRule } from '@/hooks/feature/inputRule';

type UseInputLogicParams = {
  rule: InputRule;
  getValue: () => string;
  setValue: (v: string) => void;
  markDirty?: () => void;
  markTouched?: () => void;
};

const useInputLogic = ({ rule, getValue, setValue, markDirty, markTouched }: UseInputLogicParams) => {
  const safeRule = ensureSafeInputRule(rule);

  const onChange = (raw: string) => {
    markDirty?.();
    setValue(transformValue(raw, safeRule));
  };

  const onBlur = () => {
    markTouched?.();
    setValue(normalizeValue(getValue(), safeRule));
  };

  const value = getValue();
  const errorCode = validateValue(value, safeRule);

  return { value, errorCode, onChange, onBlur };
};

export default useInputLogic;
