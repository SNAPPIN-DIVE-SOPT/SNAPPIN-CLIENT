import React from 'react';
import { IconCloseSmall, IconSearch } from '../../../assets';
import { cn } from '../../../lib/cn';
import { IconButton } from '..';

type ButtonSearchBarProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & {
  headline: string;
  supportingText?: string;
  iconClassName?: string;
  headlineClassName?: string;
  supportingTextClassName?: string;
  onClearAction?: () => void;
  clearButtonAriaLabel?: string;
};

export default function ButtonSearchBar({
  className,
  headline,
  type = 'button',
  iconClassName,
  headlineClassName,
  onClearAction,
  clearButtonAriaLabel = '검색 조건 초기화',
  ...props
}: ButtonSearchBarProps) {
  return (
    <div
      className={cn(
        'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem]',
        className,
      )}
    >
      <button
        type={type}
        className='flex min-w-0 flex-1 items-center gap-[1.5rem] text-left'
        {...props}
      >
        <IconSearch
          className={cn('text-black-7 h-[2.4rem] w-[2.4rem] shrink-0', iconClassName)}
          aria-hidden='true'
        />
        <span className='flex min-w-0 flex-1 flex-col gap-[0.4rem]'>
          <span
            className={cn('caption-14-md text-black-9', headlineClassName)}
            data-slot='headline'
          >
            {headline}
          </span>
          {/*{supportingText ? (
            <span
              className={cn('caption-12-md text-black-5', supportingTextClassName)}
              data-slot='supporting'
            >
              {supportingText}
            </span>
          ) : null}*/}
        </span>
      </button>
      {onClearAction && (
        <IconButton
          type='button'
          aria-label={clearButtonAriaLabel}
          onClick={onClearAction}
          className='flex h-[2.4rem] w-[2.4rem] shrink-0 items-center justify-center'
        >
          <IconCloseSmall className='text-black-8 h-[2.4rem] w-[2.4rem]' aria-hidden='true' />
        </IconButton>
      )}
    </div>
  );
}
