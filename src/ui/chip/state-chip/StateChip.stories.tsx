import type { Meta, StoryObj } from '@storybook/react';
import StateChip from './StateChip';

const meta: Meta<typeof StateChip> = {
  title: 'Chip/StateChip',
  component: StateChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'select' },
      options: [
        'RESERVATION_REQUESTED',
        'AUTHOR_CONFIRMING',
        'PAYMENT_REQUESTED',
        'PAYMENT_COMPLETED',
        'RESERVATION_COMPLETED',
        'RESERVATION_CANCELLED',
        'SHOOT_COMPLETED',
      ],
      description: '예약 상태',
    },
  },
  args: {
    label: 'RESERVATION_REQUESTED',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 예약요청: Story = {
  args: {
    label: 'RESERVATION_REQUESTED',
  },
};

export const 작가확인중: Story = {
  args: {
    label: 'AUTHOR_CONFIRMING',
  },
};

export const 결제요청: Story = {
  args: {
    label: 'PAYMENT_REQUESTED',
  },
};

export const 결제완료: Story = {
  args: {
    label: 'PAYMENT_COMPLETED',
  },
};

export const 예약확정: Story = {
  args: {
    label: 'RESERVATION_COMPLETED',
  },
};

export const 예약취소: Story = {
  args: {
    label: 'RESERVATION_CANCELLED',
  },
};

export const 촬영완료: Story = {
  args: {
    label: 'SHOOT_COMPLETED',
  },
};
