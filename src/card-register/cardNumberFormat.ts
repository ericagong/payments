// 카드번호 표시 정책: NEXTSTEP 미션 요구사항에 따라 4자리마다 separator(-)를 두고,
// 9번째 숫자부터 마스킹(*)한다. raw 16자리는 미리보기와 필드 모두에서 같은 정책으로 보여야 하므로
// 이 두 함수를 양쪽에서 공유한다.

const formatCardNumber = (raw: string): string => {
  const groups = raw.match(/.{1,4}/g);
  return groups ? groups.join('-') : '';
};

const maskAfterEighth = (formatted: string): string => {
  let digitCount = 0;
  return formatted
    .split('')
    .map((char) => {
      if (/\d/.test(char)) {
        digitCount += 1;
        return digitCount > 8 ? '*' : char;
      }
      return char;
    })
    .join('');
};

export { formatCardNumber, maskAfterEighth };
