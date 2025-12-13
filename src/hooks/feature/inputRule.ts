type InputRule = {
  sanitize?: (v: string) => string;
  normalize?: (v: string) => string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validate?: (v: string) => boolean;
};

type RuleErrorCode = 'required' | 'minLength' | 'maxLength' | 'invalid';

const identity = (v: string) => v;

const alwaysValid = () => true;

const defaultInputRule: Required<InputRule> = {
  sanitize: identity,
  normalize: identity,
  required: false,
  minLength: 0,
  maxLength: Infinity,
  validate: alwaysValid,
};

const ensureSafeInputRule = (rule: InputRule): Required<InputRule> => ({
  ...defaultInputRule,
  ...rule,
});

export { ensureSafeInputRule };
export type { InputRule, RuleErrorCode };
