import { cn } from '@/utils/cn';
import Chip from '../Chip';
import { TagCode } from './types/tagCode';
import { TAG_LABEL } from './constants/tagLabel';
import { TagChipVariant } from './types/tagChipVariant';
import { TAG_CHIP_THEME_BY_VARIANT } from './constants/tagChipTheme';

type TagChipProps = {
  variant: TagChipVariant;
  label: TagCode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function TagChip({
  variant,
  label,
  ...props
}: TagChipProps) {
  const { chipClassName, labelClassName } = TAG_CHIP_THEME_BY_VARIANT[variant];

  return (
    <Chip
      label={TAG_LABEL[label]}
      chipClassName={cn('px-[0.6rem] py-[0.3rem]', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}