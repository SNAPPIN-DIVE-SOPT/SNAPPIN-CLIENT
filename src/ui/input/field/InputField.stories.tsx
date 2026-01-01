import { Meta, StoryObj } from '@storybook/react';
import InputField from '@/ui/input/field/InputField';

const meta: Meta<typeof InputField> = {
  title: 'InputField',
  tags: ['autodocs'],
  component: InputField,
  args: {
    id: 'input-field',
    label: '이름',
    placeholder: '이름을 입력해주세요',
    required: false,
    errorText: '',
  },
  parameters: {
    docs: {
      description: {
        component: 'InputField 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StoryInputField = StoryObj<typeof InputField>;

export const DefaultInputField: StoryInputField = {};
