import { cn } from '@snappin/design-system/lib';

type DateButtonProps = {
  value: string;
  hasValue: boolean;
  disabled?: boolean;
  handleClick: () => void;
};

export default function DateButton({
  value,
  hasValue,
  disabled = false,
  handleClick,
}: DateButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'bg-black-1 border-black-5 caption-14-rg w-full rounded-[0.6rem] border px-[1.2rem] py-[1rem] text-left',
        hasValue ? 'text-black-10' : 'text-black-6',
        disabled && 'text-black-6 border-black-4',
      )}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
