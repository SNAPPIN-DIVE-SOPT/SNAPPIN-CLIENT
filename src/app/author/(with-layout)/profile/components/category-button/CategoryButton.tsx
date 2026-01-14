import { cn } from '@/utils/cn';

type CategoryButtonProps = {
  label: string;
  className?: string;
  handleClick?: () => void;
};

export default function CategoryButton({ label, className, handleClick }: CategoryButtonProps) {
  return (
    <button
      type='button'
      className={cn('caption-14-md bg-black-1 py-[1.5rem] pl-[2rem] text-left', className)}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
