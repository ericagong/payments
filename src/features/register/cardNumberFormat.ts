// raw 카드번호 문자열에 4자리마다 separator(-)를 끼워 넣는다.
const formatCardNumber = (raw: string): string => {
  const groups = raw.match(/.{1,4}/g);
  return groups ? groups.join('-') : '';
};

// formatted 문자열에서 9번째 숫자 이후 숫자만 *로 치환한다. separator(-)는 유지.
const maskAfterEighth = (formatted: string): string => {
  let digitCount = 0;
  return formatted
    .split('')
    .map((c) => {
      if (/\d/.test(c)) {
        digitCount += 1;
        return digitCount > 8 ? '*' : c;
      }
      return c;
    })
    .join('');
};

export { formatCardNumber, maskAfterEighth };
