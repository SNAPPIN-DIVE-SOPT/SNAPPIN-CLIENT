export const PRODUCT_TAB = {
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  PORTFOLIO: 'PORTFOLIO',
  REVIEW: 'REVIEW',
} as const;

export type ProductTab = keyof typeof PRODUCT_TAB;

export const PRODUCT_TAB_MAP: Record<ProductTab, string> = {
  PRODUCT_DETAIL: '상품 안내',
  PORTFOLIO: '포트폴리오',
  REVIEW: '리뷰',
} as const;