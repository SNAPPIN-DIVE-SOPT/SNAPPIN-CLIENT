'use client';

import Link from 'next/link';
import { IconHomeFill, IconExploreFill, IconProfileFill, IconReservationFill } from '@/assets';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { SVGProps } from 'react';

//TODO: 메뉴 경로 수정
const menuItems: {
  href: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    href: '/',
    icon: IconHomeFill,
    label: 'Home',
  },
  {
    href: '/',
    icon: IconExploreFill,
    label: 'Explore',
  },
  {
    href: '/',
    icon: IconReservationFill,
    label: 'Reservations',
  },
  {
    href: '/',
    icon: IconProfileFill,
    label: 'Profile',
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <footer className='border-black-6 fixed right-0 bottom-0 left-0 mx-auto flex w-full max-w-[45rem] justify-between border-t-[0.5px] bg-white p-[0.8rem_2rem_1.6rem_2rem]'>
      {menuItems.map((item) => (
        <Link key={item.label} href={item.href} className='flex flex-col items-center gap-[0.2rem]'>
          <item.icon className={cn(isActive(item.href) && 'text-black-10')} />
          <span className='caption-10-md'>{item.label}</span>
        </Link>
      ))}
    </footer>
  );
}
