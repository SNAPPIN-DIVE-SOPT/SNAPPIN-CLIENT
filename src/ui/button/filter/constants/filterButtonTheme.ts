import { FilterButtonVariant } from '../types/filterButtonVariant';

type FilterButtonTheme = { buttonClassName: string; labelClassName: string; };

export const FILTER_BUTTON_THEME: Record<FilterButtonVariant, FilterButtonTheme> = {
  'default' : { buttonClassName: 'px-[0.8rem] bg-black-3', labelClassName: 'text-black-8' },
  'selected': { buttonClassName: 'px-[0.8rem] bg-black-10', labelClassName: 'text-black-1' },
  'removable': { buttonClassName: 'h-[2.6rem] pl-[0.8rem] pr-[0.3rem]', labelClassName: 'text-black-1 cursor-default' },
}