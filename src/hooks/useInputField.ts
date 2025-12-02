import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

import useInputPipeline from './useInputPipeline';
import type { Steps } from './useInputPipeline';

type UseInputFieldProps = {
  steps?: Steps;
  onAdvance?: () => void;
};

const useInputField = ({ steps = {}, onAdvance }: UseInputFieldProps = {}) => {
  const [value, setValue] = useState('');

  const { runSteps } = useInputPipeline(steps);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      const { value: nextValue, shouldAdvance } = runSteps(rawValue);

      setValue(nextValue);

      if (shouldAdvance && onAdvance) {
        onAdvance();
      }
    },
    [runSteps, onAdvance],
  );

  return {
    value,
    onChange,
  };
};

export default useInputField;
