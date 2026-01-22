'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SVGProps } from 'react';
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
import { useGetUserInfo } from '@/auth/apis';
import { setUserType } from '@/auth/userType';
import { useAuth } from '@/auth/hooks/useAuth';
import { USER_TYPE, type UserType } from '@/auth/constant/userType';
import { useToast } from '../toast/hooks/useToast';

type MenuItem = {
  href: string;
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
  { href: '/', activeIcon: IconHomeFill, inactiveIcon: IconHome, label: '홈' },
  { href: '/empty', activeIcon: IconMessageFill, inactiveIcon: IconMessage, label: '상품 관리' },
  {
    href: '/photographer/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약 관리',
  },
  { href: '/empty', activeIcon: IconMessageFill, inactiveIcon: IconMessage, label: '메시지함' },
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

  // 비로그인: 유저 메뉴
  if (!isLogIn) return menuUserItems;

  // 작가 모드
  if (role === USER_TYPE.PHOTOGRAPHER) return menuAuthorItems;

  // 클라 + 작가 프로필 보유(겸업)
  if (role === USER_TYPE.CLIENT && hasPhotographerProfile) return menuUserAuthorItems;

  // 일반 클라
  return menuUserItems;
};

export default function Footer() {
  const pathname = usePathname();
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const { data } = useGetUserInfo();

  // Footer에서 저장 책임을 갖는 게 애매하긴 하지만,
  // 현재 구조를 유지한다면 최소한 안전하게(로그인+role 있을 때만) 동기화
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

  const isActive = (href: string) => {
    // 홈은 exact match
    if (href === '/') return pathname === '/';
    // 하위 경로도 활성 처리
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className='z-20'>
      <div className='bg-black-1 footer-height' />
      <footer className='border-black-6 footer-height fixed-center bg-black-1 bottom-0 flex justify-between border-t-[0.5px] px-[2rem] pt-[0.8rem] pb-[1.6rem]'>
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = active ? item.activeIcon : item.inactiveIcon;
          const isEmpty = item.href === '/empty';

          const content = (
            <>
              <Icon className={cn(active && 'text-black-10')} width={26} height={26}/>
              <span className='caption-10-md'>{item.label}</span>
            </>
          );

          return isEmpty ? (
            <button
              key={item.label}
              type='button'
              onClick={() => error('준비 중입니다. 조금만 기다려주세요!', undefined, 'bottom-[8rem]')}
              className='flex flex-col items-center gap-[0.2rem]'
              aria-label={`${item.label} (준비 중)`}
            >
              {content}
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className='flex flex-col items-center gap-[0.2rem]'
            >
              {content}
            </Link>
          );
        })}
      </footer>
    </div>
  );
}
