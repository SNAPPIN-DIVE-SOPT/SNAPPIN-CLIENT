import { StateCode } from '@snappin/shared/types';
import { STATE_CHIP_THEME_BY_LABEL } from './constants/stateChipTheme';
import { Chip } from '../..';
import { STATE_LABEL } from './constants/stateLabel';
import { cn } from '../../../lib/cn';

type StateChipProps = {
  label: StateCode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function StateChip({ label, ...props }: StateChipProps) {
  const { chipClassName, labelClassName } = STATE_CHIP_THEME_BY_LABEL[label];

  return (
    <Chip
      label={STATE_LABEL[label]}
      chipClassName={cn('px-[0.5rem] py-[0.2rem]', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}
