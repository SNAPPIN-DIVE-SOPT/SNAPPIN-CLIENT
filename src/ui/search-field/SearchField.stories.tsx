import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeaderSearch, SearchBar } from '@/ui/search-field';

const meta: Meta<typeof SearchBar> = {
  title: 'input/SearchField',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'SearchField 공용 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='bg-black-2 flex min-h-[10rem] w-full max-w-180 items-start p-4'>
        <div className='w-full max-w-120'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type StorySearchBar = StoryObj<typeof SearchBar>;
type StoryHeaderSearch = StoryObj<typeof HeaderSearch>;

export const Default: StorySearchBar = {
  args: {
    placeholder: '장소 이름을 검색하세요',
    'aria-label': '장소 검색',
  },
};

export const Header: StoryHeaderSearch = {
  render: (args) => <HeaderSearch {...args} />,
  args: {
    headline: '어떤 스냅 작가를 찾고 있나요?',
    supportingText: '날짜, 스냅 종류, 지역 기반으로 정교한 검색',
    'aria-label': '스냅 작가 검색',
  },
};
