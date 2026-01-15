import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ComboBox from './ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'combo-box/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  args: {
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '검색 가능한 콤보박스 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='w-[45rem]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {};

export const ManyOptions: Story = {
  args: {
    options: [
      '서울',
      '부산',
      '대구',
      '인천',
      '광주',
      '대전',
      '울산',
      '세종',
      '경기',
      '강원',
      '충북',
      '충남',
      '전북',
      '전남',
      '경북',
      '경남',
      '제주',
    ],
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
  },
};
