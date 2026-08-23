import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConfirmModal } from '../..';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Modal/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  args: {
    open: true,
    showCloseButton: false,
    title: '제목',
    description: '설명',
    buttons: [
      { label: '왼쪽 버튼', size: 'medium', color: 'disabled', onClick: () => alert('버튼 클릭') },
      { label: '오른쪽 버튼', size: 'medium', color: 'black', onClick: () => alert('버튼 클릭') },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: '사용자의 의사를 확인하는 ConfirmModal 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {};
