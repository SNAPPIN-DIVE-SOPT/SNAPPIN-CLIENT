import { UserType } from '../types/userType';

type UserTypeToggleTheme = {
  trackClassName: string;
  thumbClassName: string;
  labelClassName: string;
};

export const TOGGLE_THEME_BY_TYPE: Record<UserType, UserTypeToggleTheme> = {
  'client' : { trackClassName: 'bg-black-4', thumbClassName: 'translate-x-0 bg-black-10', labelClassName: 'text-black-1' },
  'author': { trackClassName: 'bg-black-10', thumbClassName: 'translate-x-[2.7rem] bg-neon-black', labelClassName: 'text-black-10' },
};