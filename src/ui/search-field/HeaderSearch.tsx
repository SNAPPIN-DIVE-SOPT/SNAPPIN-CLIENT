import { cn } from '@/utils/cn';
import SearchFieldBase from './base/SearchField';

type HeaderSearchProps = Omit<React.ComponentProps<typeof SearchFieldBase>, 'headline'> & {
  headline: string;
};

export default function HeaderSearch({
  className,
  containerClassName,
  inputWrapperClassName,
  iconWrapperClassName,
  iconClassName,
  textContainerClassName,
  headlineClassName,
  supportingTextClassName,
  placeholder,
  ...props
}: HeaderSearchProps) {
  const resolvedPlaceholder = typeof placeholder === 'undefined' ? ' ' : placeholder;

  return (
    <SearchFieldBase
      placeholder={resolvedPlaceholder}
      containerClassName={cn(
        'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem]',
        containerClassName,
      )}
      iconWrapperClassName={cn('shrink-0', iconWrapperClassName)}
      iconClassName={cn('text-black-7 h-[2.4rem] w-[2.4rem]', iconClassName)}
      inputWrapperClassName={cn('relative flex-1 py-[1.2rem] ', inputWrapperClassName)}
      className={cn(
        'text-black-9 caption-14-md w-full bg-transparent focus:outline-none',
        className,
      )}
      textContainerClassName={cn(
        'pointer-events-none absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-[0.4rem] text-left transition-opacity aria-[hidden=true]:opacity-0',
        textContainerClassName,
      )}
      headlineClassName={cn('caption-14-bd text-black-9', headlineClassName)}
      supportingTextClassName={cn('caption-12-md text-black-7', supportingTextClassName)}
      {...props}
    />
  );
}
