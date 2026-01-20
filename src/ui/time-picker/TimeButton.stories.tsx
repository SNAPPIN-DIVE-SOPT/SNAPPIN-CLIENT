import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TimeButton from './TimeButton';

const meta: Meta<typeof TimeButton> = {
  title: 'UI/TimeButton',
  component: TimeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'selected'],
      description: '버튼 상태',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부',
    },
    time: {
      control: { type: 'text' },
      description: '표시 시간',
    },
  },
  args: {
    time: '09:30',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    state: 'selected',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
