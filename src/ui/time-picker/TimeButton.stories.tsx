import type { Meta, StoryObj } from '@storybook/react';

import { TimeButton } from './TimeButton';

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
      options: ['default', 'selected', 'disabled'],
      description: '버튼 상태',
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
    state: 'disabled',
  },
};
