import { ProfileSize } from '../types/variant';

export const PROFILE_BASE = 'flex w-full items-center text-left';

export const PROFILE_SIZE_THEME: Record<
  ProfileSize,
  {
    avatar: number;
  }
> = {
  sm: {
    avatar: 64,
  },
  md: {
    avatar: 87,
  },
};

export const PROFILE_TITLE_TYPOGRAPHY_MAP = {
  'font-16-sb': 'font-16-sb',
  'caption-14-bd': 'caption-14-bd',
} as const;

export const PROFILE_DESCRIPTION_TYPOGRAPHY_MAP = {
  'caption-14-rg': 'caption-14-rg',
  'caption-12-rg': 'caption-12-rg',
} as const;

export const PROFILE_META_TYPOGRAPHY_MAP = {
  'caption-11-md': 'caption-11-md',
  'caption-12-rg': 'caption-12-rg',
} as const;

export const PROFILE_TEXT_COLOR_MAP = {
  'black-7': 'text-black-7',
  'black-8': 'text-black-8',
  'black-10': 'text-black-10',
} as const;
