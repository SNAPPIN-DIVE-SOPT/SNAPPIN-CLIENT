import { DividerColor, DividerSize } from '@/ui/divider/type/variant';

export const DIVIDER_THICKNESS: Record<NonNullable<DividerSize>, string> = {
  small: 'h-[0.1rem]',
  large: 'h-[0.6rem]',
};

export const DIVIDER_COLOR: Record<NonNullable<DividerColor>, string> = {
  'gray-dark': 'bg-black-5',
  'gray-light': 'bg-black-3',
};
