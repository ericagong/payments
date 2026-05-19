import { describe, expect, it } from 'vitest';

import { ensureSafeInputRule } from './inputRule';
import { normalizeValue, transformValue, validateValue } from './valuePipeline';

describe('transformValue', () => {
  it('sanitize와 maxLength 제한을 순차 적용한다', () => {
    const rule = ensureSafeInputRule({
      sanitize: (v) => v.replace(/\D/g, ''),
      maxLength: 4,
    });
    expect(transformValue('12a3b4c5', rule)).toBe('1234');
  });

  it('sanitize가 identity면 maxLength만 적용한다', () => {
    const rule = ensureSafeInputRule({ maxLength: 3 });
    expect(transformValue('hello', rule)).toBe('hel');
  });
});

describe('normalizeValue', () => {
  it('sanitize 후 normalize를 적용한다', () => {
    const rule = ensureSafeInputRule({
      sanitize: (v) => v.replace(/\D/g, ''),
      normalize: (v) => v.padStart(2, '0'),
    });
    expect(normalizeValue('3', rule)).toBe('03');
  });

  it('normalize가 identity면 sanitize 결과만 반환한다', () => {
    const rule = ensureSafeInputRule({ sanitize: (v) => v.toUpperCase() });
    expect(normalizeValue('hello', rule)).toBe('HELLO');
  });
});

describe('validateValue', () => {
  it('required인데 값이 비었으면 required 에러코드를 반환한다', () => {
    const rule = ensureSafeInputRule({ required: true });
    expect(validateValue('', rule)).toBe('required');
  });

  it('값이 minLength 미만이면 minLength 에러코드를 반환한다', () => {
    const rule = ensureSafeInputRule({ minLength: 3 });
    expect(validateValue('ab', rule)).toBe('minLength');
  });

  it('값이 maxLength 초과면 maxLength 에러코드를 반환한다', () => {
    const rule = ensureSafeInputRule({ maxLength: 2 });
    expect(validateValue('abc', rule)).toBe('maxLength');
  });

  it('custom validate가 false면 invalid 에러코드를 반환한다', () => {
    const rule = ensureSafeInputRule({
      validate: (v) => 1 <= Number(v) && Number(v) <= 12,
    });
    expect(validateValue('13', rule)).toBe('invalid');
  });

  it('모든 규칙을 통과하면 null을 반환한다', () => {
    const rule = ensureSafeInputRule({
      required: true,
      minLength: 1,
      maxLength: 4,
      validate: (v) => /^\d+$/.test(v),
    });
    expect(validateValue('1234', rule)).toBeNull();
  });
});
