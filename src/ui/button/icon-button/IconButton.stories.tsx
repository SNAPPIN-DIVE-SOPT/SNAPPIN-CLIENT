import { Meta, StoryObj } from '@storybook/nextjs-vite';
import IconButton from './IconButton';
import { IconClose } from '@/assets';

const meta: Meta<typeof IconButton> = {
  title: 'Button/IconButton',
  component: IconButton,
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

type StoryIconButton = StoryObj<typeof IconButton>;

export const Default: StoryIconButton = {
  args: {
    children: <IconClose />,
  },
};
