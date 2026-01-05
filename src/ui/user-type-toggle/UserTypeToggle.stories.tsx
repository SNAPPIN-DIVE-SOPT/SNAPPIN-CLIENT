import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserTypeToggle, { UserTypeToggleProps } from './UserTypeToggle';
import { UserType } from './types/userType';

const meta: Meta<typeof UserTypeToggle> = {
  title: 'UserTypeToggle',
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
      options: ['client', 'author'] satisfies UserType[],
      description: '사용자 유형',
    },
  },
  args: {
    selectedType: 'client',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const UserTypeToggleWithState = (args: UserTypeToggleProps) => {
  const [selectedType, setSelectedType] = useState<UserType>(args.selectedType);

  const handleClick = () => setSelectedType((prev) => (prev === 'client' ? 'author' : 'client'));

  return <UserTypeToggle {...args} selectedType={selectedType} onClick={handleClick} />;
};

export const Client: Story = {
  args: {
    selectedType: 'client',
  },
  render: UserTypeToggleWithState,
};

export const Author: Story = {
  args: {
    selectedType: 'author',
  },
  render: UserTypeToggleWithState,
};
