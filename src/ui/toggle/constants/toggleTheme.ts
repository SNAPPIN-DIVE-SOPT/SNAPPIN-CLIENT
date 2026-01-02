import { TabType } from '../types/tabType';

type ToggleTheme = {
  trackClassName: string;
  thumbClassName: string;
  labelClassName: string;
  label: string;
};

export const TOGGLE_THEME_BY_TAB: Record<TabType, ToggleTheme> = {
  'client' : { trackClassName: 'bg-black-4', thumbClassName: 'translate-x-0 bg-black-10', labelClassName: 'text-black-1', label: '고객' },
  'author': { trackClassName: 'bg-black-10', thumbClassName: 'translate-x-[2.7rem] bg-neon-black', labelClassName: 'text-black-10', label: '작가' },
};