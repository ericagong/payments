import type { FieldRules } from './fieldRules';

const transformValue = (value: string, rules: Required<FieldRules>) => {
  const enforceMaxLength = (v: string) => v.slice(0, rules.maxLength);

  const transformPipeline = [rules.sanitize, enforceMaxLength];

  return transformPipeline.reduce((v, fn) => fn(v), value);
};

const normalizeValue = (value: string, rules: Required<FieldRules>) => {
  const pipeline = [rules.sanitize, rules.normalize];

  return pipeline.reduce((v, fn) => fn(v), value);
};

type ValidationRuleErrorCode = 'required' | 'minLength' | 'maxLength' | 'invalid';

const validateValue = (value: string, rules: Required<FieldRules>): ValidationRuleErrorCode | null => {
  if (rules.required && value.length === 0) return 'required';
  if (value.length < rules.minLength) return 'minLength';
  if (value.length > rules.maxLength) return 'maxLength';
  if (!rules.validate(value)) return 'invalid';
  return null;
};

export { transformValue, normalizeValue, validateValue };
