type FieldMessages = {
  required?: string;
  minLength?: string;
  maxLength?: string;
  invalid?: string;
  valid?: string;
};

const defaultFieldMessages: Required<FieldMessages> = {
  required: '필수 입력값입니다.',
  minLength: '값이 너무 짧습니다.',
  maxLength: '값이 너무 깁니다.',
  invalid: '유효하지 않은 값입니다.',
  valid: '유효한 값입니다.',
};

const ensureSafeValidationMessages = (messages: FieldMessages = {}): Required<FieldMessages> => ({
  ...defaultFieldMessages,
  ...messages,
});

export { ensureSafeValidationMessages };
