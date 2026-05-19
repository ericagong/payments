import { useNavigate } from 'react-router-dom';

import CardPreview from '@/card-register/CardPreview';
import Button from '@/primitives/Button';
import { FormProvider } from '@/form/FormContext';
import { StepperProvider, useStepperContext } from '@/stepper/StepperContext';
import CardRegisterForm from '@/card-register/CardRegisterForm';
import Stepper from '@/stepper/Stepper';

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
      {/* completed step에서는 폼을 되돌리는 게 의미 없으므로 뒤로가기 버튼을 숨긴다. */}
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
