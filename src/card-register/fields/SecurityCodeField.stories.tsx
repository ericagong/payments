import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import SecurityCodeField from './SecurityCodeField';

import { FormProvider } from '@/form/FormContext';


const meta: Meta<typeof SecurityCodeField> = {
  component: SecurityCodeField,
  title: 'Fields/SecurityCodeField',
  decorators: [
    (Story) => (
      <FormProvider>
        <Story />
      </FormProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SecurityCodeField>;

export const Default: Story = {};

// 시나리오 5) 보안코드는 type=password로 마스킹되고 숫자만 입력
export const MaskedInput: Story = {
  play: async ({ canvasElement }) => {
    // type=password는 role을 갖지 않으므로 querySelector 사용
    const input = canvasElement.querySelector('input[type="password"]') as HTMLInputElement;

    await userEvent.type(input, '12a3b');
    // sanitize=onlyNumeric 이므로 숫자만 남고 maxLength=3에서 잘림
    await expect(input.value).toBe('123');
    await expect(input.type).toBe('password');
  },
};
