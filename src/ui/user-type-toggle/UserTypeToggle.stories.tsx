import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserTypeToggle, { UserTypeToggleProps } from './UserTypeToggle';
import { UserType, USER_TYPE, USER_TYPES } from '@/auth/constant/userType';

const meta: Meta<typeof UserTypeToggle> = {
  title: 'UI/UserTypeToggle',
  component: UserTypeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '고객/작가 토글 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectedType: {
      control: { type: 'select' },
      options: USER_TYPES satisfies UserType[],
      description: '사용자 유형',
    },
  },
  args: {
    selectedType: USER_TYPE.CLIENT,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const UserTypeToggleWithState = (args: UserTypeToggleProps) => {
  const [selectedType, setSelectedType] = useState<UserType>(args.selectedType);

  const handleClick = () =>
    setSelectedType((prev) =>
      prev === USER_TYPE.CLIENT ? USER_TYPE.PHOTOGRAPHER : USER_TYPE.CLIENT,
    );

  return <UserTypeToggle {...args} selectedType={selectedType} onClick={handleClick} />;
};

export const Client: Story = {
  args: {
    selectedType: USER_TYPE.CLIENT,
  },
  render: UserTypeToggleWithState,
};

export const Author: Story = {
  args: {
    selectedType: USER_TYPE.PHOTOGRAPHER,
  },
  render: UserTypeToggleWithState,
};
