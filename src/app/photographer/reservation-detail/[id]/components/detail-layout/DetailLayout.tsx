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
};

const DetailLayout = ({ title, subtitle, children, className }: DetailLayoutProps) => {
  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem]'>
      <div className='flex items-center justify-between'>
        <p className='caption-14-bd'>{title}</p>
        {subtitle && <StateChip label={subtitle} />}
      </div>
      <div className='pt-[1.2rem] pb-[2.4rem]'>
        <div
          className={cn(
            'border-black-5 flex flex-col gap-[2rem] rounded-[0.6rem] border-[0.7px] px-[1.7rem] py-[1.3rem]',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, className }: DetailRowProps) => {
  return (
    <div className={cn('caption-12-md flex items-center gap-[1rem]', className)}>
      <p className='text-black-7 min-w-[8rem]'>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export { DetailLayout, DetailRow };
