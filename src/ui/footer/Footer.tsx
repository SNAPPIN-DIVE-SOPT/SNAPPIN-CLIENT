'use client';

import Link from 'next/link';
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
} from '@/assets';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { SVGProps } from 'react';

type FooterProps = {
  userRole: 'author' | 'user';
};

//TODO: 메뉴 경로 수정
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
    label: 'Home',
  },
  {
    href: '/',
    activeIcon: IconExploreFill,
    inactiveIcon: IconExplore,
    label: 'Explore',
  },
  {
    href: '/',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: 'Reservations',
  },
  {
    href: '/',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: 'Profile',
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
    label: 'Home',
  },
  {
    href: '/',
    activeIcon: IconMessageFill,
    inactiveIcon: IconMessage,
    label: 'Messages',
  },
  {
    href: '/',
    activeIcon: IconReservationFill,
    inactiveIcon: IconReservation,
    label: 'Reservations',
  },
  {
    href: '/',
    activeIcon: IconProfileFill,
    inactiveIcon: IconProfile,
    label: 'Profile',
  },
];

export default function Footer({ userRole }: FooterProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div className='bg-black-1 footer-height' />
      <footer className='border-black-6 fixed-center bg-black-1 bottom-0 flex justify-between border-t-[0.5px] p-[0.8rem_2rem_1.6rem_2rem]'>
        {userRole === 'user' &&
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

        {userRole === 'author' &&
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
    </>
  );
}
