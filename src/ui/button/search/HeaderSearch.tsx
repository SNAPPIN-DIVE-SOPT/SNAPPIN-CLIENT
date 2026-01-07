import { cn } from '@/utils/cn';
import { IconSearch } from '@/assets';
import React from 'react';

type HeaderSearchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  headline: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
};

const HeaderSearch = ({
  className,
  headline,
  supportingText,
  icon,
  type = 'button',
  ...props
}: HeaderSearchProps) => {
  const resolvedIcon =
    icon === null ? null : (
      icon ?? <IconSearch className='h-[2.4rem] w-[2.4rem] text-black-7' aria-hidden='true' />
    );

  return (
    <button
      {...props}
      type={type}
      className={cn(
        'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem] text-left',
        className,
      )}
      data-variant='headerSearch'
    >
      {resolvedIcon ? <span className='shrink-0'>{resolvedIcon}</span> : null}
      <span className='min-w-0 flex flex-1 flex-col gap-[0.4rem]'>
        <span className='caption-14-bd text-black-9'>{headline}</span>
        {supportingText ? (
          <span className='caption-12-md text-black-7'>{supportingText}</span>
        ) : null}
      </span>
    </button>
  );
};

export default HeaderSearch;
