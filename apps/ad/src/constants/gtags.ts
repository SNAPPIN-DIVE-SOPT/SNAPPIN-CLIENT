import { ROUTES } from '@/src/constants/routes';

export type Base = {
  label: string;
  gtag: string;
  route: string;
};

export const G_TAG: { [key: string]: Base } = {
  AI_MOOD_CURATION_CLICK: {
    label: 'AI 무드 큐레이션 받아보기',
    gtag: 'AI 무드 큐레이션 받아보기_click',
    route: ROUTES.LOGIN_ENTRY('ai-curation'),
  },

  MOOD_SNAP_PRODUCT_CLICK: {
    label: '무드 스냅 상품 둘러보기',
    gtag: '무드 스냅 상품 둘러보기_click',
    route: ROUTES.LOGIN_ENTRY('mood-snap'),
  },

  MOOD_SNAP_RESERVE_CLICK: {
    label: '무드 스냅 예약하기',
    gtag: '무드 스냅 예약하기_click',
    route: ROUTES.LOGIN_ENTRY('mood-snap-reserve'),
  },
  PHOTOGRAPHER_JOIN: {
    label: '작가 입점 방법 알아보기',
    gtag: '작가 입점 방법 알아보기_click',
    route: ROUTES.SNAPPIN_PHOTOGRAPHER_JOIN,
  },
};
