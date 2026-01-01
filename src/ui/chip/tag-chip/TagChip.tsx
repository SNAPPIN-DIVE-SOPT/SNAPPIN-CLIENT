import { cn } from '@/utils/cn';
import Chip from '../Chip';
import { TagChipLabel } from './types/tagChipLabel';
import { TagChipVariant } from './types/tagChipVariant';
import { TAG_CHIP_STYLE_BY_VARIANT } from './constants/tagChipStyle';

type TagChipProps = {
  variant: TagChipVariant;
  label: TagChipLabel;
  className?: string;
};

export default function TagChip({
  variant,
  label,
  ...props
}: TagChipProps) {
  const { chipClassName, labelClassName } = TAG_CHIP_STYLE_BY_VARIANT[variant];

  return (
    <Chip
      label={label}
      chipClassName={cn('px-[0.6rem] py-[0.3rem]', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}