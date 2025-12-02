import { useRef } from 'react';

type SanitizeFn = (value: string) => string;
type NormalizeFn = (value: string) => string;
type AdvanceFn = (value: string) => boolean;

type Steps = {
  sanitize?: SanitizeFn;
  normalize?: NormalizeFn;
  advance?: AdvanceFn;
};

type PipelineState = {
  value: string;
  shouldAdvance: boolean;
};

const useInputPipeline = (steps: Steps = {}) => {
  const sanitizeRef = useRef(steps.sanitize);
  const normalizeRef = useRef(steps.normalize);
  const advanceRef = useRef(steps.advance);

  const runSteps = (initialValue: string): PipelineState => {
    let value = initialValue;

    if (sanitizeRef.current) {
      value = sanitizeRef.current(value);
    }

    if (normalizeRef.current) {
      value = normalizeRef.current(value);
    }

    const shouldAdvance = advanceRef.current ? advanceRef.current(value) : false;

    return { value, shouldAdvance };
  };

  return { runSteps };
};

export default useInputPipeline;
export type { Steps };
