import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CarouselCuration from './CarouselCuration';

const meta: Meta<typeof CarouselCuration> = {
  title: 'CarouselCuration',
  component: CarouselCuration,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '큐레이션 이미지 캐러셀 컴포넌트입니다. 이미지 슬라이드, 태그, 작가 정보를 표시합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    images: {
      control: { type: 'object' },
      description: '이미지 배열 (src, alt)',
    },
    tags: {
      control: { type: 'object' },
      description: '태그 코드 배열',
    },
    name: {
      control: { type: 'text' },
      description: '작가 이름',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
  args: {
    images: [
      { src: 'https://picsum.photos/576/576?random=1', alt: 'Image 1' },
      { src: 'https://picsum.photos/576/576?random=2', alt: 'Image 2' },
      { src: 'https://picsum.photos/576/576?random=3', alt: 'Image 3' },
    ],
    tags: ['WARM', 'DREAMY', 'CINEMATIC'],
    name: '작가 이름',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/576/576?random=1', alt: 'Image 1' },
      { src: 'https://picsum.photos/576/576?random=2', alt: 'Image 2' },
      { src: 'https://picsum.photos/576/576?random=3', alt: 'Image 3' },
    ],
    tags: ['WARM', 'DREAMY', 'CINEMATIC'],
    name: '작가 이름',
  },
};

export const SingleImage: Story = {
  args: {
    images: [{ src: 'https://picsum.photos/576/576?random=4', alt: 'Single Image' }],
    tags: ['NATURAL'],
    name: '단일 이미지 작가',
  },
};

export const MultipleImages: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/576/576?random=5', alt: 'Image 1' },
      { src: 'https://picsum.photos/576/576?random=6', alt: 'Image 2' },
      { src: 'https://picsum.photos/576/576?random=7', alt: 'Image 3' },
      { src: 'https://picsum.photos/576/576?random=8', alt: 'Image 4' },
      { src: 'https://picsum.photos/576/576?random=9', alt: 'Image 5' },
    ],
    tags: ['WARM', 'FRESH', 'CLEAR', 'SUNNY', 'DREAMY'],
    name: '다중 이미지 작가',
  },
};

export const LongName: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/576/576?random=12', alt: 'Image 1' },
      { src: 'https://picsum.photos/576/576?random=13', alt: 'Image 2' },
    ],
    tags: ['CINEMATIC', 'NATURAL'],
    name: '매우 긴 작가 이름이 표시되는 경우 테스트',
  },
};
