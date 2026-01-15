import { StateChip } from '@/ui/chip';
import { cn } from '@/utils/cn';
import { StateCode } from '@/types/stateCode';

type DetailLayoutProps = {
  title: string;
  subtitle?: StateCode;
  children: React.ReactNode;
  className?: string;
};

type DetailRowProps = {
  label: string;
  value: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

const DetailLayout = ({ title, subtitle, children, className }: DetailLayoutProps) => {
  return (
    <div className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <div className='flex items-center justify-between'>
        <p className='caption-14-bd'>{title}</p>
        {subtitle && <StateChip label={subtitle} />}
      </div>

      <div
        className={cn(
          'border-black-5 flex flex-col gap-[2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, className, labelClassName, valueClassName }: DetailRowProps) => {
  return (
    <div className={cn('caption-12-md flex items-center gap-[1rem]', className)}>
      <p className={cn('text-black-7 w-[8rem]', labelClassName)}>{label}</p>
      <p className={cn('text-black-10', valueClassName)}>{value}</p>
    </div>
  );
};

export { DetailLayout, DetailRow };
