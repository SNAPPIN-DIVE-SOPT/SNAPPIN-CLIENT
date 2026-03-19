export type AuthUser = {
  role: UserType;
  hasPhotographerProfile: boolean;
};

export const USER_TYPE = {
  CLIENT: 'CLIENT',
  PHOTOGRAPHER: 'PHOTOGRAPHER',
} as const;

export const USER_TYPE_LABEL: Record<UserType, string> = {
  [USER_TYPE.CLIENT]: '고객',
  [USER_TYPE.PHOTOGRAPHER]: '작가',
};

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export const isValidUserType = (role: string): role is UserType =>
  Object.values(USER_TYPE).includes(role as UserType);
