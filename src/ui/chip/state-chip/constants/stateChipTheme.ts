import { ChipTheme } from '@/ui/chip/types/chipTheme';
import { StateCode } from '@/types/stateCode';

export const STATE_CHIP_THEME_BY_LABEL: Record<StateCode, ChipTheme> = {
  RESERVATION_REQUESTED: { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  PHOTOGRAPHER_CHECKING: { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  PAYMENT_REQUESTED: { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  PAYMENT_COMPLETED: { chipClassName: 'bg-blue', labelClassName: 'text-blue-text' },
  RESERVATION_CONFIRMED: { chipClassName: 'bg-green', labelClassName: 'text-green-text' },
  RESERVATION_REFUSED: { chipClassName: 'bg-red', labelClassName: 'text-red-text' },
  RESERVATION_CANCELED: { chipClassName: 'bg-red', labelClassName: 'text-red-text' },
  SHOOT_COMPLETED: { chipClassName: 'bg-black-4', labelClassName: 'text-black-8' },
};
