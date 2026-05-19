import { useMemo } from 'react';

// raw -> format(데이터 단계 결과) -> mask(표시 단계 결과)
const useOverlayLayer = (raw: string, format: (s: string) => string, mask: (s: string) => string): string =>
  useMemo(() => mask(format(raw)), [raw, format, mask]);

export default useOverlayLayer;
