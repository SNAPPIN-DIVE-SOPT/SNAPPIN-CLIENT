import React from 'react';
import { cn } from '@/utils/cn';
import { IconSearch } from '@/assets';

type ButtonSearchBarProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  headline: string;
  supportingText?: string;
};

export default function ButtonSearchBar({
  className,
  headline,
  supportingText,
  type = 'button',
  ...props
}: ButtonSearchBarProps) {
  return (
    <button
      type={type}
      className={cn(
        'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem] text-left',
        className,
      )}
      {...props}
    >
      <span className='text-black-7 shrink-0' data-slot='icon'>
        <IconSearch className='h-[2.4rem] w-[2.4rem]' aria-hidden='true' />
      </span>
      <span className='flex min-w-0 flex-1 flex-col gap-[0.4rem]'>
        <span className='caption-14-bd text-black-9' data-slot='headline'>
          {headline}
        </span>
        {supportingText ? (
          <span className='caption-12-md text-black-7' data-slot='supporting'>
            {supportingText}
          </span>
        ) : null}
      </span>
    </button>
  );
}
