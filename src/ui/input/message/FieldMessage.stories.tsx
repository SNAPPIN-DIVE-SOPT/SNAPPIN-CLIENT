import { Meta, StoryObj } from '@storybook/react';
import { FieldMessage } from '@/ui';

const meta: Meta<typeof FieldMessage> = {
  title: 'input/FieldMessage',
  tags: ['autodocs'],
  component: FieldMessage,
  args: {
    id: 'field-message',
    message: '도움말 메시지입니다.',
    variant: 'help',
  },
  parameters: {
    docs: {
      description: {
        component: 'FieldMessage 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StoryInputField = StoryObj<typeof FieldMessage>;

export const DefaultInputField: StoryInputField = {};

export const ErrorMessage: StoryInputField = {
  args: {
    message: '에러 메시지입니다.',
    variant: 'error',
  },
};

export const SuccessMessage: StoryInputField = {
  args: {
    message: '성공 메시지입니다.',
    variant: 'success',
  },
};

export const HelpMessage: StoryInputField = {
  args: {
    message: '도움말 메시지입니다.',
    variant: 'help',
  },
};
