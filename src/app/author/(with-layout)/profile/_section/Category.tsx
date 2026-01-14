'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryButton } from '../components';
import { ConfirmModal } from '@/ui';

type CategoryProps = {
  isLoggedIn: boolean | null;
  handleLogout?: () => Promise<void> | void;
};

export default function Category({ isLoggedIn, handleLogout }: CategoryProps) {
  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutModalChange = (isOpen: boolean) => setIsLogoutModalOpen(isOpen);

  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleClose = () => setIsLogoutModalOpen(false);
  const handleConfirm = async () => {
    try {
      if (handleLogout) {
        await handleLogout();
      } else {
        router.push('/login');
      }
    } finally {
      setIsLogoutModalOpen(false);
    }
  };
  return (
    // TODO: 노션 url 삽입
    <section className='bg-black-1 flex flex-col py-[0.8rem]'>
      <CategoryButton label='공지사항' />
      <CategoryButton label='FAQ' />
      <CategoryButton label='고객센터' />
      {isLoggedIn === true && (
        <CategoryButton
          label='로그아웃'
          className='text-red-error'
          handleClick={handleLogoutClick}
        />
      )}

      <ConfirmModal
        open={isLogoutModalOpen}
        handleOpenChange={handleLogoutModalChange}
        title={'로그아웃 하시겠습니까?'}
        buttons={[
          { label: '아니요', size: 'medium', color: 'disabled', onClick: handleClose },
          { label: '로그아웃', size: 'medium', color: 'black', onClick: handleConfirm },
        ]}
      />
    </section>
  );
}
