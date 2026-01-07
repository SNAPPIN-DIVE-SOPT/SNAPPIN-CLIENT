import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';
import React from 'react';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  iconClassName?: string;
};

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, iconClassName, type = 'search', ...props }, ref) => {
    return (
      <div
        className={cn(
          'bg-black-3 relative flex w-full items-center gap-[0.8rem] rounded-[4rem] px-[1.5rem] py-[1.15rem]',
          containerClassName,
        )}
      >
        <IconSearch
          className={cn('text-black-9 h-[2.4rem] w-[2.4rem] shrink-0', iconClassName)}
          aria-hidden='true'
        />
        <input
          ref={ref}
          type={type}
          className={cn(
            'text-black-10 caption-14-md placeholder-black-7 w-full bg-transparent focus:outline-none',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
