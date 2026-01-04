import { cn } from '@/utils/cn';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';
import { TAG_LABEL } from '@/ui/chip/tag-chip/constants/tagLabel';
import { IconClose } from '@/assets';
import { FilterButtonVariant } from './types/filterButtonVariant';
import { FILTER_BUTTON_THEME } from './constants/filterButtonTheme';

function getVariant(isSelected: boolean, removable: true | undefined): FilterButtonVariant {
  if (!isSelected) return 'default';
  else if (!removable) return 'selected';
  else return 'removable';
}

export type FilterButtonProps = {
  label: TagCode;
  isSelected: boolean;
  removable?: true;
  onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export default function FilterButton({
  label,
  isSelected,
  removable,
  onClick,
  ...props
}: FilterButtonProps) {
  const variant = getVariant(isSelected, removable);
  const { buttonClassName, labelClassName } = FILTER_BUTTON_THEME[variant];

  return (
    <button
      type='button'
      aria-label={`${label} 필터`}
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
          aria-label={`${label} 필터 제거`}
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.code === 'Enter') onClick();
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