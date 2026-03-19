export const PHOTOGRAPHER_TAB = {
  PORTFOLIO: 'PORTFOLIO',
  PRODUCT: 'PRODUCT',
} as const;

export const PHOTOGRAPHER_TABS = [
  { value: PHOTOGRAPHER_TAB.PORTFOLIO, label: '포트폴리오' },
  { value: PHOTOGRAPHER_TAB.PRODUCT, label: '상품' },
];