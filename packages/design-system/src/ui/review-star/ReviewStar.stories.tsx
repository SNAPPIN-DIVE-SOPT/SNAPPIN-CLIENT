import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ReviewStar from './ReviewStar';

const meta: Meta<typeof ReviewStar> = {
  title: 'UI/ReviewStar',
  component: ReviewStar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '별점을 표시하는 컴포넌트입니다. 0부터 max까지의 rating 값을 받아 별 아이콘으로 표시합니다.',
      },
    },
  },
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '별점 (0 ~ max)',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: '최대 별점 수',
    },
    starSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '별 크기',
    },
    starFillColor: {
      control: 'text',
      description: '채워진 별의 색상 클래스',
    },
  },
  args: {
    rating: 4.5,
    max: 5,
    starSize: 'small',
    starFillColor: 'text-black-9',
  },
};

export default meta;

type Story = StoryObj<typeof ReviewStar>;

export const Default: Story = {};

export const FullRating: Story = {
  args: {
    rating: 5,
  },
};

export const HalfRating: Story = {
  args: {
    rating: 2.7,
  },
};

export const ZeroRating: Story = {
  args: {
    rating: 0,
  },
};

export const MediumSize: Story = {
  args: {
    starSize: 'medium',
  },
};

export const LargeSize: Story = {
  args: {
    starSize: 'large',
  },
};

export const CustomColor: Story = {
  args: {
    rating: 4.5,
    starFillColor: 'text-red-500',
  },
};
