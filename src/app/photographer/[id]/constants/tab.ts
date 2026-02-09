export const PHOTOGRAPHER_TAB = {
  PORTFOLIO: 'PORTFOLIO',
  PRODUCT: 'PRODUCT',
} as const;

export type PhotographerTab = keyof typeof PHOTOGRAPHER_TAB;

export const PHOTOGRAPHER_TAB_MAP: Record<PhotographerTab, string> = {
  PORTFOLIO: '포트폴리오',
  PRODUCT: '상품',
} as const;