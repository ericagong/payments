import type { InputRule } from '@/form/inputRule';
import { transformValue, normalizeValue, validateValue } from '@/form/valuePipeline';
import { ensureSafeInputRule } from '@/form/inputRule';

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
