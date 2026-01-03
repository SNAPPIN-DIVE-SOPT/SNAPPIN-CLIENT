import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ButtonAddMinus from './ButtonAddMinus';

const meta: Meta<typeof ButtonAddMinus> = {
  title: 'ButtonAddMinus',
  component: ButtonAddMinus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '숫자 증가/감소 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: '현재 값',
    },
    isDisabledMinus: {
      control: { type: 'boolean' },
      description: '감소 버튼 비활성화 여부',
    },
    isDisabledAdd: {
      control: { type: 'boolean' },
      description: '증가 버튼 비활성화 여부',
    },
    handleClickMinus: {
      action: 'minus clicked',
      description: '감소 버튼 클릭 핸들러',
    },
    handleClickAdd: {
      action: 'add clicked',
      description: '증가 버튼 클릭 핸들러',
    },
  },
  decorators: [
    (Story, context) => {
      const [value, setValue] = useState(context.args.value || 1);
      return (
        <Story
          args={{
            ...context.args,
            value,
            handleClickMinus: () => {
              const newValue = Number(value) - 1;
              if (newValue >= Number(context.args.isDisabledMinus || 0)) {
                setValue(newValue);
              }
            },
          }}
        />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    isDisabledMinus: false,
    isDisabledAdd: false,
  },
};

export const AtMinimum: Story = {
  args: {
    value: 0,
    isDisabledMinus: true,
    isDisabledAdd: false,
  },
};

export const AtMaximum: Story = {
  args: {
    value: 10,
    isDisabledMinus: false,
    isDisabledAdd: true,
  },
};
