import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConfirmModal from './ConfirmModal';
import type { ModalButtonProps } from '../base/Modal';

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
    ]
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

function ModalWrapper(props: Omit<React.ComponentProps<typeof ConfirmModal>, 'open' | 'handleOpenChange'>) {
  const [open, setOpen] = useState(true);

  const buttons: ModalButtonProps[] = (props.buttons ?? []).map(button => ({
    ...button,
    onClick: () => setOpen(false),
  }));

  return (
    <ConfirmModal
      {...props}
      open={open}
      handleOpenChange={setOpen}
      buttons={buttons}
    />
  );
}

export const Canceled: Story = {
  render: () => (
    <ModalWrapper
      showCloseButton={false}
      title={'예약하신 스냅 일정을\n취소할까요?'}
      buttons={[
        {
          label: '아니요',
          size: 'medium',
          color: 'disabled',
        },
        {
          label: '네, 취소할게요',
          size: 'medium',
          color: 'black',
        },
      ]}
    />
  ),
};

export const Refused: Story = {
  render: () => (
    <ModalWrapper
      showCloseButton={false}
      title={'예약을 거절할까요?'}
      buttons={[
        {
          label: '아니요',
          size: 'medium',
          color: 'disabled',
        },
        {
          label: '네, 거절할게요',
          size: 'medium',
          color: 'black',
        },
      ]}
    />
  ),
};

export const Confirmed: Story = {
  render: () => (
    <ModalWrapper
      showCloseButton={false}
      title={'예약을 확정할까요?'}
      buttons={[
        {
          label: '아니요',
          size: 'medium',
          color: 'disabled',
        },
        {
          label: '네, 확정할게요',
          size: 'medium',
          color: 'black',
        },
      ]}
    />
  ),
};