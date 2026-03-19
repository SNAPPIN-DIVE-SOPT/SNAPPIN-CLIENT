export const LIKE_TAB = {
  PORTFOLIO: 'PORTFOLIO',
  PRODUCT: 'PRODUCT',
} as const;

export type LikeTab = keyof typeof LIKE_TAB;

export const LIKE_TAB_MAP: Record<LikeTab, string> = {
  PORTFOLIO: '포트폴리오',
  PRODUCT: '상품',
} as const;
