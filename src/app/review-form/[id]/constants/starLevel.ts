export const STAR_LEVEL = {
  EMPTY: 0,
  FULL: 1,
} as const;

export type StarLevel = (typeof STAR_LEVEL)[keyof typeof STAR_LEVEL];
