import { ChipStyle } from '@/ui/chip/types/chipStyle';
import { StateChipLabel } from '../types/stateChipLabel';

export const STATE_CHIP_STYLE_BY_LABEL: Record<StateChipLabel, ChipStyle> = {
  '예약 요청': { chipStyle: 'bg-yellow', labelColor: 'text-yellow-text' },
  '작가 확인 중': { chipStyle: 'bg-yellow', labelColor: 'text-yellow-text' },
  '결제 요청': { chipStyle: 'bg-yellow', labelColor: 'text-yellow-text' },
  '결제 완료': { chipStyle: 'bg-blue', labelColor: 'text-blue-text' },
  '예약 확정': { chipStyle: 'bg-green', labelColor: 'text-green-text' },
  '예약 취소': { chipStyle: 'bg-red', labelColor: 'text-red-text' },
  '촬영 완료': { chipStyle: 'bg-black-4', labelColor: 'text-black-8' },
};