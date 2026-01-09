import { ChipTheme } from '@/ui/chip/types/chipTheme';
import { TagChipVariant } from '../types/tagChipVariant';

export const TAG_CHIP_THEME_BY_VARIANT: Record<TagChipVariant, ChipTheme> = {
  neon: { chipClassName: 'bg-neon-black', labelClassName: 'text-black-9' },
  gray: { chipClassName: 'bg-black-3', labelClassName: 'text-black-8' },
  transparent: {
    chipClassName: 'bg-transparent border-[0.07rem] border-black-1',
    labelClassName: 'text-black-1',
  },
};
