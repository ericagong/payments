import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

type StepperContextValue = {
  currentStep: string;
  next: () => void;
  prev: () => void;
  goTo: (step: string) => void;
};

const StepperContext = createContext<StepperContextValue | null>(null);

type StepperProviderProps = PropsWithChildren<{
  steps: readonly string[];
  initialStep?: string;
}>;

const StepperProvider = ({ steps, initialStep, children }: StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState<string>(initialStep ?? steps[0]);

  const value = useMemo(() => {
    const currentIndex = steps.indexOf(currentStep);
    return {
      currentStep,
      next: () => {
        const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
        setCurrentStep(steps[nextIndex]);
      },
      prev: () => {
        const prevIndex = Math.max(currentIndex - 1, 0);
        setCurrentStep(steps[prevIndex]);
      },
      goTo: (step: string) => {
        if (steps.includes(step)) setCurrentStep(step);
      },
    };
  }, [currentStep, steps]);

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

const useStepperContext = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('useStepperContext must be used inside <StepperProvider>');
  }

  return context;
};

export { StepperProvider, useStepperContext };
