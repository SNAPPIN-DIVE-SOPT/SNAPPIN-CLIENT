import { ROUTES } from '@/src/constants/routes';

export type Base = {
  label: string;
  gtag: string;
  route: string;
};

export type GTagEvent = Base & {
  label: string;
};

export const G_TAG: { [key: string]: Base } = {
  AI_MOOD_CURATION_CLICK: {
    label: 'AI 무드 큐레이션 받아보기',
    gtag: 'AI 무드 큐레이션 받아보기_click',
    route: ROUTES.LOGIN_AI_CURATION,
  },

  MOOD_SNAP_PRODUCT_CLICK: {
    label: '무드 스냅 상품 둘러보기',
    gtag: '무드 스냅 상품 둘러보기_click',
    route: ROUTES.MOOD_SNAP_PRODUCTS,
  },

  MOOD_SNAP_RESERVE_CLICK: {
    label: '무드 스냅 예약하기',
    gtag: '무드 스냅 예약하기_click',
    route: ROUTES.LOGIN_MOOD_SNAP_RESERVE,
  },
  PHOTOGRAPHER_JOIN: {
    label: '작가 입점 방법 알아보기',
    gtag: '작가 입점 방법 알아보기_click',
    route:
      'https://pretty-shake-931.notion.site/Snappin-2eea9c9b4473802d9d2ddcb2a202bc18?source=copy_link',
  },
};
