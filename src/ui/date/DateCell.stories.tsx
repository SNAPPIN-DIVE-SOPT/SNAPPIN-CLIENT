import { Meta, StoryObj } from '@storybook/react';
import DateCell from './DateCell';

const meta: Meta<typeof DateCell> = {
  title: 'date/DateCell',
  component: DateCell,
  tags: ['autodocs'],
  args: {
    value: '15',
    isSelected: false,
    isDisabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof DateCell>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
