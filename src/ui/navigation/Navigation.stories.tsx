import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navigation from '@/ui/navigation/Navigation';
import { IconArrowBack, IconSearch, IconAdd } from '@/assets';

const meta: Meta<typeof Navigation> = {
  title: 'UI/Navigation',
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
  argTypes: {
    isSticky: {
      control: 'boolean',
      description: '네비게이션을 sticky로 고정할지 여부',
    },
    isFixed: {
      control: 'boolean',
      description: '네비게이션을 fixed로 고정할지 여부',
    },
    left: {
      control: false,
      description: '왼쪽 영역에 표시할 컨텐츠',
    },
    center: {
      control: false,
      description: '중앙 영역에 표시할 컨텐츠',
    },
    right: {
      control: false,
      description: '오른쪽 영역에 표시할 컨텐츠',
    },
  },
  decorators: [
    (Story) => (
      <div className='bg-black-10 relative h-screen w-[45rem]'>
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
    isFixed: true,
  },
};

export const WithCenterAndRight: StoryNavigation = {
  args: {
    center: <span className='text-black-10'>Title</span>,
    right: <IconSearch />,
    isFixed: true,
  },
};

export const WithLeftAndRight: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    right: <IconSearch />,
    isFixed: true,
  },
};

export const WithLeftAndCenter: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>Settings</span>,
    isFixed: true,
  },
};

export const WithLeftAndCenterAndRight: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>My List</span>,
    right: <IconAdd />,
    isFixed: true,
  },
};

export const OnlyCenter: StoryNavigation = {
  args: {
    center: <span className='text-black-10 text-lg font-semibold'>Center Title</span>,
    isFixed: true,
  },
};

export const Sticky: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>Sticky Navigation</span>,
    right: <IconSearch />,
    isSticky: true,
  },
};

export const Fixed: StoryNavigation = {
  args: {
    left: <IconArrowBack />,
    center: <span className='text-black-10'>Fixed Navigation</span>,
    right: <IconAdd />,
    isFixed: true,
  },
};
