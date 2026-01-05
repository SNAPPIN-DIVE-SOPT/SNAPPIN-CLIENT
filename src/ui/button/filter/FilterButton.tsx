import { cn } from '@/utils/cn';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';
import { TAG_LABEL } from '@/ui/chip/tag-chip/constants/tagLabel';
import { IconClose } from '@/assets';
import { FilterButtonStatus } from './types/filterButtonStatus';
import { FILTER_BUTTON_THEME } from './constants/filterButtonTheme';

export type FilterButtonProps = {
  label: TagCode;
  status: FilterButtonStatus;
  onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export default function FilterButton({
  label,
  status,
  onClick,
  ...props
}: FilterButtonProps) {
  const { buttonClassName, labelClassName } = FILTER_BUTTON_THEME[status];
  const isSelected = status === 'selected' || status === 'removable';
  const removable = status === 'removable';

  return (
    <button
      type='button'
      aria-label={`${TAG_LABEL[label]} 필터`}
      aria-pressed={isSelected}
      className={cn(
        'inline-flex justify-center items-center py-[0.6rem] bg-black-10 rounded-[0.4rem] transition-[background-color] duration-500 ease-in-out',
        buttonClassName
      )}
      onClick={!removable ? onClick : undefined}
      {...props}
    >
      <span className={cn('caption-12-md transition-[color] duration-500 ease-in-out', labelClassName)}>
        {TAG_LABEL[label]}
      </span>
      { removable && (
        <div
          role='button'
          aria-label={`${TAG_LABEL[label]} 필터 제거`}
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              onClick();
            };
          }}
        >
          <IconClose
            className='w-[1.5rem] h-[1.5rem] m-[0.4rem] text-black-7'
          />
        </div>
      )}
    </button>
  );
}