import { ChipTheme } from '@/ui/chip/types/chipTheme';
import { StateCode } from '../types/stateCode';

export const STATE_CHIP_THEME_BY_LABEL: Record<StateCode, ChipTheme> = {
  'RESERVATION_REQUESTED': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  'AUTHOR_CONFIRMING': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  'PAYMENT_REQUESTED': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  'PAYMENT_COMPLETED': { chipClassName: 'bg-blue', labelClassName: 'text-blue-text' },
  'RESERVATION_COMPLETED': { chipClassName: 'bg-green', labelClassName: 'text-green-text' },
  'RESERVATION_CANCELLED': { chipClassName: 'bg-red', labelClassName: 'text-red-text' },
  'SHOOT_COMPLETED': { chipClassName: 'bg-black-4', labelClassName: 'text-black-8' },
};