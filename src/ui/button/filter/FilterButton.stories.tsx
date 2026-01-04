import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterButton, { FilterButtonProps } from './FilterButton';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';
import { TAG_LABEL } from '@/ui/chip/tag-chip/constants/tagLabel';

const meta: Meta<typeof FilterButton> = {
  title: 'Button/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '필터 버튼 컴포넌트입니다.',
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
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
      ] satisfies TagCode[],
      description: '무드',
    },
    isSelected: {
      control: { type: 'select' },
      options: [true, false],
      description: '선택 여부'
    },
    removable: {
      control: { type: 'select' },
      options: [undefined, true],
      description: '제거 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = Object.keys(TAG_LABEL) as TagCode[];

const FilterButtonWithState = (args: FilterButtonProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(args.isSelected);
  const handleToggle = () => setIsSelected((prev) => !prev);

  return (
    <FilterButton
      label={args.label}
      isSelected={isSelected}
      onClick={handleToggle}
    />
  );
}

const FilterButtonsWithState = () => {
  const [selectedTags, setSelectedTags] = useState<TagCode[]>([]);
  const handleToggle = (tag: TagCode) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className='flex flex-col gap-[1rem] max-w-[45rem]'>
      <div className='flex flex-wrap gap-[0.4rem]'>
        {selectedTags.map((selectedTag) => (
          <FilterButton
            key={selectedTag}
            label={selectedTag}
            isSelected
            removable
            onClick={() => handleToggle(selectedTag)}
          />
        ))}
      </div>

      <div className='flex flex-wrap gap-[0.4rem]'>
        {TAGS.map((tag) => (
          <FilterButton
            key={tag}
            label={tag}
            isSelected={selectedTags.includes(tag)}
            onClick={() => handleToggle(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    label: 'WARM',
    isSelected: false,
    removable: undefined,
  },
  render: FilterButtonWithState,
};

export const Selected: Story = {
  args: {
    label: 'WARM',
    isSelected: true,
    removable: undefined,
  },
  render: FilterButtonWithState,
};

export const Removable: Story = {
  args: {
    label: 'WARM',
    isSelected: true,
    removable: true,
  },
};

export const FilteringSection: Story = {
  render: FilterButtonsWithState,
};