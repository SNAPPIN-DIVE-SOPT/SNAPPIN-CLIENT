import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DateCell from './DateCell';

const meta: Meta<typeof DateCell> = {
  title: 'date/DateCell',
  component: DateCell,
  tags: ['autodocs'],
  args: {
    value: '1',
    iso: '2025-01-01',
    isSelected: false,
    isDisabled: false,
    isToday: false,
  },
};

export default meta;

type Story = StoryObj<typeof DateCell>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    value: '15',
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
