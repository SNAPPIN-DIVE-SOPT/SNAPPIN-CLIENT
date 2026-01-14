import React from 'react';
import { cn } from '@/utils/cn';
import { IconSearch } from '@/assets';

type ButtonSearchBarProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  headline: string;
  supportingText?: string;
  iconClassName?: string;
  headlineClassName?: string;
  supportingTextClassName?: string;
};

export default function ButtonSearchBar({
  className,
  headline,
  supportingText,
  type = 'button',
  iconClassName,
  headlineClassName,
  supportingTextClassName,
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
      <IconSearch
        className={cn('text-black-7 h-[2.4rem] w-[2.4rem] shrink-0', iconClassName)}
        aria-hidden='true'
      />
      <span className='flex min-w-0 flex-1 flex-col gap-[0.4rem]'>
        <span className={cn('caption-14-bd text-black-9', headlineClassName)} data-slot='headline'>
          {headline}
        </span>
        {supportingText ? (
          <span
            className={cn('caption-12-md text-black-5', supportingTextClassName)}
            data-slot='supporting'
          >
            {supportingText}
          </span>
        ) : null}
      </span>
    </button>
  );
}
