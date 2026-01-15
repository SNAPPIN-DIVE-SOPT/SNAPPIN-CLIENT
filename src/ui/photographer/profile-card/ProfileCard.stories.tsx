import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProfileCard from './ProfileCard';
import { IconArrowForward } from '@/assets';

const meta: Meta<typeof ProfileCard> = {
  title: 'Photographer/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'centered',
    docs: {
      description: {
        component: '작가 프로필 카드 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    profileImageUrl: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    name: {
      control: 'text',
      description: '작가 이름',
    },
    isLoggedIn: {
      control: 'boolean',
      description: '로그인 여부',
    },
    bio: {
      control: 'text',
      description: '작가 소개',
    },
    specialties: {
      control: 'object',
      description: '촬영 상품 목록',
    },
    locations: {
      control: 'object',
      description: '활동 지역 목록',
    },
    icon: {
      control: false,
      description: '오른쪽에 표시할 아이콘',
    },
  },
  args: {
    profileImageUrl: '/imgs/default-profile.png',
    name: '김작가',
    isLoggedIn: true,
    bio: '소중한 순간을 아름답게 담아내는 작가입니다.',
    specialties: ['졸업스냅', '웨딩'],
    locations: ['서울', '경기'],
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {};

export const NotLoggedIn: Story = {
  args: {
    isLoggedIn: false,
  },
};

export const LongText: Story = {
  args: {
    name: '매우 긴 작가 이름이 들어가는 경우입니다',
    bio: '이것은 매우 긴 작가 소개글입니다. 여러 줄에 걸쳐서 표시될 수 있는 긴 텍스트를 테스트하기 위한 예시입니다.',
    specialties: ['졸업스냅', '웨딩', '스튜디오', '야외촬영', '제주도'],
    locations: ['서울', '경기', '인천', '부산', '제주'],
  },
};

export const LongTextWithIcon: Story = {
  args: {
    name: '매우 긴 작가 이름이 들어가는 경우입니다',
    bio: '이것은 매우 긴 작가 소개글입니다. 여러 줄에 걸쳐서 표시될 수 있는 긴 텍스트를 테스트하기 위한 예시입니다.',
    specialties: ['졸업스냅', '웨딩', '스튜디오', '야외촬영', '제주도'],
    locations: ['서울', '경기', '인천', '부산', '제주'],
    icon: <IconArrowForward />,
  },
};
