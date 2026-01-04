import { Meta, StoryObj } from '@storybook/react';
import Divider from '@/ui/divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'divider/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    thickness: 'small',
    color: 'gray-light',
  },
};

export const LargeDarkDivider: Story = {
  args: {
    thickness: 'large',
    color: 'gray-dark',
  },
};

export const SmallDarkDivider: Story = {
  args: {
    thickness: 'small',
    color: 'gray-dark',
  },
};

export const LargeLightDivider: Story = {
  args: {
    thickness: 'large',
    color: 'gray-light',
  },
};
