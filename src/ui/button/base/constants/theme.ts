import { ButtonColor, ButtonDisplay, ButtonSize } from '@/ui/button/base/types/variant';

export const BUTTON_BASE = 'items-center justify-center';

export const BUTTON_DISABLED =
  'disabled:cursor-not-allowed disabled:bg-black-4 disabled:text-black-7 disabled:border-none';

export const BUTTON_DISPLAY: Record<NonNullable<ButtonDisplay>, string> = {
  inline: 'inline-flex w-auto',
  block: 'flex',
};

export const BUTTON_SIZE: Record<NonNullable<ButtonSize>, string> = {
  small: 'py-[0.6rem] px-[1.2rem] caption-12-md rounded-[0.4rem]',
  medium: 'py-[1.25rem] w-full caption-14-md rounded-[0.6rem]',
  large: 'py-[1.3rem] w-full font-16-md rounded-[0.6rem]',
  upload: 'py-[1.9rem] w-full caption-14-md rounded-[0.6rem]',
};

export const BUTTON_COLOR: Record<NonNullable<ButtonColor>, string> = {
  primary: 'bg-neon-black text-black-10 active:bg-neon-white',
  black: 'bg-black-10 text-black-1 active:bg-black-8',
  white: 'bg-black-1 text-black-7 border border-black-5 active:bg-black-4',
  transparent: 'bg-transparent text-black-10 border border-black-10',
  muted: 'bg-transparent text-black-7 border border-black-7 active:bg-black-5',
  disabled: 'bg-black-4 text-black-7 border-none active:bg-black-6 active:text-black-7',
};
