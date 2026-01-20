import { DividerColor, DividerSize } from '@/ui/divider/type/variant';

export const DIVIDER_THICKNESS: Record<NonNullable<DividerSize>, string> = {
  small: 'h-[0.1rem]',
  large: 'h-[0.6rem]',
};

export const DIVIDER_COLOR: Record<NonNullable<DividerColor>, string> = {
  'bg-black-5': 'bg-black-5',
  'bg-black-3': 'bg-black-3',
  'bg-black-8': 'bg-black-8',
};
