import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';

import { useStepperContext } from '@/stepper/StepperContext';

type StepProps = {
  name: string;
  children: ReactNode;
};

// Stepper의 자식으로 사용되는 단일 step. 자체적으로는 children을 그대로 렌더한다.
// 활성 여부는 부모 Stepper가 결정한다.
const Step = ({ children }: StepProps) => children;

type StepperProps = {
  children: ReactNode;
};

// 현재 step과 일치하는 Stepper.Step 자식만 렌더한다.
const Stepper = ({ children }: StepperProps) => {
  const { currentStep } = useStepperContext();

  const active = Children.toArray(children).find(
    (child) => isValidElement<StepProps>(child) && child.props.name === currentStep,
  );

  return active ?? null;
};

Stepper.Step = Step;

export default Stepper;
