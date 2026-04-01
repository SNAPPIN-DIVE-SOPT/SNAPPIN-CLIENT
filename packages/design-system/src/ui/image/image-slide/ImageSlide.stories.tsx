import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageSlide from './ImageSlide';

const meta: Meta<typeof ImageSlide> = {
  title: 'UI/ImageSlide',
  component: ImageSlide,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '3개의 이미지가 회전하는 이미지 슬라이드입니다.',
      },
    },
  },
};

export default meta;

type StoryImageSlide = StoryObj<typeof ImageSlide>;

export const Default: StoryImageSlide = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const data = {
      portfolios: [
        {
          imageUrl: 'https://picsum.photos/seed/1/242/357',
          moods: ['투명한', '연출된', '몽환적인'],
          photographerName: '봄날사진관',
        },
        {
          imageUrl: 'https://picsum.photos/seed/2/242/357',
          moods: ['Y2K', '차가운', '연출된'],
          photographerName: '나작가',
        },
        {
          imageUrl: 'https://picsum.photos/seed/3/242/357',
          moods: ['투명한', '따스한', '뚜렷한'],
          photographerName: '호지필름',
        },
      ],
    };

    return <ImageSlide data={data.portfolios} />;
  },
};