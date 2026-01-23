import { cn } from '@/utils/cn';
import { Drawer, DrawerContent } from '@/ui';

type BottomDrawerCommonProps = {
  children?: React.ReactNode;
  className?: string;
};

type BottomDrawerRootProps = BottomDrawerCommonProps & {
  isOpen?: boolean;
  handleOpenChange?: (open: boolean) => void;
};

const BottomDrawerRoot = ({
  isOpen,
  handleOpenChange,
  children,
  className,
}: BottomDrawerRootProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent
        className={cn(
          'bg-black-1 mx-auto max-w-[45rem] rounded-t-[1.3rem] border-none py-[1rem]',
          className,
        )}
      >
        <div
          className='bg-gray-4 mx-auto h-[0.6rem] w-[3.8rem] rounded-[2rem]'
          aria-hidden='true'
        />
        {children}
      </DrawerContent>
    </Drawer>
  );
};

type BottomDrawerTitleProps = React.ComponentPropsWithoutRef<'h3' | 'span'> &
  BottomDrawerCommonProps & {
    as?: 'h3' | 'span';
  };

const BottomDrawerTitle = ({
  as: Component = 'h3',
  children,
  className,
}: BottomDrawerTitleProps) => {
  return <Component className={cn('font-16-bd text-black-10', className)}>{children}</Component>;
};

const BottomDrawerRow = ({ children, className }: BottomDrawerCommonProps) => {
  return <div className={className}>{children}</div>;
};

const BottomDrawerSection = ({ children, className }: BottomDrawerCommonProps) => {
  return <section className={className}>{children}</section>;
};

const BottomDrawerFooter = ({ children, className }: BottomDrawerCommonProps) => {
  return <footer className={className}>{children}</footer>;
};

type BottomDrawerComponent = typeof BottomDrawerRoot & {
  Title: typeof BottomDrawerTitle;
  Section: typeof BottomDrawerSection;
  Row: typeof BottomDrawerRow;
  Footer: typeof BottomDrawerFooter;
};

const BottomDrawer: BottomDrawerComponent = Object.assign(BottomDrawerRoot, {
  Section: BottomDrawerSection,
  Title: BottomDrawerTitle,
  Row: BottomDrawerRow,
  Footer: BottomDrawerFooter,
});

export default BottomDrawer;
