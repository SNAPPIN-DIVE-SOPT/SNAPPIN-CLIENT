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
  return (
    <>
      <nav
        className={cn(
          'bg-black-1 grid h-[5rem] w-full grid-cols-3 items-center px-[2rem] py-[1.7rem]',
          isSticky && 'sticky top-0 z-10',
          isFixed && 'fixed-center top-0 z-10',
          className,
        )}
      >
        <div className='justify-self-start'>{left}</div>
        <div className='justify-self-center'>{center}</div>
        <div className='justify-self-end'>{right}</div>
      </nav>
      {isFixed && <div className='bg-black-1 h-[5rem]' />}
    </>
  );
}
