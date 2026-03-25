import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProductInformationFrame from './ProductInformationFrame';

const meta: Meta<typeof ProductInformationFrame> = {
  title: 'UI/Frame/ProductInformationFrame',
  component: ProductInformationFrame,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '상품 이미지 위에 상품명, 가격, 작가 정보와 좋아요 버튼을 오버레이로 보여주는 프레임 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: '상품명',
    },
    rate: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '별점',
    },
    reviewCount: {
      control: { type: 'number', min: 0 },
      description: '리뷰 수',
    },
    photographer: {
      control: 'text',
      description: '작가명',
    },
    price: {
      control: { type: 'number', min: 0 },
      description: '가격',
    },
    isLiked: {
      control: 'boolean',
      description: '좋아요 여부',
    },
    handleClickLike: {
      action: 'clicked',
      description: '좋아요 버튼 클릭 핸들러',
    },
    width: {
      control: 'text',
      description: '이미지 너비',
    },
    height: {
      control: 'text',
      description: '이미지 높이',
    },
    moods: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    preload: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    image: {
      src: '/imgs/default-image.png',
      alt: '임시 이미지',
    },
    name: '잊지 못 할 졸업스냅',
    rate: 4.8,
    reviewCount: 20,
    photographer: '김작가',
    price: 80000,
    isLiked: false,
    width: '18.65rem',
    height: '26.6rem',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  args: {
    isLiked: true,
  },
};

export const LongContent: Story = {
  args: {
    name: '찰나의 순간을 오래 남기는 프리미엄 졸업 스냅 촬영',
    photographer: '작가 이름이 긴 포토그래퍼 스튜디오',
    reviewCount: 128,
    price: 135000,
  },
};
