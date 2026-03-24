import { ProfileItemSize } from '../types/variant';

export const PROFILE_ITEM_BASE = 'flex w-full items-center text-left';

export const PROFILE_ITEM_SIZE_THEME: Record<
  ProfileItemSize,
  {
    root: string;
    avatar: string;
  }
> = {
  sm: {
    root: '',
    avatar: 'h-[6.4rem] w-[6.4rem]',
  },
  md: {
    root: '',
    avatar: 'h-[8.7rem] w-[8.7rem]',
  },
};
