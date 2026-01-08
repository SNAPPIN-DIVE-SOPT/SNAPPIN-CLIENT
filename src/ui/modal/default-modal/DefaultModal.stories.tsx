import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalButtonProps } from '../base/Modal';
import DefaultModal from './DefaultModal';
import { DefaultModalType } from './types/type';
import { Content } from './constants/content';

type DefaultProps = {
  type: 'default';
  content: Content;
  buttons: ModalButtonProps[];
};

type PresetProps = {
  type: Exclude<DefaultModalType, 'default'>;
};

type StatefulDefaultModalProps = DefaultProps | PresetProps;

function StatefulDefaultModal(props: StatefulDefaultModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    alert('handleRightClick 실행 완료');
    setOpen(false);
  }

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>모달 열기</button>

      {props.type === 'default'
        ? <DefaultModal
            open={open}
            handleOpenChange={handleOpenChange}
            showCloseButton={false}
            type='default'
            content={props.content}
            buttons={props.buttons}
          />
        : <DefaultModal
            open={open}
            handleOpenChange={handleOpenChange}
            showCloseButton={false}
            type={props.type}
            buttons={[
              { onClick: handleClose },
              { onClick: handleConfirm },
            ]}
          />
      }
    </>
  );
}

const meta: Meta = {
  title: 'Modal/DefaultModal',
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
  render: () => <StatefulDefaultModal type='success' />,
};

export const Error: Story = {
  render: () => <StatefulDefaultModal type='error' />,
};

export const Refused: Story = {
  render: () => (
    <StatefulDefaultModal
      type='default'
      content={{
        title: { type: 'single', text: '예약을 거절할까요?' },
      }}
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled' },
        { label: '네, 거절할게요', size: 'medium', color: 'black' },
      ]}
    />
  ),
};

export const Canceled: Story = {
  render: () => (
    <StatefulDefaultModal
      type='default'
      content={{
        title: { type: 'multiple', text: ['예약하신 스냅 일정을', '취소할까요?'] },
      }}
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled' },
        { label: '네, 취소할게요', size: 'medium', color: 'black' },
      ]}
    />
  ),
};

export const Confirmed: Story = {
  render: () => (
    <StatefulDefaultModal
      type='default'
      content={{
        title: { type: 'single', text: '예약을 확정할까요?' },
      }}
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled' },
        { label: '네, 확정할게요', size: 'medium', color: 'black' },
      ]}
    />
  ),
};