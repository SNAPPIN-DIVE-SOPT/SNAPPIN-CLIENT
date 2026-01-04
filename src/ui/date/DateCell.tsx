import { cn } from '@/utils/cn';

type DateProps = {
  // date yyyy-mm-dd 형식으로 저장?
  value: string;
  isSelected: boolean;
  isDisabled: boolean;
  // todo : DateCell 값 어떻게 저장할지 고민 후!
  handleSelect?: () => void;
};

export default function DateCell({ value, isDisabled, isSelected, handleSelect }: DateProps) {
  return (
    <button
      type='button'
      disabled={isDisabled}
      aria-pressed={isSelected}
      onClick={handleSelect}
      className={cn(
        'caption-14-bd text-black-zinc-7 disabled:text-black-zinc-4 w-[3.2rem] rounded-full py-[0.8rem] disabled:cursor-not-allowed',
        isSelected && 'text-black-10 bg-neon-white',
      )}
    >
      {value}
    </button>
  );
}
