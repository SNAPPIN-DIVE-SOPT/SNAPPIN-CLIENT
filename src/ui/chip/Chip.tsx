import { cn } from '@/utils/cn';

type ChipProps = {
  label: string;
  chipClassName: string;
  labelClassName: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function Chip({
  label,
  chipClassName,
  labelClassName,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex justify-center items-center rounded-[0.3rem]',
        chipClassName
      )}
      {...props}
    >
      <span className={cn('caption-12-md', labelClassName)}>
        {label}
      </span>
    </div>
  );
}