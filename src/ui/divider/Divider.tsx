import { cn } from '@/utils/cn';
import { DividerColor, DividerSize } from '@/ui/divider/type/variant';
import { DIVIDER_COLOR, DIVIDER_THICKNESS } from '@/ui/divider/constants/theme';

type DividerProps = {
  thickness?: DividerSize;
  color?: DividerColor;
};

export default function Divider({ thickness = 'small', color = 'gray-light' }: DividerProps) {
  return (
    <div
      style={{ height: thickness }}
      className={cn(DIVIDER_COLOR[color], DIVIDER_THICKNESS[thickness])}
    />
  );
}
