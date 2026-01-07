import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from './Modal';
import { ModalType } from './types/modalType';

type ModalWithStateProps = {
  type: ModalType;
};

function ModalWithState({ type }: ModalWithStateProps) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    alert('handleRightClick 실행 완료');
    setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>모달 열기</button>

      <Modal
        type={type}
        open={open}
        handleOpenChange={handleOpenChange}
        handleLeftClick={handleClose}
        handleRightClick={handleConfirm}
      />
    </>
  );
}

const meta: Meta = {
  title: 'Modal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모달 컴포넌트입니다.',
      }
    }
  },
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => <ModalWithState type='success' />,
};

export const Error: Story = {
  render: () => <ModalWithState type='error' />,
};

export const Rejected: Story = {
  render: () => <ModalWithState type='rejected' />,
};

export const Cancelled: Story = {
  render: () => <ModalWithState type='cancelled' />,
};

export const Confirmed: Story = {
  render: () => <ModalWithState type='confirmed' />,
};