import React from 'react';
import { cn } from '@/utils/cn';

type NavigationProps = React.HTMLAttributes<HTMLElement> & {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Navigation({ left, center, right, className }: NavigationProps) {
  return (
    <nav
      className={cn(
        'grid h-[5rem] w-full grid-cols-3 items-center px-[2rem] py-[1.7rem]',
        className,
      )}
    >
      <div className='justify-self-start'>{left}</div>
      <div className='justify-self-center'>{center}</div>
      <div className='justify-self-end'>{right}</div>
    </nav>
  );
}
