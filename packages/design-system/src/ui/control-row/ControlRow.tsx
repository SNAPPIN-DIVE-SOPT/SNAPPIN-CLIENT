import { cn } from '@snappin/design-system/lib/cn';

type ControlRowProps = {
  leftLabel: React.ReactNode;
  rightControl: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export default function ControlRow({
  leftLabel,
  rightControl,
  centered = false,
  className,
}: ControlRowProps) {
  return (
    <div className={cn('flex justify-between', centered && 'items-center', className)}>
      {leftLabel}
      {rightControl}
    </div>
  );
}

