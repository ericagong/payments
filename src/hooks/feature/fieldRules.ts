type FieldRules = {
  sanitize?: (v: string) => string;
  normalize?: (v: string) => string;
  // validation rules
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validate?: (v: string) => boolean;
};

const identity = (v: string) => v;

const alwaysValid = () => true;

const defaultFieldRules: Required<FieldRules> = {
  sanitize: identity,
  normalize: identity,

  required: false,
  minLength: 0,
  maxLength: Infinity,
  validate: alwaysValid,
};

const ensureSafeFieldRules = (rules: FieldRules): Required<FieldRules> => ({
  ...defaultFieldRules,
  ...rules,
});

export { ensureSafeFieldRules };
export type { FieldRules };
