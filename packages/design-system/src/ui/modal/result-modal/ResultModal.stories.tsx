import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ResultModal from './ResultModal';
import type { ModalButtonProps } from '../base/Modal';

const meta: Meta<typeof ResultModal> = {
  title: 'Modal/ResultModal',
  component: ResultModal,
    tags: ['autodocs'],
  args: {
    open: true,
    showCloseButton: false,
    type: 'success',
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
        component: '결과를 안내하는 ResultModal 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResultModal>;

export const Default: Story = {};

function ModalWrapper(props: Omit<React.ComponentProps<typeof ResultModal>, 'open' | 'handleOpenChange'>) {
  const [open, setOpen] = useState(true);

  const buttons: ModalButtonProps[] = (props.buttons ?? []).map(button => ({
    ...button,
    onClick: () => setOpen(false),
  }));

  return (
    <ResultModal
      {...props}
      open={open}
      handleOpenChange={setOpen}
      buttons={buttons}
    />
  );
}

export const Success: Story = {
  render: () => (
    <ModalWrapper
      showCloseButton={false}
      type='success'
      title='예약 요청이 완료되었어요!'
      description="'내 예약'에서 진행 상황을 확인해보세요"
      buttons={[
        {
          label: '닫기',
          size: 'medium',
          color: 'disabled',
        },
        {
          label: '내 예약 확인',
          size: 'medium',
          color: 'black',
        },
      ]}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ModalWrapper
      showCloseButton={false}
      type='error'
      title={'결제 요청에 실패했습니다.\n잠시 후 다시 시도해 주세요.'}
      buttons={[
        {
          label: '닫기',
          size: 'medium',
          color: 'disabled',
        },
        {
          label: '결제하기',
          size: 'medium',
          color: 'black',
        },
      ]}
    />
  ),
};