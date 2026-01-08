'use client';

import { Navigation, Button } from '@/ui';
import { IconSearch, Logo } from '@/assets';
import { cn } from '@/utils/cn';
import { useAuth } from '@/auth/hooks/useAuth';

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const { isLogIn } = useAuth();

  const handleClickSearch = () => {
    //TODO: 검색 페이지로 이동
  };

  const handleClickLogin = () => {
    //TODO: 로그인 페이지로 이동
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
        left={<Logo width={72} />}
        right={
          <div className='flex items-center gap-[1.2rem]'>
            <IconSearch onClick={handleClickSearch} />
            {!isLogIn && (
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
