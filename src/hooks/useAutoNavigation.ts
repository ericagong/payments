import type { KeyboardEvent } from 'react';

import { shouldNotTrigger, doNothing } from '@/utils';

type UseAutoNavigationParams = {
  shouldMoveNext?: () => boolean;
  onMoveNext?: () => void;
  shouldMovePrev?: () => boolean;
  onMovePrev?: () => void;
};

const useAutoNavigation = ({
  shouldMoveNext = shouldNotTrigger,
  onMoveNext = doNothing,
  shouldMovePrev = shouldNotTrigger,
  onMovePrev = doNothing,
}: UseAutoNavigationParams) => {
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace' && shouldMoveNext()) onMoveNext();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && shouldMovePrev()) onMovePrev();
  };

  const register = {
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
  };

  return { register };
};

export default useAutoNavigation;
