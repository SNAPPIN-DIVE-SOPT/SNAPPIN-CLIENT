import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import StoryExample from '@/shared/ui/example/StoryExample';

const meta: Meta<typeof StoryExample> = {
  title: 'Shared/StoryExample',
  component: StoryExample,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Storybook Example @@',
    color: 'neon',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        component: '스토리북 예시 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StoryExample>;

export const DefaultExample: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Storybook Example @@'));

    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const BlueLarge: Story = {
  args: {
    color: 'blue',
    size: 'large',
    children: 'Blue Large Example',
  },
};

export const WhiteLarge: Story = {
  args: {
    color: 'white',
    size: 'large',
    children: 'White Large Example',
  },
};
