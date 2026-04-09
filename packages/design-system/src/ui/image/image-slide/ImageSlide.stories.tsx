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
  render: () => <ImageSlide />
};

export const NeonOutline: StoryImageSlide = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <ImageSlide tagChipVariant='neon-outline' />
};