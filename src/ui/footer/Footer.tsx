'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SVGProps, useEffect } from 'react';
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
import { USER_TYPE, UserType } from '@/auth/constant/userType';

const menuUserItems: {
  href: string;
  activeIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    href: '/',
    activeIcon: IconHomeFill,
    inactiveIcon: IconHome,
    label: '홈',
  },
  {
    href: '/like',
    activeIcon: IconHeartFill,
    inactiveIcon: IconHeart,
    label: '좋아요',
  },
  {
    href: '/explore',
    activeIcon: IconExploreFill,
    inactiveIcon: IconExplore,
    label: '탐색',
  },
  {
    href: '/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약',
  },
  {
    href: '/profile',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: '프로필',
  },
];
const menuAuthorItems: {
  href: string;
  activeIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    href: '/',
    activeIcon: IconHomeFill,
    inactiveIcon: IconHome,
    label: '홈',
  },
  {
    href: '/empty',
    activeIcon: IconMessageFill,
    inactiveIcon: IconMessage,
    label: '상품 관리',
  },
  {
    href: '/photographer/reservation',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: '예약 관리',
  },
  {
    href: '/empty',
    activeIcon: IconMessageFill,
    inactiveIcon: IconMessage,
    label: '메시지함',
  },
  {
    href: '/photographer/profile',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: '프로필',
  },
];
const menuUserAuthorItems: {
  href: string;
  activeIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  inactiveIcon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    href: '/',
    activeIcon: IconHomeFill,
    inactiveIcon: IconHome,
    label: '홈',
  },
  {
    href: '/like',
    activeIcon: IconHeartFill,
    inactiveIcon: IconHeart,
    label: '좋아요',
  },
  {
    href: '/explore',
    activeIcon: IconExploreFill,
    inactiveIcon: IconExplore,
    label: '탐색',
  },
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

export default function Footer() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const { isLogIn } = useAuth();
  const { data } = useGetUserInfo();

  useEffect(() => {
    if (isLogIn) {
      setUserType(data?.role as UserType);
    }
  }, [isLogIn, data?.role]);

  return (
    <div className='z-20'>
      <div className='bg-black-1 footer-height' />
      <footer className='border-black-6 footer-height fixed-center bg-black-1 bottom-0 flex justify-between border-t-[0.5px] p-[0.8rem_2rem_1.6rem_2rem]'>
        {data?.role === USER_TYPE.CLIENT && !data?.hasPhotographerProfile &&
          menuUserItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='flex flex-col items-center gap-[0.2rem]'
            >
              {isActive(item.href) ? (
                <item.activeIcon className={cn(isActive(item.href) && 'text-black-10')} />
              ) : (
                <item.inactiveIcon />
              )}
              <span className='caption-10-md'>{item.label}</span>
            </Link>
          ))}
        {data?.role === USER_TYPE.CLIENT || !isLogIn &&
          menuUserAuthorItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='flex flex-col items-center gap-[0.2rem]'
            >
              {isActive(item.href) ? (
                <item.activeIcon className={cn(isActive(item.href) && 'text-black-10')} />
              ) : (
                <item.inactiveIcon />
              )}
              <span className='caption-10-md'>{item.label}</span>
            </Link>
          ))}

        {data?.role === USER_TYPE.PHOTOGRAPHER &&
          menuAuthorItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='flex flex-col items-center gap-[0.2rem]'
            >
              {isActive(item.href) ? (
                <item.activeIcon className={cn(isActive(item.href) && 'text-black-10')} />
              ) : (
                <item.inactiveIcon />
              )}
              <span className='caption-10-md'>{item.label}</span>
            </Link>
          ))}
      </footer>
    </div>
  );
}
