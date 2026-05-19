import type { Meta, StoryObj } from '@storybook/react-vite';

import Box from './Box';
import Button from './Button';
import Form from './Form';
import Input from './Input';
import Label from './Label';

const meta: Meta = {
  title: 'Primitives/Overview',
};

export default meta;

type Story = StoryObj<typeof meta>;

// 5개의 Primitive를 한 화면에서 확인할 수 있는 스토리.
export const All: Story = {
  render: () => (
    <Form style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <Label htmlFor='demo-input'>Label</Label>
      <Input id='demo-input' type='text' placeholder='Input placeholder' />
      <Box style={{ padding: 12, background: '#ecebf1', borderRadius: 4 }}>Box (디자인 컨테이너)</Box>
      <Button type='button'>Button</Button>
    </Form>
  ),
};

export const InputControlled: Story = {
  render: () => <Input type='text' defaultValue='Hello' />,
};

export const InputUncontrolled: Story = {
  render: () => <Input type='text' placeholder='타이핑해 보세요 (uncontrolled)' />,
};

export const ButtonDisabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
};
