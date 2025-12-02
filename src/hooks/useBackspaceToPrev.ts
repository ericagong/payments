import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

type UseBackspaceToPrevParams = {
  shouldMovePrev: () => boolean;
  onPrev: () => void;
};

const useBackspaceToPrev = ({ shouldMovePrev, onPrev }: UseBackspaceToPrevParams) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Backspace') return;

      if (shouldMovePrev()) {
        e.preventDefault();
        onPrev();
      }
    },
    [shouldMovePrev, onPrev],
  );

  return { onKeyDown };
};

export default useBackspaceToPrev;
