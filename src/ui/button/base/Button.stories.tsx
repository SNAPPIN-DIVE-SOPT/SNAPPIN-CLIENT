import { Meta, StoryObj } from '@storybook/react';
import Button from '@/ui/button/base/Button';

const meta: Meta<typeof Button> = {
  title: 'button/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    display: 'block',
    size: 'large',
    color: 'primary',
    disabled: false,
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        component: '기본 버튼 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StoryButton = StoryObj<typeof Button>;

export const DefaultLarge: StoryButton = {};

export const Disabled: StoryButton = {
  args: {
    disabled: true,
  },
};

export const PrimaryNeon: StoryButton = {
  args: {
    color: 'primary',
    children: 'Primary Neon Button',
  },
};

export const BlackButton: StoryButton = {
  args: {
    color: 'black',
    children: 'Black Button',
  },
};

export const TransparentButton: StoryButton = {
  args: {
    color: 'transparent',
    children: 'Transparent Button',
  },
};

export const SmallButton: StoryButton = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};
