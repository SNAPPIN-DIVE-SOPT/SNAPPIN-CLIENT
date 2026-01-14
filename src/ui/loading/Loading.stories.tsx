import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스명',
    },
  },
  args: {
    className: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className='bg-black-10 flex h-dvh w-[45rem] flex-col items-center justify-center'>
      <Loading {...args} />
    </div>
  ),
};
