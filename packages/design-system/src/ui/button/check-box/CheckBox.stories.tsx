import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'Button/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  args: {
    isChecked: false,
  },
  parameters: {
    docs: {
      description: {
        component: '선택 여부에 따라 스타일이 달라지는 체크박스 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};
