import { ChipTheme } from '@/ui/chip/types/chipTheme';
import { StateChipLabel } from '../types/stateChipLabel';

export const STATE_CHIP_STYLE_BY_LABEL: Record<StateChipLabel, ChipTheme> = {
  '예약 요청': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  '작가 확인 중': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  '결제 요청': { chipClassName: 'bg-yellow', labelClassName: 'text-yellow-text' },
  '결제 완료': { chipClassName: 'bg-blue', labelClassName: 'text-blue-text' },
  '예약 확정': { chipClassName: 'bg-green', labelClassName: 'text-green-text' },
  '예약 취소': { chipClassName: 'bg-red', labelClassName: 'text-red-text' },
  '촬영 완료': { chipClassName: 'bg-black-4', labelClassName: 'text-black-8' },
};