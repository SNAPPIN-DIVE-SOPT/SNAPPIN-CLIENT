'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';
import { getMenuItems } from './constants/menu';
import { ROUTES } from '@/constants/routes/routes';
import { UserType } from '@snappin/shared/types/userType';

type FooterClientProps = {
  initialUserType: UserType | null;
};

export default function FooterClient({ initialUserType }: FooterClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { isLogIn } = useAuth();
  const { error, removeToast } = useToast();

  const items = getMenuItems(isLogIn, initialUserType);

  const isActive = (href: string | null) => {
    if (!href) return false;

    const normalized = normalizePathForMenu(pathname);

    if (href === '/') return normalized === '/';
    return normalized === href || normalized.startsWith(`${href}/`);
  };

  const handleClickMenuItem = (href: string | null) => {
    if (href === null) {
      error('준비 중입니다. 조금만 기다려주세요!', undefined, 'bottom-[8rem]');
      return;
    }

    removeToast();

    if (!isLogIn && href === ROUTES.PROFILE) {
      router.push(ROUTES.LOGIN());
      return;
    }

    router.push(href);
  };

  return (
    <>
      {items.map((item) => {
        const active = isActive(item.href);
        const Icon = active ? item.activeIcon : item.inactiveIcon;

        return (
          <button
            key={item.label}
            type='button'
            onClick={() => handleClickMenuItem(item.href)}
            className='flex h-[4.8rem] w-[4.8rem] flex-col items-center justify-center gap-[0.2rem]'
            aria-label={item.label}
          >
            {Icon}
            <span className='caption-10-md'>{item.label}</span>
          </button>
        );
      })}
    </>
  );
}

const normalizePathForMenu = (path: string) => {
  if (path === '/photographers/profile' || path.startsWith('/photographers/profile/')) {
    return path.replace('/photographers/profile', '/profile');
  }
  return path;
};
