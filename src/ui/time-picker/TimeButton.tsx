import { cn } from '@/utils/cn';
import { TimeButtonState } from './constants/buttonState';

type TimeButtonProps = {
  time: string;
  state?: TimeButtonState;
  onClick?: (time: string) => void;
};

export function TimeButton({ time, state = 'default', onClick }: TimeButtonProps) {
  const isDisabled = state === 'disabled';

  return (
    <button
      type='button'
      disabled={isDisabled}
      onClick={() => {
        if (state !== 'disabled') {
          onClick?.(time);
        }
      }}
      className={cn(
        'caption-14-md',
        'flex items-center justify-center w-[7.4rem] h-[3.3rem] transition-colors',
        'rounded border',
        state === 'default' && 'border-black-4 text-black-10 bg-white',

        state === 'clicked' && 'border-neon-white bg-neon-white text-black-10',

        state === 'disabled' && 'text-black-6 cursor-not-allowed border-gray-200 bg-white',
      )}
    >
      {time}
    </button>
  );
}
