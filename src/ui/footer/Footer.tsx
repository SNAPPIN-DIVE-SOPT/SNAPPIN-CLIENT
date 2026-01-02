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
} from '@/assets';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { SVGProps } from 'react';

//TODO: 메뉴 경로 수정
const menuItems: {
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

export default function Footer() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <footer className='border-black-6 fixed-center bottom-0 flex justify-between border-t-[0.5px] bg-white p-[0.8rem_2rem_1.6rem_2rem]'>
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href} className='flex flex-col items-center gap-[0.2rem]'>
          {isActive(item.href) ? (
            <item.activeIcon className={cn(isActive(item.href) && 'text-black-10')} />
          ) : (
            <item.inactiveIcon />
          )}
          <span className='caption-10-md'>{item.label}</span>
        </Link>
      ))}
    </footer>
  );
}
