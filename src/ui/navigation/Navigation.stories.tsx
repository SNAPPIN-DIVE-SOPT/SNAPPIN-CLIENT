import { Meta, StoryObj } from '@storybook/react';
import Navigation from '@/ui/navigation/Navigation';
import { IconArrowBack, IconSearch, IconAdd } from '@/assets';

const meta: Meta<typeof Navigation> = {
  title: 'Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '상단 네비게이션 바 컴포넌트입니다. left, center, right 영역에 컨텐츠를 배치할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='relative h-screen w-full max-w-180'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryNavigation = StoryObj<typeof Navigation>;

export const Default: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>Title</span>,
    right: <IconSearch />,
  },
};

export const WithCenterAndRight: StoryNavigation = {
  args: {
    center: <span className='text-black-10'>Title</span>,
    right: <IconSearch />,
  },
};

export const WithLeftAndRight: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    right: <IconSearch />,
  },
};

export const WithLeftAndCenter: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>Settings</span>,
  },
};

export const WithLeftAndCenterAndRight: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>My List</span>,
    right: <IconAdd />,
  },
};

export const OnlyCenter: StoryNavigation = {
  args: {
    center: <span className='text-black-10 text-lg font-semibold'>Center Title</span>,
  },
};
