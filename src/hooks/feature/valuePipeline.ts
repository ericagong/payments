import type { InputRule, RuleErrorCode } from './inputRule';

const transformValue = (value: string, rule: Required<InputRule>) => {
  const limitLength = (v: string) => v.slice(0, rule.maxLength);

  const transformPipeline = [rule.sanitize, limitLength];

  return transformPipeline.reduce((v, fn) => fn(v), value);
};

const normalizeValue = (value: string, rule: Required<InputRule>) => {
  const pipeline = [rule.sanitize, rule.normalize];

  return pipeline.reduce((v, fn) => fn(v), value);
};

const validateValue = (value: string, rule: Required<InputRule>): RuleErrorCode | null => {
  if (rule.required && value.length === 0) return 'required';
  if (value.length < rule.minLength) return 'minLength';
  if (value.length > rule.maxLength) return 'maxLength';
  if (!rule.validate(value)) return 'invalid';
  return null;
};

export { transformValue, normalizeValue, validateValue };
