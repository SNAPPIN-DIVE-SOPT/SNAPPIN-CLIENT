import { cn } from '@/utils/cn';
import Chip from '../Chip';
import { StateChipLabel } from './types/stateChipLabel';
import { STATE_CHIP_STYLE_BY_LABEL } from './constants/stateChipStyle';

type StateChipProps = {
  label: StateChipLabel;
  className?: string;
};

export default function StateChip({
  label,
  className,
  ...props
}: StateChipProps) {
  const { chipStyle, labelColor } = STATE_CHIP_STYLE_BY_LABEL[label];

  return (
    <Chip
      label={label}
      chipStyle={chipStyle}
      labelColor={labelColor}
      className={cn('px-[0.5rem] py-[0.2rem]', className)}
      {...props}
    />
  );
}