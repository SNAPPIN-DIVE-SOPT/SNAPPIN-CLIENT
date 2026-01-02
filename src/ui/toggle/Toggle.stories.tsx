import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';
import { TabType } from './types/tabType';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tab: {
      control: { type: 'select' },
      options: ['client', 'author'] satisfies TabType[],
      description: '사용자 유형',
    },
  },
  args: {
    tab: 'client',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Client: Story = {
  args: {
    tab: 'client',
  },
};

export const Author: Story = {
  args: {
    tab: 'author',
  },
};
