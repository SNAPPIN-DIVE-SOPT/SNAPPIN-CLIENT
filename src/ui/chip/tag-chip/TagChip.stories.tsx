import type { Meta, StoryObj } from '@storybook/react';
import TagChip from './TagChip';

const meta: Meta<typeof TagChip> = {
  title: 'Chip/TagChip',
  component: TagChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neon', 'gray', 'transparent'],
      description: '태그칩 종류',
    },
    label: {
      control: { type: 'select' },
      options: [
        '따스한',
        '청량한',
        '투명한',
        '몽환적인',
        '뚜렷한',
        '차가운',
        '디지털',
        '아날로그',
        'Y2K',
        '내추럴',
        '연출된',
        '서사적인',
      ],
      description: '무드',
    },
  },
  args: {
    variant: 'neon',
    label: '따스한',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Neon: Story = {
  args: {
    variant: 'neon',
    label: '따스한',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
    label: '따스한',
  },
};
