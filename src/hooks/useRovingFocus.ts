import { useCallback, useRef } from 'react';

import { clamp } from '@/utils';

type UseRovingFocusOptions = {
  length: number;
};

type UseRovingFocusReturn = {
  attachRef: (index: number) => ($element: HTMLElement | null) => void;
  focusNext: (index: number) => void;
  focusPrev: (index: number) => void;
};

const useRovingFocus = ({ length }: UseRovingFocusOptions): UseRovingFocusReturn => {
  const refs = useRef<Array<HTMLElement | null>>(Array.from({ length }, () => null));

  const attachRef = useCallback(
    (index: number) => ($element: HTMLElement | null) => {
      refs.current[index] = $element;
    },
    [],
  );

  const focusAt = useCallback((index: number) => refs.current[clamp(index, length)]?.focus(), [length]);

  const focusNext = useCallback((index: number) => focusAt(index + 1), [focusAt]);

  const focusPrev = useCallback((index: number) => focusAt(index - 1), [focusAt]);

  return {
    attachRef,
    focusNext,
    focusPrev,
  };
};

export default useRovingFocus;
