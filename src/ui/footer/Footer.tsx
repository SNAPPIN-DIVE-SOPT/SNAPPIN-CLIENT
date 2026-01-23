'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SVGProps, useRef } from 'react';
import { useEffect } from 'react';
import {
  IconHomeFill,
  IconHome,
  IconExploreFill,
  IconProfileFill,
  IconReservationFill,
  IconReservation,
  IconProfile,
  IconExplore,
  IconMessageFill,
  IconMessage,
  IconHeartFill,
  IconHeart,
} from '@/assets';
import { cn } from '@/utils/cn';
import { useGetUserInfo, usePrefetchUserProfile } from '@/auth/apis';
import { setUserType } from '@/auth/userType';
import { useAuth } from '@/auth/hooks/useAuth';
import { USER_TYPE, type UserType } from '@/auth/constant/userType';
import { useToast } from '../toast/hooks/useToast';

type MenuItem = {
  href: string | null;
  activeIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

const menuUserItems: MenuItem[] = [
  { href: '/', activeIcon: IconHomeFill, inactiveIcon: IconHome, label: '홈' },
  { href: '/like', activeIcon: IconHeartFill, inactiveIcon: IconHeart, label: '좋아요' },
  { href: '/explore', activeIcon: IconExploreFill, inactiveIcon: IconExplore, label: '탐색' },
  {
    href: '/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약',
  },
  { href: '/profile', activeIcon: IconProfileFill, inactiveIcon: IconProfile, label: '프로필' },
];

const menuAuthorItems: MenuItem[] = [
  { href: null, activeIcon: IconHomeFill, inactiveIcon: IconHome, label: '홈' },
  { href: null, activeIcon: IconMessageFill, inactiveIcon: IconMessage, label: '상품 관리' },
  {
    href: '/photographer/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약 관리',
  },
  { href: null, activeIcon: IconMessageFill, inactiveIcon: IconMessage, label: '메시지함' },
  {
    href: '/photographer/profile',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: '프로필',
  },
];

const menuUserAuthorItems: MenuItem[] = [
  { href: '/', activeIcon: IconHomeFill, inactiveIcon: IconHome, label: '홈' },
  { href: '/like', activeIcon: IconHeartFill, inactiveIcon: IconHeart, label: '좋아요' },
  { href: '/explore', activeIcon: IconExploreFill, inactiveIcon: IconExplore, label: '탐색' },
  {
    href: '/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약',
  },
  {
    href: '/photographer/profile',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: '프로필',
  },
];

const getMenuItems = (opts: {
  isLogIn: boolean;
  role?: UserType;
  hasPhotographerProfile?: boolean;
}): MenuItem[] => {
  const { isLogIn, role, hasPhotographerProfile } = opts;

  if (!isLogIn) return menuUserItems;
  if (role === USER_TYPE.PHOTOGRAPHER) return menuAuthorItems;
  if (role === USER_TYPE.CLIENT && hasPhotographerProfile) return menuUserAuthorItems;
  return menuUserItems;
};

const EXPLORE_NO_AUTO_APPLY = 'explore_no_auto_apply_v1';

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const prefetchUserProfile = usePrefetchUserProfile();
  const { isLogIn } = useAuth();
  const { error, removeToast } = useToast();
  const { data } = useGetUserInfo();

  useEffect(() => {
    if (!isLogIn) return;
    if (!data?.role) return;
    setUserType(data.role as UserType);
  }, [isLogIn, data?.role]);

  const items = getMenuItems({
    isLogIn: isLogIn ?? false,
    role: data?.role as UserType | undefined,
    hasPhotographerProfile: data?.hasPhotographerProfile,
  });

  const isActive = (href: string | null) => {
    if (href === null) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleClickMenuItem = (href: string | null) => {
    if (href === null) {
      error('준비 중입니다. 조금만 기다려주세요!', undefined, 'bottom-[8rem]');
      return;
    }

    removeToast();

    if (!isLogIn && href === '/profile') {
      router.push('/login');
      return;
    }
    if (href === '/photographer/profile') {
      prefetchUserProfile();
    }

    router.push(href);
  };

  const isDetailPath = (path: string) =>
    path.startsWith('/product-detail/') || path.startsWith('/portfolio-detail/');

  const isExplorePath = (path: string) => path === '/explore';

  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    // 이전이 explore가 아니면 관심 없음
    if (prev !== '/explore') return;

    // explore -> detail : 잠금 유지 (복귀 시 자동세팅 막아야 함)
    if (isDetailPath(pathname)) return;

    // explore -> 그 외(하단탭 포함 모든 이탈) : 잠금 해제
    if (!isExplorePath(pathname)) {
      localStorage.removeItem(EXPLORE_NO_AUTO_APPLY);
    }
  }, [pathname]);

  return (
    <div className='z-20'>
      <div className='bg-black-1 footer-height pointer-events-none' aria-hidden />
      <footer className='border-black-5 footer-height fixed-center bg-black-1 bottom-0 flex items-center justify-between border-t-[0.5px] px-[2rem] pt-[0.2rem] pb-[0.6rem]'>
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
              <Icon className={cn(active && 'text-black-10')} width={26} height={26} />
              <span className='caption-10-md'>{item.label}</span>
            </button>
          );
        })}
      </footer>
    </div>
  );
}
