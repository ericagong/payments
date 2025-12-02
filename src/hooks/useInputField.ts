import { useRef } from 'react';
import type { ChangeEvent } from 'react';

import type { Steps } from './useInputPipeline';
import useInputPipeline from './useInputPipeline';

type UseInputFieldProps = {
  value: string;
  setValue: (v: string) => void;
  steps?: Steps;
};

const useInputField = ({ value, setValue, steps = {} }: UseInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { runSteps } = useInputPipeline(steps);

  const register = () => ({
    ref: ($input: HTMLInputElement | null) => {
      inputRef.current = $input;
    },
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const currentRawValue = e.target.value;
      const { rawValue: nextRawValue, domainValue, hasError } = runSteps(currentRawValue);

      if (!hasError) {
        console.log('currentRawValue', currentRawValue);
        console.log('nextRawValue', nextRawValue);
        console.log('domainValue', domainValue);
        setValue(nextRawValue);
      } else {
        console.log('hasError', hasError);
      }
    },
  });

  return { register };
};

export default useInputField;
