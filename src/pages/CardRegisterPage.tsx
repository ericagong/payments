import { useNavigate } from 'react-router-dom';

import CardPreview from '@/components/CardPreview/CardPreview';
import Button from '@/components/primitives/Button';
import { FormProvider } from '@/contexts/FormContext';
import { StepperProvider, useStepperContext } from '@/contexts/StepperContext';
import CardRegisterForm from '@/features/register/CardRegisterForm';
import Stepper from '@/features/stepper/Stepper';

const STEPS = ['register', 'completed'] as const;

const STEP_TITLES: Record<string, string> = {
  register: '카드 추가',
  completed: '카드 등록 완료',
};

type StepHeaderProps = {
  onBack: () => void;
};

const StepHeader = ({ onBack }: StepHeaderProps) => {
  const { currentStep } = useStepperContext();

  return (
    <header className='app-header'>
      {currentStep === 'register' && <Button className='to-prev' onClick={onBack} />}
      <div className='title'>{STEP_TITLES[currentStep]}</div>
    </header>
  );
};

const RegisterStep = () => {
  const stepper = useStepperContext();

  return (
    <>
      <CardPreview />
      <main className='app-main'>
        <CardRegisterForm onSubmitted={() => stepper.next()} />
      </main>
    </>
  );
};

type CompletedStepProps = {
  onConfirm: () => void;
};

const CompletedStep = ({ onConfirm }: CompletedStepProps) => (
  <main className='app-main app-main--centered'>
    <h2 className='completed-title'>카드 등록이 완료되었습니다.</h2>
    <Button className='to-next confirm-button' onClick={onConfirm}>
      확인
    </Button>
  </main>
);

const CardRegisterPage = () => {
  const navigate = useNavigate();

  return (
    <StepperProvider steps={STEPS}>
      <FormProvider>
        <StepHeader onBack={() => navigate('/list')} />
        <Stepper>
          <Stepper.Step name='register'>
            <RegisterStep />
          </Stepper.Step>
          <Stepper.Step name='completed'>
            <CompletedStep onConfirm={() => navigate('/list')} />
          </Stepper.Step>
        </Stepper>
      </FormProvider>
    </StepperProvider>
  );
};

export default CardRegisterPage;
