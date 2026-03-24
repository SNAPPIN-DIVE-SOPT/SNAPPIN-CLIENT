import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconArrowForward } from '../../assets';
import { ProfileItem } from '..';

const meta: Meta<typeof ProfileItem> = {
  title: 'UI/ProfileItem',
  component: ProfileItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileItem>;

export const ShortcutCard: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <ProfileItem>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={1}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Value>서울</ProfileItem.Value>
          </ProfileItem.Item>
        </ProfileItem.Content>
      </ProfileItem>
    </div>
  ),
};

export const CompoundInline: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <ProfileItem size='sm'>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={2}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Description>내일의 나를 기록합니다</ProfileItem.Description>
          </ProfileItem.Item>
          <ProfileItem.Item>
            <ProfileItem.Row>
              <ProfileItem.Meta className='shrink-0'>촬영 상품</ProfileItem.Meta>
              <ProfileItem.Meta>졸업스냅, 웨딩스냅, 일상스냅</ProfileItem.Meta>
            </ProfileItem.Row>
            <ProfileItem.Row>
              <ProfileItem.Meta className='shrink-0'>활동 지역</ProfileItem.Meta>
              <ProfileItem.Meta>서울</ProfileItem.Meta>
            </ProfileItem.Row>
          </ProfileItem.Item>
        </ProfileItem.Content>
        <ProfileItem.Trailing />
      </ProfileItem>
    </div>
  ),
};

export const CompoundCard: Story = {
  render: () => (
    <div className='border-black-9 w-[36rem] border-[0.1rem]'>
      <ProfileItem>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={2}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Description>내일의 나를 기록합니다</ProfileItem.Description>
          </ProfileItem.Item>
          <ProfileItem.Item>
            <ProfileItem.Row>
              <ProfileItem.Meta className='shrink-0'>촬영 상품</ProfileItem.Meta>
              <ProfileItem.Meta>졸업스냅, 웨딩스냅, 일상스냅</ProfileItem.Meta>
            </ProfileItem.Row>
            <ProfileItem.Row>
              <ProfileItem.Meta className='shrink-0'>활동 지역</ProfileItem.Meta>
              <ProfileItem.Meta>서울</ProfileItem.Meta>
            </ProfileItem.Row>
          </ProfileItem.Item>
        </ProfileItem.Content>
        <ProfileItem.Trailing />
      </ProfileItem>
    </div>
  ),
};

export const ShortcutSingleLine: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <ProfileItem>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={1}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Value>서울</ProfileItem.Value>
          </ProfileItem.Item>
        </ProfileItem.Content>
      </ProfileItem>
    </div>
  ),
};

export const AsChildAnchor: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <a href='/profile' className='block'>
        <ProfileItem>
          <ProfileItem.Avatar src='/imgs/default-profile.png' />
          <ProfileItem.Content lines={1}>
            <ProfileItem.Item>
              <ProfileItem.Title>링크형 프로필</ProfileItem.Title>
              <ProfileItem.Value>바로가기</ProfileItem.Value>
            </ProfileItem.Item>
          </ProfileItem.Content>
          <ProfileItem.Trailing />
        </ProfileItem>
      </a>
    </div>
  ),
};

export const CustomTrailingIcon: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <ProfileItem>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={1}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Value>서울</ProfileItem.Value>
          </ProfileItem.Item>
        </ProfileItem.Content>
        <ProfileItem.Trailing>
          <IconArrowForward className='text-black-6 h-[2.4rem] w-[2.4rem]' />
        </ProfileItem.Trailing>
      </ProfileItem>
    </div>
  ),
};

export const TrailingButton: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <ProfileItem>
        <ProfileItem.Avatar src='/imgs/default-profile.png' />
        <ProfileItem.Content lines={1}>
          <ProfileItem.Item>
            <ProfileItem.Title>나작가</ProfileItem.Title>
            <ProfileItem.Value>서울</ProfileItem.Value>
          </ProfileItem.Item>
        </ProfileItem.Content>
        <ProfileItem.Trailing>
          <button
            type='button'
            className='caption-12-rg bg-black-10 text-black-1 rounded-[0.4rem] px-[1.2rem] py-[0.6rem]'
          >
            편집
          </button>
        </ProfileItem.Trailing>
      </ProfileItem>
    </div>
  ),
};
