import { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderSearch from './HeaderSearch';

const meta: Meta<typeof HeaderSearch> = {
  title: 'button/HeaderSearch',
  component: HeaderSearch,
  tags: ['autodocs'],
  args: {
    headline: '어떤 스냅 작가를 찾고 있나요?',
    supportingText: '날짜, 스냅 종류, 지역 기반으로 정교한 검색',
    'aria-label': '스냅 작가 검색',
  },
  parameters: {
    docs: {
      description: {
        component: '검색 페이지/모달로 이동하기 위한 트리거 버튼 컴포넌트입니다.',
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

type StoryHeaderSearch = StoryObj<typeof HeaderSearch>;

export const Default: StoryHeaderSearch = {};
