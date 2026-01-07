import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    color: 'bg-black-3',
  },
};

export const LargeDarkDivider: Story = {
  args: {
    thickness: 'large',
    color: 'bg-black-5',
  },
};

export const SmallDarkDivider: Story = {
  args: {
    thickness: 'small',
    color: 'bg-black-5',
  },
};

export const LargeLightDivider: Story = {
  args: {
    thickness: 'large',
    color: 'bg-black-3',
  },
};
