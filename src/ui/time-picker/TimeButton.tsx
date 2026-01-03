import { cn } from '@/utils/cn';
import type { TimeButtonClickHandler, TimeButtonState } from './constants/buttonState';

type TimeButtonProps = {
  time: string;
  state?: TimeButtonState;
  handleClick?: TimeButtonClickHandler;
};

const TIME_BUTTON_THEME = {
  default: 'border-black-4 text-black-10 bg-white',
  selected: 'border-neon-white bg-neon-white text-black-10',
  disabled: 'text-black-6 cursor-not-allowed border-black-4 bg-black-1',
} as const;

export const TimeButton = ({ time, state = 'default', handleClick }: TimeButtonProps) => {
  const handleButtonClick = () => handleClick?.(time);

  return (
    <button
      type='button'
      disabled={state === 'disabled'}
      onClick={handleButtonClick}
      className={cn(
        'caption-14-md flex h-[3.3rem] w-full items-center justify-center rounded border px-[1.8rem] py-[0.8rem] transition-colors',
        TIME_BUTTON_THEME[state],
      )}
    >
      {time}
    </button>
  );
};
