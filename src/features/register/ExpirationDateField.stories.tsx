import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import ExpirationDateField from './ExpirationDateField';

import { FormProvider } from '@/contexts/FormContext';


const meta: Meta<typeof ExpirationDateField> = {
  component: ExpirationDateField,
  title: 'Fields/ExpirationDateField',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ExpirationDateField>;

export const Default: Story = {};

// 시나리오 3) MM 채우면 YY로 자동 focus
export const AutoAdvance: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox') as HTMLInputElement[];
    const [monthInput, yearInput] = inputs;

    monthInput.focus();
    await userEvent.type(monthInput, '12');

    // MM 채우면 YY로 자동 focus
    await expect(document.activeElement).toBe(yearInput);
  },
};

// 시나리오 4) 월은 1~12 범위만 valid (13 → invalid)
export const InvalidMonth: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox') as HTMLInputElement[];
    const [monthInput] = inputs;

    monthInput.focus();
    await userEvent.type(monthInput, '13');
    monthInput.blur();
    // normalize 결과 13 → "13" (padStart는 동일), validate는 false
    // value는 그대로 13으로 남음
    await expect(monthInput.value).toBe('13');
  },
};
