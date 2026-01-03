import { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/ui';

const meta: Meta<typeof Input> = {
  title: 'input/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '입력해주세요',
  },
  parameters: {
    docs: {
      description: {
        component: 'Input 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StoryInput = StoryObj<typeof Input>;

export const DefaultInput: StoryInput = {};
