import { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageUploadButton from '@/ui/button/upload/ImageUploadButton';

const meta: Meta<typeof ImageUploadButton> = {
  title: 'button/ImageUploadButton',
  component: ImageUploadButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '이미지 업로드 버튼 컴포넌트입니다.',
      },
    },
  },
  args: {
    handleUploadAction: (files: FileList) => {
      console.log('Uploaded files:', files);
    },
  },
};

export default meta;

type StoryImageUploadButton = StoryObj<typeof ImageUploadButton>;

export const Default: StoryImageUploadButton = {};
