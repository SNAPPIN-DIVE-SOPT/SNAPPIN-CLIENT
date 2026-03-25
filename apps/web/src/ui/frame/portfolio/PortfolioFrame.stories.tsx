import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PortfolioFrame from './PortfolioFrame';

const meta: Meta<typeof PortfolioFrame> = {
  title: 'UI/Frame/PortfolioFrame',
  component: PortfolioFrame,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: 'object',
    },
    isLiked: {
      control: 'boolean',
    },
    likesCount: {
      control: { type: 'number', min: 0 },
    },
  },
  args: {
    image: {
      src: '/imgs/default-image.png',
      alt: '포트폴리오 이미지',
    },
    isLiked: false,
    likesCount: 128,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  args: {
    isLiked: true,
    likesCount: 256,
  },
};
