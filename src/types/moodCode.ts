export const MOOD_CODE = [
  '내추럴',
  '연출된',
  '서사적인',
  '따스한',
  '청량한',
  '투명한',
  '몽환적인',
  '뚜렷한',
  '차가운',
  '디지털',
  '아날로그',
  'Y2K',
] as const;

export const MOOD_CODE_INDEX = {
  내추럴: 0,
  연출된: 1,
  서사적인: 2,
  따스한: 3,
  청량한: 4,
  투명한: 5,
  몽환적인: 6,
  뚜렷한: 7,
  차가운: 8,
  디지털: 9,
  아날로그: 10,
  Y2K: 11,
} as const;

export type MoodCode = (typeof MOOD_CODE)[number];

export const MOOD_CATEGORY_MAP = {
  COMPOSITION: '장면구성',
  ATMOSPHERE: '분위기',
  STYLE: '스타일',
} as const;

export type MoodCategory = keyof typeof MOOD_CATEGORY_MAP;
export type MoodCategoryLabel = (typeof MOOD_CATEGORY_MAP)[MoodCategory];

