import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomCTAButton } from '@/ui/button/bottom-cta-button/BottomCTAButton';
import { Button } from '@/ui';

const meta: Meta<typeof BottomCTAButton.Single> = {
  title: 'button/BottomCTAButton',
  component: BottomCTAButton.Single,
  tags: ['autodocs'],
  args: {
    size: 'large',
    color: 'black',
    display: 'block',
    children: '확인',
  },
};

export default meta;

type Story = StoryObj<typeof BottomCTAButton.Single>;

export const Single: Story = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton.Single size='large' color='black' className={'mt-auto'}>
        확인
      </BottomCTAButton.Single>
    </div>
  ),
};

export const SingleSmall: Story = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton.Single
        size='small'
        display='block'
        color='black'
        className={'mt-auto w-fit'}
      >
        확인
      </BottomCTAButton.Single>
    </div>
  ),
};

export const BottomDoubleSingle = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton className='flex flex-col gap-[0.6rem]'>
        <BottomCTAButton.Single size='large' color='black'>
          확인
        </BottomCTAButton.Single>
        <BottomCTAButton.Single size='large' color='black'>
          확인
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  ),
};

export const FixedBottomDoubleSingle = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton fixed={true} className='flex flex-col gap-[0.6rem]' hasPadding={true}>
        <BottomCTAButton.Single size='large' color='black'>
          확인
        </BottomCTAButton.Single>
        <BottomCTAButton.Single size='large' color='black'>
          확인
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  ),
};

export const Double: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton>
        <BottomCTAButton.Double
          leftButton={
            <Button size='large' color='white'>
              취소
            </Button>
          }
          rightButton={
            <Button size='large' color='black'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};

export const DoubleBackground: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[100vh] flex-col border'>
      <BottomCTAButton background={'white'} hasPadding={true}>
        <BottomCTAButton.Double
          leftButton={
            <Button size='large' color='white'>
              취소
            </Button>
          }
          rightButton={
            <Button size='large' color='black'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};

export const DoubleSmall: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton>
        <BottomCTAButton.Double
          className={'justify-between'}
          leftButton={
            <Button size='small' display='block' color='white' className='w-fit'>
              취소
            </Button>
          }
          rightButton={
            <Button size='small' display='block' color='black' className='w-fit'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};

export const DoubleMedium: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>
      <BottomCTAButton>
        <BottomCTAButton.Double
          className={'justify-between'}
          leftButton={
            <Button size='medium' color='white' className='w-[8.2rem]'>
              취소
            </Button>
          }
          rightButton={
            <Button size='medium' color='black' className='w-[8.2rem]'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};

export const FixedSingle: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[50rem] flex-col border p-4'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton fixed={true} className='bottom-[2.4rem]'>
        <BottomCTAButton.Single size='large' color='black'>
          확인
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  ),
};

export const FixedDouble: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[100dvh] flex-col border'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton fixed={true} hasPadding={true}>
        <BottomCTAButton.Double
          leftButton={
            <Button size='large' color='white'>
              취소
            </Button>
          }
          rightButton={
            <Button size='large' color='black'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};

export const FixedDoubleBackground: StoryObj = {
  render: () => (
    <div className='bg-neon-white flex h-[100dvh] flex-col border'>
      <div>콘텐츠 영역</div>

      <BottomCTAButton fixed={true} background={'white'} hasPadding={true}>
        <BottomCTAButton.Double
          leftButton={
            <Button size='large' color='white'>
              취소
            </Button>
          }
          rightButton={
            <Button size='large' color='black'>
              확인
            </Button>
          }
        />
      </BottomCTAButton>
    </div>
  ),
};
