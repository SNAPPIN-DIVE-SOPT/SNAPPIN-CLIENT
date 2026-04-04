import { HTMLAttributes } from 'react';
import { Sheet, SheetContent } from '../..';
import { cn } from '../../../lib';

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
  variant?: 'default' | 'plain';
};

const ControlSheetField = ({
  label,
  selectedValue,
  children,
  active,
  className,
  variant = 'default',
  ...props
}: ControlSheetFieldProps) => {
  const showValue = Boolean(selectedValue) && !active;

  return (
    <div
      className={cn(
        'flex w-full flex-col',
        variant === 'default' && 'bg-black-3 p-[1.5rem]',
        variant === 'default' && active && 'bg-black-1 gap-[1rem]',
        variant === 'plain' && active && 'gap-[1rem]',
        className,
      )}
      {...props}
    >
      <div className='flex flex-row justify-between'>
        <h3 className={active ? 'font-16-md text-black-10' : 'caption-14-md text-black-8'}>
          {label}
        </h3>
        {showValue && <span className='caption-14-md text-black-10'>{selectedValue}</span>}
      </div>
      {active && children}
    </div>
  );
};

const ControlSheet = Object.assign(ControlSheetRoot, { Field: ControlSheetField });

export default ControlSheet;
