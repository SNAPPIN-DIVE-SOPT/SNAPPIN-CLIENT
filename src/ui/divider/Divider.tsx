import { DividerColor, DividerSize } from '@/ui/divider/type/variant';
import { DIVIDER_COLOR, DIVIDER_THICKNESS } from '@/ui/divider/constants/theme';
import { cn } from '@/utils/cn';

type DividerProps = {
  thickness?: DividerSize;
  color?: DividerColor;
  className?: string;
};

export default function Divider({
  thickness = 'small',
  color = 'bg-black-3',
  className,
}: DividerProps) {
  return <div className={cn(DIVIDER_COLOR[color], DIVIDER_THICKNESS[thickness], className)} />;
}
