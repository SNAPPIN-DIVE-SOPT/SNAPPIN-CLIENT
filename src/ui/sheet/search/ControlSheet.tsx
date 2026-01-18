import { Sheet, SheetContent } from '@/ui/sheet';
import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

type ControlSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const ControlSheetRoot = ({ open, onOpenChange, children, className }: ControlSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={className} side='right'>
        {children}
      </SheetContent>
    </Sheet>
  );
};

type ControlSheetFieldProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  selectedValue?: string | null;
  children?: React.ReactNode;
  active?: boolean;
  wrapperClassName?: string;
};

const ControlSheetField = ({
  label,
  selectedValue,
  children,
  active,
  wrapperClassName,
  ...props
}: ControlSheetFieldProps) => {
  const showValue = selectedValue !== '' && !active;

  return (
    <div
      className={cn(
        'bg-black-3 flex w-full flex-col rounded-[0.6rem] border-[0.1rem] border-solid border-transparent p-[1.5rem]',
        active && 'border-black-10 bg-black-1 gap-[1rem]',
        wrapperClassName,
      )}
      {...props}
    >
      <div className='flex flex-row justify-between'>
        <h3 className={active ? 'caption-14-bd text-black-10' : 'caption-12-md text-black-8'}>
          {label}
        </h3>
        {showValue && <span className='caption-12-md text-black-10'>{selectedValue}</span>}
      </div>
      {active && children}
    </div>
  );
};

const ControlSheet = Object.assign(ControlSheetRoot, { Field: ControlSheetField });

export default ControlSheet;
