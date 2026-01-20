import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ChangeEvent, type ComponentProps, useState } from 'react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'input/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    placeholder: '장소 이름을 검색하세요',
    'aria-label': '장소 검색',
  },
  parameters: {
    docs: {
      description: {
        component:
          '입력이 가능한 검색 input 컴포넌트입니다. 검색 페이지/모달 트리거 용도는 `ButtonSearchBar`(button)를 사용합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='bg-black-2 flex w-full items-start p-4'>
        <div className='w-full'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type StorySearchBar = StoryObj<typeof SearchBar>;

export const Default: StorySearchBar = {};

export const WithDefaultValue: StorySearchBar = {
  args: {
    defaultValue: '제주',
  },
};

export const WithCustomContainer: StorySearchBar = {
  args: {
    containerClassName: 'bg-black-1 border border-black-5',
  },
};

export const WithCustomIcon: StorySearchBar = {
  args: {
    iconClassName: 'text-red-500',
  },
};

type ControlledSearchBarStoryProps = ComponentProps<typeof SearchBar>;

const ControlledSearchBarStory = (args: ControlledSearchBarStoryProps) => {
  const initialValue = typeof args.value === 'string' ? args.value : '';
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <SearchBar {...args} value={value} onChange={handleChange} />;
};

export const Controlled: StorySearchBar = {
  render: (args) => <ControlledSearchBarStory {...args} />,
  args: {
    value: '서울',
  },
};
