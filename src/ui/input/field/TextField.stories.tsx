import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@/ui';

const meta: Meta<typeof TextField> = {
  title: 'input/TextField',
  tags: ['autodocs'],
  component: TextField,
  args: {
    id: 'text-field',
    label: '이름',
    placeholder: '이름을 입력해주세요',
    required: false,
    helpText: '',
  },
  parameters: {
    docs: {
      description: {
        component: 'TextField 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StoryInputField = StoryObj<typeof TextField>;

export const DefaultInputField: StoryInputField = {};
