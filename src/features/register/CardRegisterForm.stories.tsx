import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import CardRegisterForm from './CardRegisterForm';

import { FormProvider } from '@/contexts/FormContext';


const meta: Meta<typeof CardRegisterForm> = {
  component: CardRegisterForm,
  title: 'Form/CardRegisterForm',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CardRegisterForm>;

export const Default: Story = {};

// 시나리오 8) 필수값 미완 → Next disabled, 모두 완료 → enabled
export const NextButtonState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: '다음' }) as HTMLButtonElement;

    // 초기 상태: 필수값 미완 → disabled
    await expect(submitButton.disabled).toBe(true);

    // 모든 필수 필드 입력
    const allInputs = canvasElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const cardNumber = allInputs[0];
    const month = allInputs[1];
    const year = allInputs[2];
    const securityCode = allInputs[3];
    const ownerName = allInputs[4];
    const firstPwd = allInputs[5];
    const secondPwd = allInputs[6];

    cardNumber.focus();
    await userEvent.type(cardNumber, '1234567812345678');
    month.focus();
    await userEvent.type(month, '12');
    year.focus();
    await userEvent.type(year, '26');
    securityCode.focus();
    await userEvent.type(securityCode, '123');
    ownerName.focus();
    await userEvent.type(ownerName, 'HONG');
    firstPwd.focus();
    await userEvent.type(firstPwd, '1');
    secondPwd.focus();
    await userEvent.type(secondPwd, '2');

    // 필수 필드 모두 완료 → enabled
    await expect(submitButton.disabled).toBe(false);
  },
};
