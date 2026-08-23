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
  '클린한',
  '시크한',
  '빈티지',
] as const;

export type MoodCode = (typeof MOOD_CODE)[number];

export const MOOD_CODE_INDEX = Object.fromEntries(
  MOOD_CODE.map((mood, index) => [mood, index]),
) as Record<MoodCode, number>;

export const MOOD_CATEGORY_MAP = {
  COMPOSITION: '장면구성',
  ATMOSPHERE: '분위기',
  STYLE: '스타일',
} as const;

export type MoodCategory = keyof typeof MOOD_CATEGORY_MAP;
export type MoodCategoryLabel = (typeof MOOD_CATEGORY_MAP)[MoodCategory];
