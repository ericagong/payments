import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import OwnerNameField from './OwnerNameField';

import { FormProvider } from '@/contexts/FormContext';


const meta: Meta<typeof OwnerNameField> = {
  component: OwnerNameField,
  title: 'Fields/OwnerNameField',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OwnerNameField>;

export const Default: Story = {};

// 시나리오 7) 카운터 실시간 반영, 30자 제한
export const CounterAndMaxLength: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'HONG GIL DONG');
    await expect(input.value).toBe('HONG GIL DONG');
    await expect(canvas.getByText('13/30')).toBeTruthy();

    // 30자 초과 입력 시도 - maxLength로 제한
    await userEvent.type(input, ' IS A KOREAN LEGENDARY FIGURE');
    await expect(input.value.length).toBeLessThanOrEqual(30);
  },
};
