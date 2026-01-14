export const USER_TYPES = ['CLIENT', 'PHOTOGRAPHER'] as const;
export const USER_TYPE_LABEL: Record<UserType, string> = {
  CLIENT: '고객',
  PHOTOGRAPHER: '작가',
};

export type UserType = (typeof USER_TYPES)[number];
