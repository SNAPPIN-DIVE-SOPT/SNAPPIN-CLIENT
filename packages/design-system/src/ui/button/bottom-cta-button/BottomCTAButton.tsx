import { Button } from '../..';
import { cn } from '../../../lib/cn';

type BottomCTAButtonRootProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  background?: 'white' | 'none';
  hasPadding?: boolean;
};

function BottomCTAButtonRoot({
  children,
  fixed = false,
  background = 'none',
  className,
  hasPadding = false,
  ...props
}: BottomCTAButtonRootProps) {
  return (
    <div
      className={cn(
        fixed ? 'fixed-center bottom-0' : 'mt-auto',
        background === 'white' ? 'bg-black-1' : undefined,
        hasPadding ? 'px-[2.4rem] pt-[0.8rem] pb-[2rem]' : undefined,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SingleBottomCTAButtonProps = React.ComponentProps<typeof Button>;

function SingleBottomCTAButton({ children, ...props }: SingleBottomCTAButtonProps) {
  return <Button {...props}>{children}</Button>;
}

type DoubleBottomCTAButtonProps = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  className?: string;
};

function DoubleBottomCTAButton({ leftButton, rightButton, className }: DoubleBottomCTAButtonProps) {
  return (
    <div className={cn('flex gap-[0.6rem]', className)}>
      {leftButton}
      {rightButton}
    </div>
  );
}

type BottomCTAButtonComponent = typeof BottomCTAButtonRoot & {
  Single: typeof SingleBottomCTAButton;
  Double: typeof DoubleBottomCTAButton;
};

const BottomCTAButton: BottomCTAButtonComponent = Object.assign(BottomCTAButtonRoot, {
  Single: SingleBottomCTAButton,
  Double: DoubleBottomCTAButton,
});

export default BottomCTAButton;
