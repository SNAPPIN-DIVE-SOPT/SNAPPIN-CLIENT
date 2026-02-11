import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageCarousel from './ImageCarousel';

const images = [
  { src: '/imgs/banner1.png', alt: 'carousel 1' },
  { src: '/imgs/banner2.png', alt: 'carousel 2' },
  { src: '/imgs/banner3.png', alt: 'carousel 3' },
];

const meta = {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['sideButtons', 'dots'] },
    initialIndex: { control: { type: 'number', min: 0 } },
  },
  args: {
    images,
    variant: 'sideButtons',
    initialIndex: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SideButtons: Story = {
  args: { variant: 'sideButtons' },
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
};

export const Dots: Story = {
  args: { variant: 'dots' },
};

export const DotsInitialIndex: Story = {
  args: { variant: 'dots', initialIndex: 2 },
};
