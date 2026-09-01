import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Preview from './Preview';

const meta: Meta<typeof Preview> = {
  title: 'UI/Portfolio/Preview/Preview',
  component: Preview,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div style={{ width: args.width ?? '18.65rem' }}>
      <Preview {...args} />
    </div>
  ),
  argTypes: {
    id: {
      control: { type: 'number', min: 0 },
    },
    image: {
      control: 'object',
    },
    isLiked: {
      control: 'boolean',
    },
    likesCount: {
      control: { type: 'number', min: 0 },
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
  args: {
    id: 1,
    image: {
      src: '/imgs/default-image.png',
      alt: '포트폴리오 이미지',
    },
    isLiked: false,
    likesCount: 128,
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
    likesCount: 256,
  },
};

export const CustomSize: Story = {
  args: {
    width: '24rem',
    height: '30rem',
  },
};
