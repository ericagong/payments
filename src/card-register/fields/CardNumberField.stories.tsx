import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import CardNumberField from './CardNumberField';

import { FormProvider } from '@/form/FormContext';


const meta: Meta<typeof CardNumberField> = {
  component: CardNumberField,
  title: 'Fields/CardNumberField',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CardNumberField>;

export const Default: Story = {};

// 시나리오 1) 카드번호 4자리마다 - 자동 삽입
export const AutoSeparator: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, '12345678');
    await expect(input.value).toBe('12345678');
    // display layer가 1234-5678로 렌더되는지
    await expect(canvas.getByText(/1234-5678/)).toBeTruthy();
  },
};

// 시나리오 2) 카드번호 8자리 이후 마스킹
export const MaskAfterEighth: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, '1234567812345678');
    // raw input value는 16자리 숫자 그대로 유지
    await expect(input.value).toBe('1234567812345678');
    // display layer는 1234-5678-****-**** 로 마스킹
    await expect(canvas.getByText(/1234-5678-\*\*\*\*-\*\*\*\*/)).toBeTruthy();
  },
};
