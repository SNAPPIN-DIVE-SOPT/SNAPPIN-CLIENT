import type { Meta, StoryObj } from '@storybook/react';
import ImagePreview from './ImagePreview';

const handleRemove = () => {};

const meta: Meta<typeof ImagePreview> = {
  title: 'ImagePreview',
  component: ImagePreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '이미지 미리보기 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    imageSrc: {
      control: 'text',
      description: '이미지 경로',
    },
    imageAlt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
    handleRemove: {
      description: '삭제 버튼 클릭 시 실행할 함수',
    },
    showRemoveButton: {
      control: 'boolean',
      description: '삭제 버튼 노출 여부',
    },
    imageWidthRem: {
      control: { type: 'number', min: 4, step: 1 },
      description: '컨테이너 너비 (rem)',
    },
    imageHeightRem: {
      control: { type: 'number', min: 4, step: 1 },
      description: '컨테이너 높이 (rem)',
    },
  },
  args: {
    imageSrc: '/product.png',
    imageAlt: '임시 이미지',
    showRemoveButton: true,
    imageWidthRem: 14,
    imageHeightRem: 14,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleRemove,
  },
};

export const WithoutRemoveButton: Story = {
  args: {
    showRemoveButton: false,
  },
};

export const NoImage: Story = {
  args: {
    imageSrc: undefined,
    showRemoveButton: false,
  },
};
