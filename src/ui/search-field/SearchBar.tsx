import { cn } from '@/utils/cn';
import SearchFieldBase from './base/SearchField';

type SearchBarProps = Omit<
  React.ComponentProps<typeof SearchFieldBase>,
  'headline' | 'supportingText'
>;

export default function SearchBar({
  className,
  containerClassName,
  inputWrapperClassName,
  iconClassName,
  ...props
}: SearchBarProps) {
  return (
    <SearchFieldBase
      containerClassName={cn(
        'bg-black-3 relative flex w-full items-center gap-[0.5625rem] rounded-[4rem] px-[1.5rem] py-[1.15rem]',
        containerClassName,
      )}
      iconClassName={cn('text-black-9 h-[2.4rem] w-[2.4rem]', iconClassName)}
      inputWrapperClassName={cn('flex-1', inputWrapperClassName)}
      className={cn(
        'text-black-10 caption-14-md placeholder-black-7 w-full bg-transparent focus:outline-none',
        className,
      )}
      {...props}
    />
  );
}
