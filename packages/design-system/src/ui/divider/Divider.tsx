import { DividerColor, DividerSize } from './type/variant';
import { cn } from '../../lib/cn';
import { DIVIDER_COLOR, DIVIDER_THICKNESS } from './constants/theme';

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
