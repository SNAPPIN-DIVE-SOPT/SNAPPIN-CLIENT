import { FilterChipVariant } from '../types/filterChipVariant';

type FilterChipTheme = { buttonClassName: string; labelClassName: string };

export const FILTER_CHIP_THEME: Record<FilterChipVariant, FilterChipTheme> = {
  default: {
    buttonClassName: 'px-[1.2rem] bg-black-1 border-[0.1rem] rounded-[2.4rem] border-black-4',
    labelClassName: 'text-black-7 ',
  },
  selected: { buttonClassName: 'px-[1.2rem] bg-black-10 rounded-[3.4rem]', labelClassName: 'text-black-1' },
  selectedRemovable: {
    buttonClassName: 'h-[2.6rem] pl-[0.8rem] pr-[0.3rem]',
    labelClassName: 'text-black-1 cursor-default',
  },
};
