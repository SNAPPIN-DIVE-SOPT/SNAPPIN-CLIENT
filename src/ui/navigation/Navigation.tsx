import React from 'react';
import { cn } from '@/utils/cn';

type NavigationProps = React.HTMLAttributes<HTMLElement> & {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  isSticky?: boolean;
  isFixed?: boolean;
};

export default function Navigation({
  left,
  center,
  right,
  className,
  isSticky = false,
  isFixed = false,
}: NavigationProps) {
  const bgClass = className?.split(' ').find((cls) => cls.startsWith('bg')) ?? 'bg-black-1';

  return (
    <>
      <nav
        className={cn(
          'bg-black-1 nav-height grid w-full grid-cols-3 items-center px-[2rem] py-[1.7rem]',
          isSticky && 'sticky top-0 z-10',
          isFixed && 'fixed-center top-0 z-10',
          className,
        )}
      >
        <div className='justify-self-start'>{left}</div>
        <div className='justify-self-center'>{center}</div>
        <div className='justify-self-end'>{right}</div>
      </nav>
      {isFixed && <div className={cn(bgClass + ' nav-height')} />}
    </>
  );
}
