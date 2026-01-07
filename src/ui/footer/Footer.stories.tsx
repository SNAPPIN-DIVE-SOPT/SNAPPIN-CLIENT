import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from '@/ui/footer/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
  args: {
    userRole: 'user',
  },
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
      <div className='relative h-screen w-full max-w-180'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryFooter = StoryObj<typeof Footer>;

export const Default: StoryFooter = {
  args: {
    userRole: 'user',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const AuthorDefault: StoryFooter = {
  args: {
    userRole: 'author',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};
