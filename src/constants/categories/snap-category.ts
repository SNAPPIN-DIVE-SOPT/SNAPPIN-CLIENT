export const SNAP_CATEGORY = {
  GRADUATION: '졸업스냅',
  WEDDING: '결혼스냅',
  COUPLE: '커플스냅',
  DAILY: '일상스냅',
  FAMILY: '가족스냅',
  RECITAL: '연주스냅',
} as const;

export type SnapCategory = keyof typeof SNAP_CATEGORY;
export type SnapCategoryLabel = typeof SNAP_CATEGORY[SnapCategory];