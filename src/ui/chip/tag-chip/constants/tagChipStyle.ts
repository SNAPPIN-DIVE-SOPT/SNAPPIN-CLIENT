import { ChipTheme } from '@/ui/chip/types/chipTheme';
import { TagChipVariant } from '../types/tagChipVariant';

export const TAG_CHIP_STYLE_BY_VARIANT: Record<TagChipVariant, ChipTheme> = {
  'neon': { chipStyle: 'bg-neon-white', labelColor: 'text-black-9' },
  'gray': { chipStyle: 'bg-black-3', labelColor: 'text-black-8' },
  'transparent': { chipStyle: 'bg-transparent border-[0.07rem] border-black-1', labelColor: 'text-black-1' },
};