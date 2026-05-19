import type { KeyboardEvent } from 'react';

import useFocusGroup from '@/hooks/atomic/useFocusGroup';

type UseAutoAdvanceParams = {
  length: number;
  cellMaxLength: number;
};

const useAutoAdvance = ({ length, cellMaxLength }: UseAutoAdvanceParams) => {
  const { registerRefs, focusNext, focusPrev } = useFocusGroup({ groupSize: length });

  const onChange = (index: number, nextValue: string) => {
    if (nextValue.length >= cellMaxLength) focusNext(index);
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      focusPrev(index);
    }
  };

  return {
    register: registerRefs,
    onChange,
    onKeyDown,
  };
};

export default useAutoAdvance;
