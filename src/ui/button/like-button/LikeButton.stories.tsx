import { useState, ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import LikeButton from './LikeButton';

const renderLikeButton = (args: ComponentProps<typeof LikeButton>) => {
    const Wrapper = () => {
      const [liked, setLiked] = useState(args.isLiked);

      return <LikeButton {...args} isLiked={liked} handleClick={() => setLiked((prev) => !prev)} />;
    };

    return <Wrapper />;
  }

const meta: Meta<typeof LikeButton> = {
  title: 'Button/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '좋아요 여부에 따라 색상이 변하는 좋아요 버튼 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    isLiked: false,
  },
  render: renderLikeButton,
};

export const Liked: Story = {
  args: {
    isLiked: true,
  },
  render: renderLikeButton,
};
