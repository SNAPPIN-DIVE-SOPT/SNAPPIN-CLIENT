import { Drawer, DrawerContent } from '@/ui/drawer/base/Drawer';
import { cn } from '@/utils/cn';

type BottomDrawerRootProps = {
  isOpen?: boolean;
  handleOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

const BottomDrawerRoot = ({
  isOpen,
  handleOpenChange,
  children,
  className,
}: BottomDrawerRootProps) => {
  return (
    <>
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent
          className={cn('bg-black-1 rounded-t-[1.3rem] border-none py-[1rem]', className)}
        >
          <div className='bg-gray-4 mx-auto h-[0.4rem] w-[3.8rem] rounded-[2rem]' />
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};

type BottomDrawerTitleProps = React.ComponentPropsWithoutRef<'h3' | 'span'> & {
  as?: 'h3' | 'span';
  children?: React.ReactNode;
  className?: string;
};

const BottomDrawerTitle = ({
  as: Component = 'h3',
  children,
  className,
}: BottomDrawerTitleProps) => {
  return <Component className={cn('font-16-bd text-black-10', className)}>{children}</Component>;
};

type BottomDrawerRowProps = {
  children?: React.ReactNode;
  className?: string;
};

const BottomDrawerRow = ({ children, className }: BottomDrawerRowProps) => {
  return <div className={cn(className)}>{children}</div>;
};

type BottomDrawerFooterProps = {
  children?: React.ReactNode;
  className?: string;
};

const BottomDrawerFooter = ({ children, className }: BottomDrawerFooterProps) => {
  return <footer className={cn(className)}>{children}</footer>;
};

type BottomDrawerComponent = typeof BottomDrawerRoot & {
  Title: typeof BottomDrawerTitle;
  Row: typeof BottomDrawerRow;
  Footer: typeof BottomDrawerFooter;
};

const BottomDrawer: BottomDrawerComponent = Object.assign(BottomDrawerRoot, {
  Title: BottomDrawerTitle,
  Row: BottomDrawerRow,
  Footer: BottomDrawerFooter,
});

export default BottomDrawer;
