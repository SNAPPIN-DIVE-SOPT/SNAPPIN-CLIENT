'use client';

import { Navigation, Button, IconButton } from '@/ui';
import { IconSearch, Logo } from '@/assets';
import { cn } from '@/utils/cn';
import { useAuth } from '@/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface ClientHeaderProps {
  isVisible: boolean;
}

export default function ClientHeader({ isVisible }: ClientHeaderProps) {
  const { isLogIn } = useAuth();
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/explore');
  };

  const handleClickLogin = () => {
    router.push('/login');
  };

  const handleClickLogo = () => {
    const el = document.getElementById('app-scroll');
    el?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'fixed-center top-0 z-15 transition-transform duration-300 ease-out will-change-transform',
        isVisible ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-full',
      )}
    >
      <Navigation
        className='items-center py-0 pr-[1.6rem]'
        left={<Logo width={82} onClick={handleClickLogo} className='cursor-pointer' />}
        right={
          <div className='flex items-center gap-[1.2rem]'>
            <IconButton onClick={handleSearchClick}>
              <IconSearch />
            </IconButton>
            {isLogIn === false && (
              <Button size='small' color='black' onClick={handleClickLogin}>
                로그인
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
}
