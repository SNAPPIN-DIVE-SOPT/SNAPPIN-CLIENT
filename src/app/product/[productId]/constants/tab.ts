export const PRODUCT_TAB = {
  PRODUCT_DETAIL: 'PRODUCT_DETAIL',
  PORTFOLIO: 'PORTFOLIO',
  REVIEW: 'REVIEW',
} as const;

export const PRODUCT_TABS = [
  { value: PRODUCT_TAB.PRODUCT_DETAIL, label: '상품 안내' },
  { value: PRODUCT_TAB.PORTFOLIO, label: '포트폴리오' },
  { value: PRODUCT_TAB.REVIEW, label: '리뷰' },
];