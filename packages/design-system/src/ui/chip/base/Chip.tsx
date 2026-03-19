import { cn } from '../../../lib/cn';

type ChipProps = {
  label: string;
  chipClassName: string;
  labelClassName: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function Chip({ label, chipClassName, labelClassName, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-[0.3rem]',
        chipClassName,
      )}
      {...props}
    >
      <span className={cn('caption-12-md', labelClassName)}>{label}</span>
    </div>
  );
}
