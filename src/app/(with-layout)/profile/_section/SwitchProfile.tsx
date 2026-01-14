'use client';

import { UserTypeToggle } from '@/ui';
import { UserType, USER_TYPE } from '@/auth/constant/userType';

type SwitchProfileProps = {
  userType: UserType;
  handleSwitchProfile: (nextUserType: UserType) => void;
};

export default function SwitchProfile({ userType, handleSwitchProfile }: SwitchProfileProps) {
  const selectedType = userType;

  // TODO: 로딩 페이지
  const handleClick = () => {
    const nextSelectedType =
      selectedType === USER_TYPE.CLIENT ? USER_TYPE.PHOTOGRAPHER : USER_TYPE.CLIENT;
    handleSwitchProfile(nextSelectedType);
  };

  return (
    <section className='bg-black-1'>
      <div className='flex items-center justify-between px-[2rem] py-[1.5rem]'>
        <p className='caption-14-md text-black-10'>
          {selectedType === USER_TYPE.PHOTOGRAPHER
            ? '고객 계정으로 전환하기'
            : '작가 계정으로 전환하기'}
        </p>
        <UserTypeToggle selectedType={selectedType} onClick={handleClick} />
      </div>
    </section>
  );
}
