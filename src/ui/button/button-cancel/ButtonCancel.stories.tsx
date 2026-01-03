import { Meta, StoryObj } from '@storybook/react';
import ButtonCancel from './ButtonCancel';

const meta: Meta<typeof ButtonCancel> = {
  title: 'Button/ButtonCancel',
  component: ButtonCancel,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: '취소 버튼 컴포넌트입니다. 닫기 아이콘이 포함된 원형 버튼입니다.',
      },
    },
  },
};

export default meta;

type StoryButtonCancel = StoryObj<typeof ButtonCancel>;

export const Default: StoryButtonCancel = {};

export const Disabled: StoryButtonCancel = {
  args: {
    disabled: true,
  },
};

