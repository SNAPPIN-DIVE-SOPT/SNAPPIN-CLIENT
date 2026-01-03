import { cn } from '@/utils/cn';

type TimeButtonState = 'default' | 'selected' | 'disabled';

type TimeButtonProps = {
  time: string;
  state?: TimeButtonState;
  onClick?: (time: string) => void;
};

const TIME_BUTTON_THEME = {
  default: 'border-black-4 text-black-10 bg-white',
  selected: 'border-neon-white bg-neon-white text-black-10',
  disabled: 'text-black-6 cursor-not-allowed border-black-4 bg-black-1',
} as const;

export const TimeButton = ({ time, state = 'default', onClick }: TimeButtonProps) => {
  const isDisabled = state === 'disabled';
  const handleOnClick = () => onClick?.(time);

  return (
    <button
      type='button'
      disabled={isDisabled}
      onClick={handleOnClick}
      className={cn(
        'caption-14-md',
        'flex h-[3.3rem] w-[7.4rem] items-center justify-center transition-colors',
        'rounded border',
        TIME_BUTTON_THEME[state],
      )}
    >
      {time}
    </button>
  );
};
