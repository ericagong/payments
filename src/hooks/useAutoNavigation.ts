import { useEffect } from 'react';
import type { KeyboardEvent } from 'react';

type UseAutoNavigationParams = {
  whenNext?: () => boolean;
  onNext?: () => void;
  whenPrev?: () => boolean;
  onPrev?: () => void;
};

const useAutoNavigation = ({ whenNext, onNext, whenPrev, onPrev }: UseAutoNavigationParams) => {
  useEffect(() => {
    if (whenNext && onNext && whenNext()) {
      onNext();
    }
  }, [whenNext, onNext]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (whenPrev && onPrev && whenPrev()) {
        e.preventDefault();
        onPrev();
      }
    }
  };

  return { onKeyDown };
};

export default useAutoNavigation;
