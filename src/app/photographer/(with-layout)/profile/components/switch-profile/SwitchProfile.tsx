'use client';

import { Divider, UserTypeToggle } from '@/ui';
import { USER_TYPE } from '@/auth/constant/userType';

export default function SwitchProfile() {
  const selectedType = USER_TYPE.PHOTOGRAPHER;

  const handleClick = () => {
    // TODO: 계정 전환 처리
  };

  return (
    <>
      <Divider color='bg-black-3' className='h-[0.6rem]' />
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
    </>
  );
}
