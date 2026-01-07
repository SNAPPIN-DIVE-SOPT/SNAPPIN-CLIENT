import { cn } from '@/utils/cn';
import Chip from '../base/Chip';
import { MoodCode } from '@/types/moodCode';
import { TagChipVariant } from './types/tagChipVariant';
import { TAG_CHIP_THEME_BY_VARIANT } from './constants/tagChipTheme';

type TagChipProps = {
  variant: TagChipVariant;
  label: MoodCode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function TagChip({ variant, label, ...props }: TagChipProps) {
  const { chipClassName, labelClassName } = TAG_CHIP_THEME_BY_VARIANT[variant];

  return (
    <Chip
      label={label}
      chipClassName={cn('px-[0.6rem] py-[0.3rem] shrink-0', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}
