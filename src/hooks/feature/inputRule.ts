type InputRule = {
  sanitize?: (v: string) => string;
  normalize?: (v: string) => string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validate?: (v: string) => boolean;
};

type RuleErrorCode = 'required' | 'minLength' | 'maxLength' | 'invalid';

const defaultInputRule: Required<InputRule> = {
  sanitize: (value) => value,
  normalize: (value) => value,
  required: false,
  minLength: 0,
  maxLength: Infinity,
  validate: () => true,
};

const ensureSafeInputRule = (rule: InputRule): Required<InputRule> => ({
  ...defaultInputRule,
  ...rule,
});

export { ensureSafeInputRule };
export type { InputRule, RuleErrorCode };
