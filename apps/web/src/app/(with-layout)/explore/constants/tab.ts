export const EXPLORE_TAB = {
  PORTFOLIO: 'PORTFOLIO',
  PRODUCT: 'PRODUCT',
} as const;

export type ExploreTab = keyof typeof EXPLORE_TAB;

export const EXPLORE_TAB_MAP: Record<ExploreTab, string> = {
  PORTFOLIO: '포트폴리오',
  PRODUCT: '상품',
} as const;
