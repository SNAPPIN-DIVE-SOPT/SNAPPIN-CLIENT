export const USER_TYPES = ['client', 'author'] as const;
export const USER_TYPE_LABEL: Record<UserType, string> = {
  client: '고객',
  author: '작가'
};

export type UserType = typeof USER_TYPES[number];