import { cn } from '@/utils/cn';

type DetailRowProps = {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
};

export default function DetailRow({ label, value, className, valueClassName }: DetailRowProps) {
  return (
    <div className={cn('caption-12-md flex items-start gap-[1rem]', className)}>
      <p className='text-black-7 min-w-[8rem]'>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
