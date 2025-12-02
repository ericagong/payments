import { useRef } from 'react';

import { toArray } from '@/utils';

type RawValue = string;
type DomainValue = any;

type PipelineState = {
  rawValue: RawValue;
  domainValue?: DomainValue;
  hasError: boolean;
};

type Step = (state: PipelineState) => PipelineState;

type Steps = {
  sanitize?: Step | Step[];
  normalize?: Step | Step[];
  transform?: Step | Step[];
  update?: Step | Step[];
  advance?: Step | Step[];
};

type UseInputPipelineProps = Steps;

const createInitialState = (rawValue: RawValue): PipelineState => ({
  rawValue,
  domainValue: undefined,
  hasError: false,
});

const runStep = (prevState: PipelineState, step: Step): PipelineState => {
  if (prevState.hasError) return prevState;

  try {
    return step(prevState);
  } catch {
    return { ...prevState, hasError: true };
  }
};

const initializePipeline = (steps: Steps) =>
  [
    ...toArray(steps.sanitize),
    ...toArray(steps.normalize),
    ...toArray(steps.transform),
    ...toArray(steps.update),
    ...toArray(steps.advance),
  ] as Step[];

const useInputPipeline = (steps: UseInputPipelineProps = {}) => {
  const stepsRef = useRef<Step[]>(initializePipeline(steps));

  const runSteps = (rawValue: string) =>
    stepsRef.current.reduce(
      (pipelineState, currStep) => runStep(pipelineState, currStep),
      createInitialState(rawValue),
    );

  return { runSteps };
};

export default useInputPipeline;
export type { Steps };
