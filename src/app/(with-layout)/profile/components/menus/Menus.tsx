'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/ui';
import { cn } from '@/utils/cn';
import { logoutApi } from '../../apis';
import { deleteAccessToken } from '@/auth/token';
import { deleteUserType } from '@/auth/userType';
import { useAuth } from '@/auth/hooks/useAuth';

export default function Menus() {
  const router = useRouter();
  const { isLogIn } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleModalOpen = (open: boolean) => setIsLogoutModalOpen(open);

  const handleLogoutClick = () => {
    handleModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      deleteAccessToken();
      deleteUserType();
      router.push('/');
      handleModalOpen(false);
    }
  };

  return (
    <section className='bg-black-1 flex flex-col py-[0.8rem]'>
      <MenuItem label='공지사항' href='https://pretty-shake-931.notion.site/2efa9c9b4473803f9f46fdb17944d7e0?source=copy_link' />
      <MenuItem label='FAQ' href='https://pretty-shake-931.notion.site/FAQ-2efa9c9b447380b69797cff125db7e5e?source=copy_link' />
      <MenuItem label='고객센터' href='https://pretty-shake-931.notion.site/2efa9c9b447380a59d79ce7cae04a0bc?source=copy_link' />
      <button
        type='button'
        disabled={!isLogIn}
        className='caption-14-md bg-black-1 text-red-error py-[1.5rem] pl-[2rem] text-left'
        onClick={handleLogoutClick}
        >
        로그아웃
      </button>
      <ConfirmModal
        open={isLogoutModalOpen}
        handleOpenChange={(open) => handleModalOpen(open)}
        title='로그아웃 하시겠습니까?'
        buttons={[
          {
            label: '아니요',
            size: 'medium',
            color: 'disabled',
            onClick: () => handleModalOpen(false),
          },
          { label: '로그아웃', size: 'medium', color: 'black', onClick: handleConfirm },
        ]}
      />
    </section>
  );
}

type MenuItemProps = {
  label: string;
  className?: string;
  href: string;
};

const MenuItem = ({ label, className, href }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={cn('caption-14-md bg-black-1 py-[1.5rem] pl-[2rem] text-left', className)}
    >
      {label}
    </Link>
  );
};
