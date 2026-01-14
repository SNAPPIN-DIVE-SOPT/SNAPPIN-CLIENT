'use client';

import { UserTypeToggle } from '@/ui';
import {
  getUserRoleByUserType,
  getUserTypeByUserRole,
  UserRole,
} from '@/auth/utils/userRoleMapping';

type SwitchProfileProps = {
  userRole: UserRole;
  handleSwitchProfile: (nextUserRole: UserRole) => void;
};

export default function SwitchProfile({ userRole, handleSwitchProfile }: SwitchProfileProps) {
  const selectedType = getUserTypeByUserRole(userRole);

  // TODO: 로딩 페이지
  const handleClick = () => {
    const nextSelectedType = selectedType === 'client' ? 'author' : 'client';
    const nextUserRole = getUserRoleByUserType(nextSelectedType);
    handleSwitchProfile(nextUserRole);
  };

  return (
    <section>
      <div className='flex items-center justify-between px-[2rem] py-[1.5rem]'>
        <p className='caption-14-md text-black-10'>
          {selectedType === 'author' ? '고객 계정으로 전환하기' : '작가 계정으로 전환하기'}
        </p>
        <UserTypeToggle selectedType={selectedType} onClick={handleClick} />
      </div>
    </section>
  );
}
