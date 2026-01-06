import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageCarousel from './ImageCarousel';

const meta: Meta<typeof ImageCarousel> = {
  title: 'carousel/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '이미지 캐러셀 컴포넌트입니다. 하단에 그라데이션 오버레이가 적용된 이미지를 표시합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: '이미지 소스 URL',
    },
    alt: {
      control: { type: 'text' },
      description: '이미지 대체 텍스트',
    },
    className: {
      control: { type: 'text' },
      description: '컨테이너 추가 CSS 클래스',
    },
    imageHeight: {
      control: { type: 'text' },
      description: '이미지 높이 (rem 단위)',
    },
    imageWidth: {
      control: { type: 'text' },
      description: '이미지 너비',
    },
  },
  args: {
    src: 'https://picsum.photos/576/576?random=1',
    alt: 'Sample image',
    imageHeight: '36rem',
    imageWidth: '36rem',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/576/576?random=1',
    alt: 'Default image',
    imageHeight: '36rem',
    imageWidth: '36rem',
  },
};

export const WithCustomSize: Story = {
  args: {
    src: 'https://picsum.photos/576/576?random=1',
    alt: 'Custom size image',
    imageHeight: '3.5rem',
    imageWidth: '3.5rem',
  },
};

export const WithCustomClassName: Story = {
  args: {
    src: 'https://picsum.photos/576/576?random=4',
    alt: 'Custom className image',
    className: 'rounded-[3rem]',
    imageHeight: '36rem',
    imageWidth: '20rem',
  },
};
