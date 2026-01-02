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
        'WARM',
        'FRESH',
        'CLEAR',
        'SUNNY',
        'DREAMY',
        'CHIC',
        'CALM',
        'VIVID',
        'DIRECTED',
        'CINEMATIC',
        'NATURAL',
        'SCENERY',
        'ROUGH',
        'SEASONAL',
        'ANALOG',
        'UNIQUE',
      ],
      description: '무드',
    },
  },
  args: {
    variant: 'neon',
    label: 'WARM',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Neon: Story = {
  args: {
    variant: 'neon',
    label: 'WARM',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
    label: 'WARM',
  },
};
