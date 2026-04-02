import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Profile from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'UI/ProfileItem',
  component: Profile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Profile>;

const profileStoryData = {
  name: '작가명',
  bio: '라이프스타일과 인물 중심의 촬영을 진행합니다.',
  specialties: ['졸업스냅', '웨딩스냅', '일상스냅'],
  locations: ['서울', '경기'],
};

export const Default: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar size='sm' src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Description typography='caption-12-rg' color='black-8'>
              서울
            </Profile.Description>
          </Profile.Item>
        </Profile.Content>
      </Profile>
    </div>
  ),
};

export const CompoundCard: Story = {
  render: () => (
    <div className='border-black-9 w-[36rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={2}>
          <Profile.Item>
            <Profile.Title typography='font-16-sb'>나작가</Profile.Title>
            <Profile.Description typography='caption-14-rg'>내일의 나를 기록합니다</Profile.Description>
          </Profile.Item>
          <Profile.Item>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>촬영 상품</Profile.Meta>
              <Profile.Meta typography='caption-12-rg' color='black-8'>
                졸업스냅, 웨딩스냅, 일상스냅
              </Profile.Meta>
            </Profile.Row>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>활동 지역</Profile.Meta>
              <Profile.Meta typography='caption-12-rg' color='black-8'>
                서울
              </Profile.Meta>
            </Profile.Row>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing />
      </Profile>
    </div>
  ),
};

export const TrailingButton: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Description typography='caption-12-rg' color='black-8'>
              서울
            </Profile.Description>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing>
          <button
            type='button'
            className='caption-12-rg bg-black-10 text-black-1 rounded-[0.4rem] px-[1.2rem] py-[0.6rem]'
          >
            편집
          </button>
        </Profile.Trailing>
      </Profile>
    </div>
  ),
};

export const TypographyAndColorVariants: Story = {
  render: () => (
    <div className='border-black-9 flex w-[36rem] flex-col gap-[1.6rem] border-[0.1rem] p-[2rem]'>
      <div className='flex flex-col gap-[0.8rem]'>
        <Profile.Title typography='font-16-sb'>font-16-sb / black-10</Profile.Title>
        <Profile.Title typography='caption-14-bd'>caption-14-bd / black-10</Profile.Title>
      </div>
      <div className='flex flex-col gap-[0.8rem]'>
        <Profile.Description typography='caption-14-rg' color='black-7'>
          caption-14-rg / black-7
        </Profile.Description>
        <Profile.Description typography='caption-12-rg' color='black-8'>
          caption-12-rg / black-8
        </Profile.Description>
      </div>
      <div className='flex flex-col gap-[0.8rem]'>
        <Profile.Meta typography='caption-11-md' color='black-7'>
          caption-11-md / black-7
        </Profile.Meta>
        <Profile.Meta typography='caption-12-rg' color='black-8'>
          caption-12-rg / black-8
        </Profile.Meta>
      </div>
    </div>
  ),
};

export const PhotographerProfileCard: Story = {
  render: () => {
    const imageUrl = '/imgs/default-profile.png';
    const data = profileStoryData;

    return (
      <div className='border-black-9 w-[36rem] border-[0.1rem]'>
        <Profile>
          <Profile.Avatar src={imageUrl} size='md' />
          <Profile.Content lines={2}>
            <Profile.Item>
              <Profile.Title typography='font-16-sb'>{data.name}</Profile.Title>
              <Profile.Description typography='caption-14-rg'>{data.bio}</Profile.Description>
            </Profile.Item>
            <Profile.Item>
              <Profile.Row>
                <Profile.Meta className='shrink-0'>촬영 상품</Profile.Meta>
                <Profile.Meta typography='caption-12-rg' color='black-8'>
                  {data.specialties.join(', ')}
                </Profile.Meta>
              </Profile.Row>
              <Profile.Row>
                <Profile.Meta className='shrink-0'>활동 지역</Profile.Meta>
                <Profile.Meta typography='caption-12-rg' color='black-8'>
                  {data.locations.join(', ')}
                </Profile.Meta>
              </Profile.Row>
            </Profile.Item>
          </Profile.Content>
        </Profile>
      </div>
    );
  },
};
