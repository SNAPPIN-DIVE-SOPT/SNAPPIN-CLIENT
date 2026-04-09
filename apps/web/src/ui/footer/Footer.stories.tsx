import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { USER_TYPE } from '@snappin/shared/types';
import FooterClient from './Footer.client';
import { getMenuItems } from './constants/menu';

const meta: Meta<typeof FooterClient> = {
  title: 'UI/Footer',
  component: FooterClient,
  tags: ['autodocs'],
  args: {
    initialUserType: USER_TYPE.CLIENT,
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
        <div className='z-20'>
          <div className='bg-black-1 footer-height pointer-events-none' aria-hidden />
          <footer className='border-black-5 footer-height fixed-center bg-black-1 bottom-0 flex items-center justify-between border-t-[0.5px] px-[2rem] pt-[0.2rem] pb-[0.6rem]'>
            <Story />
          </footer>
        </div>
      </div>
    ),
  ],
};

export default meta;

type StoryFooter = StoryObj<typeof FooterClient>;

const FooterPhotographerStory = () => {
  const menuItems = getMenuItems(true, USER_TYPE.PHOTOGRAPHER);

  return (
    <>
      {menuItems.map((menuItem) => {
        const isActive = menuItem.href === '/';
        const Icon = isActive ? menuItem.activeIcon : menuItem.inactiveIcon;

        return (
          <button
            key={menuItem.label}
            type='button'
            className='relative flex h-[4.8rem] w-[4.8rem] flex-col items-center justify-center gap-[0.2rem]'
            aria-label={menuItem.label}
          >
            {Icon}
            <span className='caption-10-md'>{menuItem.label}</span>
          </button>
        );
      })}
    </>
  );
};

export const Default: StoryFooter = {
  args: {
    initialUserType: USER_TYPE.CLIENT,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const PhotographerDefault: StoryFooter = {
  render: () => <FooterPhotographerStory />,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};
