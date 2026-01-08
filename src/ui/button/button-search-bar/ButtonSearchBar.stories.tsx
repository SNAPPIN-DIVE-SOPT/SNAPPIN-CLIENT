import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonSearchBar from './ButtonSearchBar';

const meta: Meta<typeof ButtonSearchBar> = {
  title: 'button/ButtonSearchBar',
  component: ButtonSearchBar,
  tags: ['autodocs'],
  args: {
    headline: '어떤 스냅 작가를 찾고 있나요?',
    supportingText: '날짜, 스냅 종류, 지역 기반으로 정교한 검색',
    'aria-label': '스냅 작가 검색',
  },
  parameters: {
    docs: {
      description: {
        component:
          '검색 페이지/모달로 이동하기 위한 트리거 버튼 컴포넌트입니다. 입력이 필요한 경우 `SearchBar`(input)를 사용합니다. 스타일 커스터마이징은 `className`으로 하며, 내부 요소는 `data-slot` 선택자(`[data-slot=icon]`, `[data-slot=headline]`, `[data-slot=supporting]`)를 사용할 수 있습니다.',
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

type StoryButtonSearchBar = StoryObj<typeof ButtonSearchBar>;

export const Default: StoryButtonSearchBar = {};

export const WithoutSupportingText: StoryButtonSearchBar = {
  args: {
    supportingText: undefined,
  },
};

export const CustomClassName: StoryButtonSearchBar = {
  args: {
    className:
      'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.2)] text-white backdrop-blur-sm [&_[data-slot=icon]]:text-white [&_[data-slot=headline]]:text-white [&_[data-slot=supporting]]:text-[rgba(255,255,255,0.8)]',
  },
};
