import { cn } from '../../../lib/cn';
import { IconButton } from '../..';
import { IconClose } from '../../../assets';
import { MoodCode } from '@snappin/shared/types';
import { FilterChipVariant } from './types/filterChipVariant';
import { FILTER_CHIP_THEME } from './constants/filterChipTheme';

const getVariant = (isSelected: boolean, onRemove?: (tag: MoodCode) => void): FilterChipVariant => {
  if (onRemove) {
    return 'selectedRemovable';
  } else if (isSelected) {
    return 'selected';
  } else {
    return 'default';
  }
};

export type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

export default function FilterChip({
  label,
  isSelected,
  onClick,
  onRemove,
  ...props
}: FilterChipProps) {
  if (!isSelected && onRemove) {
    console.error('FilterChip의 onRemove는 isSelected가 true일 때만 사용할 수 있습니다.');
    return null;
  }

  const variant = getVariant(isSelected, onRemove);
  const { buttonClassName, labelClassName } = FILTER_CHIP_THEME[variant];

  return (
    <div
      className={cn(
        'bg-black-10 inline-flex items-center justify-center rounded-[3.4rem] py-[0.8rem] transition-[background-color] duration-500 ease-in-out',
        buttonClassName,
      )}
      {...props}
    >
      <button
        type='button'
        aria-label={`${label} 필터`}
        aria-pressed={isSelected}
        onClick={onClick ? () => onClick(label) : undefined}
      >
        <span
          className={cn(
            'caption-12-md transition-[color] duration-500 ease-in-out',
            labelClassName,
          )}
        >
          {label}
        </span>
      </button>
      {onRemove && (
        <IconButton onClick={() => onRemove(label)}>
          <IconClose className='text-black-7 m-[0.4rem] h-[1.5rem] w-[1.5rem]' />
        </IconButton>
      )}
    </div>
  );
}
