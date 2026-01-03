import type { MouseEventHandler } from 'react';
import { cn } from '@/utils/cn';
import type { TimeButtonState } from './constants/buttonState';

type TimeButtonProps = {
  time: string;
  state?: TimeButtonState;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const TIME_BUTTON_THEME = {
  default: 'border-black-4 text-black-10 bg-white',
  selected: 'border-neon-white bg-neon-white text-black-10',
} as const;

export default function TimeButton({
  time,
  state = 'default',
  disabled = false,
  onClick,
}: TimeButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'caption-14-md flex h-[3.3rem] w-full items-center justify-center rounded border px-[1.8rem] py-[0.8rem] transition-colors',
        TIME_BUTTON_THEME[state],
        disabled && 'text-black-6 cursor-not-allowed border-black-4 bg-black-1',
      )}
    >
      {time}
    </button>
  );
}
