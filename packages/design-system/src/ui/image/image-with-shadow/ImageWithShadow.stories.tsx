import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageWithShadow } from '../..';

const meta: Meta<typeof ImageWithShadow> = {
  title: 'UI/Image/ImageWithShadow',
  component: ImageWithShadow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '하단 그라데이션 그림자가 있는 이미지 컴포넌트입니다. 이미지 크기는 rem 단위로 지정합니다.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: '이미지 경로',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
    imageWidth: {
      control: 'text',
      description: '이미지 너비 (rem 단위)',
    },
    imageHeight: {
      control: 'text',
      description: '이미지 높이 (rem 단위)',
    },
    className: {
      control: 'text',
      description: '컨테이너에 적용할 클래스',
    },
  },
  args: {
    src: '/imgs/image-default.png',
    alt: '그림자 이미지',
    imageWidth: '20rem',
    imageHeight: '28rem',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
