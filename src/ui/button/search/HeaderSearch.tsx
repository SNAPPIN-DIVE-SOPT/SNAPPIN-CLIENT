import { cn } from '@/utils/cn';
import { IconSearch } from '@/assets';
import React from 'react';

type HeaderSearchSlotClassNames = {
  container?: string;
  icon?: string;
  textWrapper?: string;
  headline?: string;
  supportingText?: string;
};

type HeaderSearchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  headline: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
  slotClassNames?: HeaderSearchSlotClassNames;
};

const HeaderSearch = ({
  className,
  headline,
  supportingText,
  icon,
  slotClassNames,
  type = 'button',
  ...props
}: HeaderSearchProps) => {
  const resolvedIcon =
    icon === null
      ? null
      : (icon ?? <IconSearch className='h-[2.4rem] w-[2.4rem]' aria-hidden='true' />);

  return (
    <button
      {...props}
      type={type}
      className={cn(
        'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem] text-left',
        className,
        slotClassNames?.container,
      )}
      data-variant='headerSearch'
    >
      {resolvedIcon ? (
        <span className={cn('shrink-0 text-black-7', slotClassNames?.icon)}>{resolvedIcon}</span>
      ) : null}
      <span
        className={cn('min-w-0 flex flex-1 flex-col gap-[0.4rem]', slotClassNames?.textWrapper)}
      >
        <span className={cn('caption-14-bd text-black-9', slotClassNames?.headline)}>
          {headline}
        </span>
        {supportingText ? (
          <span className={cn('caption-12-md text-black-7', slotClassNames?.supportingText)}>
            {supportingText}
          </span>
        ) : null}
      </span>
    </button>
  );
};

export default HeaderSearch;
