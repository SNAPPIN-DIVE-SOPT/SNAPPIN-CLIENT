export const IMAGE_ACCEPT = {
  ALL: 'image/*',
  BASIC: 'image/jpeg,image/png,image/webp',
  WITH_HEIC: 'image/jpeg,image/png,image/webp,image/heic',
} as const;

export const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
