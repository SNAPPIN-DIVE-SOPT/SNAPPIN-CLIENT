import { cn } from '@/utils/cn';

type DateCellProps = {
  value: string;
  iso: string;
  isSelected: boolean;
  isDisabled: boolean;
  isToday?: boolean;
  handleSelect?: () => void;
};

export default function DateCell({
  value,
  iso,
  isDisabled,
  isSelected,
  isToday,
  handleSelect,
}: DateCellProps) {
  const [y, m, d] = iso.split('-');
  const srLabel = `${y}년 ${Number(m)}월 ${Number(d)}일`;
  return (
    <div
      role='gridcell'
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      aria-current={isToday ? 'date' : undefined}
      className='flex min-w-[3.2rem] justify-center py-[0.4rem]'
    >
      <button
        type='button'
        aria-label={srLabel}
        disabled={isDisabled}
        onClick={handleSelect}
        className={cn(
          'caption-14-bd text-black-zinc-7 disabled:text-black-zinc-4 w-[3.2rem] rounded-full py-[0.8rem] disabled:cursor-not-allowed',
          isSelected && 'text-black-10 bg-neon-white',
        )}
      >
        {value}
      </button>
    </div>
  );
}
