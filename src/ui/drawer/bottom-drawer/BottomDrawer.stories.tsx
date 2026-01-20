import BottomDrawer from '@/ui/drawer/bottom-drawer/BottomDrawer';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button } from '@/ui';

const meta = {
  title: 'drawer/BottomDrawer',
  component: BottomDrawer,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BottomDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

function BottomDrawerStory(props: React.ComponentProps<typeof BottomDrawer>) {
  const [open, setOpen] = useState(false);

  return (
    <div className='space-y-4 p-6'>
      <Button onClick={() => setOpen(true)}>드로어 열기</Button>

      <BottomDrawer {...props} isOpen={open} handleOpenChange={setOpen}>
        <BottomDrawer.Title>타이틀 영역</BottomDrawer.Title>
        <BottomDrawer.Row className='space-y-2'>
          <div className='text-black-8 text-sm'>바텀시트 컨텐츠</div>
          <div className='rounded-md border p-3'>여기는 Row 영역임. 필요한 UI를 넣으면 됨.</div>
        </BottomDrawer.Row>

        <BottomDrawer.Footer className='px-[2rem] pt-[1rem] pb-[2rem]'>
          <Button className='w-full' onClick={() => setOpen(false)}>
            닫기
          </Button>
        </BottomDrawer.Footer>
      </BottomDrawer>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <BottomDrawerStory {...args} />,
};
