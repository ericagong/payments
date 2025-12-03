import type { KeyboardEvent } from 'react';

import { shouldNotTrigger, doNothing } from '@/utils';

type UseAutoNavigationParams = {
  shouldTriggerNext?: () => boolean;
  onNext?: () => void;
  shouldTriggerPrev?: () => boolean;
  onPrev?: () => void;
};

const useAutoNavigation = ({
  shouldTriggerNext = shouldNotTrigger,
  onNext = doNothing,
  shouldTriggerPrev = shouldNotTrigger,
  onPrev = doNothing,
}: UseAutoNavigationParams) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace') {
      if (shouldTriggerNext()) onNext();
    } else {
      if (shouldTriggerPrev()) onPrev();
    }
  };

  return { onKeyDown: handleKeyDown };
};

export default useAutoNavigation;
