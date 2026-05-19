import { useCallback, useRef } from 'react';

import { getSafeIndex } from '@/utils';

type UseFocusGroupParams = {
  groupSize: number;
};

type UseFocusGroupReturn = {
  registerRefs: (index: number) => ($element: HTMLElement | null) => void;
  focusNext: (index: number) => void;
  focusPrev: (index: number) => void;
};

const useFocusGroup = ({ groupSize }: UseFocusGroupParams): UseFocusGroupReturn => {
  const refs = useRef<Array<HTMLElement | null>>(Array.from({ length: groupSize }, () => null));

  const registerRefs = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      refs.current[index] = element;
    },
    [],
  );

  const focus = useCallback((index: number) => refs.current[getSafeIndex(index, groupSize)]?.focus(), [groupSize]);

  const focusNext = useCallback((index: number) => focus(index + 1), [focus]);

  const focusPrev = useCallback((index: number) => focus(index - 1), [focus]);

  return {
    registerRefs,
    focusNext,
    focusPrev,
  };
};

export default useFocusGroup;
