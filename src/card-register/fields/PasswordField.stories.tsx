import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import PasswordField from './PasswordField';

import { FormProvider } from '@/form/FormContext';


const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  title: 'Fields/PasswordField',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

// 시나리오 6) 1자리 채우면 다음 칸으로 자동 focus, 마스킹 적용
export const AutoAdvanceMasked: Story = {
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll('input[type="password"]') as NodeListOf<HTMLInputElement>;
    const [first, second] = inputs;

    first.focus();
    await userEvent.type(first, '1');

    // 1자리 채우면 두 번째 input으로 자동 focus
    await expect(document.activeElement).toBe(second);
    await expect(first.value).toBe('1');
    await expect(first.type).toBe('password');
  },
};
