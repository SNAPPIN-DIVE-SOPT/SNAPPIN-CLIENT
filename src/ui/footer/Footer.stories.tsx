import { Meta, StoryObj } from '@storybook/react';
import Footer from '@/ui/footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '하단 네비게이션 푸터 컴포넌트입니다.',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='relative h-screen w-full max-w-[45rem]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryFooter = StoryObj<typeof Footer>;

export const Default: StoryFooter = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const ActiveExplore: StoryFooter = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/explore',
      },
    },
  },
};

export const ActiveReservations: StoryFooter = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/reservations',
      },
    },
  },
};

export const ActiveProfile: StoryFooter = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/profile',
      },
    },
  },
};
