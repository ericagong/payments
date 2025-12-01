import { useCallback, useRef } from 'react';

import { clamp } from '@/utils';

type UseRovingFocusOptions = {
  length: number;
};

type UseRovingFocusReturn = {
  register: (index: number) => (node: HTMLElement | null) => void;
  focusNext: (index: number) => void;
  focusPrev: (index: number) => void;
};

const useRovingFocus = ({ length }: UseRovingFocusOptions): UseRovingFocusReturn => {
  const refs = useRef<Array<HTMLElement | null>>(Array.from({ length }, () => null));

  const register = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      refs.current[index] = node;
    },
    [],
  );

  const focus = useCallback((index: number) => refs.current[clamp(index, length)]?.focus(), [length]);

  const focusNext = useCallback((index: number) => focus(index + 1), [focus]);

  const focusPrev = useCallback((index: number) => focus(index - 1), [focus]);

  return {
    register,
    focusNext,
    focusPrev,
  };
};

export default useRovingFocus;
