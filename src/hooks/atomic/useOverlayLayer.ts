import { useMemo } from 'react';

// raw 문자열에 format(예: 4자리마다 separator)을 먼저 적용한 뒤 mask(예: 9번째부터 *)를 적용한다.
// 순서가 중요한 이유: mask가 separator 위치를 보존하면서 숫자만 마스킹하려면
// format이 먼저 separator를 끼워 넣은 상태여야 한다. 역순이면 마스킹된 *까지 separator 사이에 끼어 망가진다.

const useOverlayLayer = (raw: string, format: (s: string) => string, mask: (s: string) => string): string =>
  useMemo(() => mask(format(raw)), [raw, format, mask]);

export default useOverlayLayer;
