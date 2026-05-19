import type { KeyboardEvent } from 'react';

import useFocusGroup from '@/card-register/useFocusGroup';

type UseAutoAdvanceParams = {
  length: number;
  cellMaxLength: number;
};

const useAutoAdvance = ({ length, cellMaxLength }: UseAutoAdvanceParams) => {
  const { registerRefs, focusNext, focusPrev } = useFocusGroup({ groupSize: length });

  // paste 등으로 cellMaxLength를 초과한 입력이 들어올 수 있으므로 === 가 아닌 >= 로 비교.
  // (sanitize/limitLength로 잘려도 입력 직후 한 프레임 동안 초과 가능)
  const onChange = (index: number, nextValue: string) => {
    if (nextValue.length >= cellMaxLength) focusNext(index);
  };

  // 빈 칸에서 Backspace를 누르면 사용자 의도는 이전 셀을 지우는 것이므로 이전 input으로 focus 이동.
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
