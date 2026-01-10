import { GraphicSuccess, GraphicError } from '@/assets';
import { DefaultModalType } from '../types/type';

export type Content = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
};

export const CONTENT: Record<Exclude<DefaultModalType, 'default'>, Content> = {
  'success': {
    icon: <GraphicSuccess />,
    title: '예약 요청이 완료되었어요!',
    description: "'내 예약'에서 진행 상황을 확인해보세요",
  },
  'error': {
    icon: <GraphicError />,
    title: '결제 요청에 실패했습니다.\n잠시 후 다시 시도해 주세요.',
  },
}