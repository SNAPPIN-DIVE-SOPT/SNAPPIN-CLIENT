import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FilterButton, { FilterButtonProps } from './FilterButton';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';
import { TAG_LABEL } from '@/ui/chip/tag-chip/constants/tagLabel';
import { FilterButtonStatus } from './types/filterButtonStatus';

const TAGS = Object.keys(TAG_LABEL) as TagCode[];

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
      options: TAGS,
      description: '무드',
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'selected', 'removable'],
      description: '선택 여부'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const FilterButtonWithState = (args: FilterButtonProps) => {
  const [status, setStatus] = useState<FilterButtonStatus>(args.status);
  const handleClick = () => {
    setStatus((prev) => (prev === 'default' ? 'selected' : 'default'));
  };

  return (
    <FilterButton
      label={args.label}
      status={status}
      onClick={handleClick}
    />
  );
};

const FilterButtonsWithState = () => {
  const [selectedTags, setSelectedTags] = useState<TagCode[]>([]);
  const handleClick = (tag: TagCode) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
  const getStatus = (tag: TagCode) => selectedTags.includes(tag) ? 'selected' : 'default';

  return (
    <div className='flex flex-col gap-[1rem] max-w-[45rem]'>
      <div className='flex flex-wrap gap-[0.4rem]'>
        {selectedTags.map((selectedTag) => (
          <FilterButton
            key={selectedTag}
            label={selectedTag}
            status='removable'
            onClick={() => handleClick(selectedTag)}
          />
        ))}
      </div>

      <div className='flex flex-wrap gap-[0.4rem]'>
        {TAGS.map((tag) => (
          <FilterButton
            key={tag}
            label={tag}
            status={getStatus(tag)}
            onClick={() => handleClick(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    label: 'WARM',
    status: 'default'
  },
  argTypes: {
    status: {
      control: false,
    },
  },
  render: FilterButtonWithState,
};

export const Selected: Story = {
  args: {
    label: 'WARM',
    status: 'selected',
  },
  argTypes: {
    status: {
      control: false,
    },
  },
  render: FilterButtonWithState,
};

export const Removable: Story = {
  args: {
    label: 'WARM',
    status: 'removable',
  },
  argTypes: {
    status: {
      control: false,
    },
  },
};

export const FilteringSection: Story = {
  argTypes: {
    label: {
      control: false,
    },
    status: {
      control: false,
    },
  },
  render: FilterButtonsWithState,
};