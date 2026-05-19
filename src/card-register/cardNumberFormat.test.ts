import { describe, expect, it } from 'vitest';

import { formatCardNumber, maskAfterEighth } from './cardNumberFormat';

describe('formatCardNumber', () => {
  it('빈 문자열을 빈 문자열로 반환한다', () => {
    expect(formatCardNumber('')).toBe('');
  });

  it('4자리 미만은 그대로 반환한다', () => {
    expect(formatCardNumber('123')).toBe('123');
  });

  it('정확히 4자리는 separator 없이 반환한다', () => {
    expect(formatCardNumber('1234')).toBe('1234');
  });

  it('5자리는 4자리 + separator + 1자리로 반환한다', () => {
    expect(formatCardNumber('12345')).toBe('1234-5');
  });

  it('16자리를 4-4-4-4 형태로 반환한다', () => {
    expect(formatCardNumber('1234567812345678')).toBe('1234-5678-1234-5678');
  });
});

describe('maskAfterEighth', () => {
  it('빈 문자열을 빈 문자열로 반환한다', () => {
    expect(maskAfterEighth('')).toBe('');
  });

  it('8자리 이하 숫자는 마스킹하지 않는다', () => {
    expect(maskAfterEighth('1234-5678')).toBe('1234-5678');
  });

  it('9번째 숫자부터 *로 마스킹한다', () => {
    expect(maskAfterEighth('1234-5678-9')).toBe('1234-5678-*');
  });

  it('16자리는 앞 8자리만 노출하고 나머지를 마스킹한다', () => {
    expect(maskAfterEighth('1234-5678-1234-5678')).toBe('1234-5678-****-****');
  });

  it('separator(-)는 마스킹하지 않고 유지한다', () => {
    expect(maskAfterEighth('1234-5678-1234')).toBe('1234-5678-****');
  });
});
