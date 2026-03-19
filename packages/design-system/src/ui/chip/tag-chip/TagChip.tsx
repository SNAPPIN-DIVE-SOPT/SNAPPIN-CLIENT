import { TagChipVariant } from './types/tagChipVariant';
import { TAG_CHIP_THEME_BY_VARIANT } from './constants/tagChipTheme';
import { Chip } from '../..';
import { cn } from '../../../lib/cn';

type TagChipProps = {
  variant: TagChipVariant;
  label: string;
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
