import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FilterChip, { FilterChipProps } from './FilterChip';
import { MOOD_CODE } from '@/types/moodCode';

const meta: Meta<typeof FilterChip> = {
  title: 'chip/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '필터칩 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'select' },
      options: MOOD_CODE,
      description: '무드',
    },
    isSelected: {
      control: { type: 'boolean' },
      description: '선택 여부',
    },
    onClick: { action: 'clicked' },
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const FilterChipWithState = (args: FilterChipProps) => {
  const [selected, setSelected] = useState(args.isSelected);

  const handleClick = (label: string) => {
    setSelected((prev) => !prev);
    args.onClick?.(label);
  };

  return <FilterChip {...args} isSelected={selected} onClick={handleClick} onRemove={undefined} />;
};

const FilterChipsWithState = () => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const handleClick = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    );
  };

  const handleRemove = (mood: string) => {
    setSelectedMoods((prev) => prev.filter((m) => m !== mood));
  };

  return (
    <div className='flex max-w-[45rem] flex-col gap-4'>
      <div className='flex flex-wrap gap-2'>
        {selectedMoods.map((mood) => (
          <FilterChip key={mood} label={mood} isSelected onRemove={handleRemove} />
        ))}
      </div>

      <div className='flex flex-wrap gap-2'>
        {MOOD_CODE.map((mood) => (
          <FilterChip
            key={mood}
            label={mood}
            isSelected={selectedMoods.includes(mood)}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    label: '따스한',
    isSelected: false,
  },
  render: FilterChipWithState,
};

export const Selected: Story = {
  args: {
    label: '따스한',
    isSelected: true,
  },
  render: FilterChipWithState,
};

export const Removable: Story = {
  args: {
    label: '따스한',
    isSelected: true,
  },
};

export const FilteringSection: Story = {
  render: FilterChipsWithState,
};
