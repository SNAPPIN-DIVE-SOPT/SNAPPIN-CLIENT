import { cn } from '@/utils/cn';
import { IconButton } from '@/ui/button';
import { IconClose } from '@/assets';
import { MoodCode } from '@/types/moodCode';
import { FilterChipVariant } from './types/filterChipVariant';
import { FILTER_CHIP_THEME } from './constants/filterChipTheme';

const getVariant = (isSelected: boolean, onRemove?: (tag: MoodCode) => void): FilterChipVariant => {
  if (onRemove) { return 'selectedRemovable'; }
  else if (isSelected) { return 'selected'; }
  else { return 'default'; }
}

export type FilterChipProps = {
  label: MoodCode;
  isSelected: boolean;
  onClick?: (tag: MoodCode) => void;
  onRemove?: (tag: MoodCode) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

export default function FilterChip({
  label,
  isSelected,
  onClick,
  onRemove,
  ...props
}: FilterChipProps) {
  if (!isSelected && onRemove) { throw new Error('불가능한 조합입니다.'); }

  const variant = getVariant(isSelected, onRemove);
  const { buttonClassName, labelClassName } = FILTER_CHIP_THEME[variant];

  return (
    <div
      className={cn(
        'inline-flex justify-center items-center py-[0.6rem] bg-black-10 rounded-[0.4rem] transition-[background-color] duration-500 ease-in-out',
        buttonClassName
      )}
      {...props}
    >
      <button
        aria-label={`${label} 필터`}
        aria-pressed={isSelected}
        onClick={onClick ? () => onClick(label) : undefined}
      >
        <span className={cn('caption-12-md transition-[color] duration-500 ease-in-out', labelClassName)}>
          {label}
        </span>
      </button>
      { onRemove && (
        <IconButton onClick={() => onRemove(label)}>
          <IconClose
            className='w-[1.5rem] h-[1.5rem] m-[0.4rem] text-black-7'
          />
        </IconButton>
      )}
    </div>
  );
}