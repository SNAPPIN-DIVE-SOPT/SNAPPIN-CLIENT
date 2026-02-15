const toSegment = (value: number) => encodeURIComponent(String(value));

export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: (params?: string) => `/login/callback${params ? `?${params}` : ''}`,
  AI_CURATION: '/ai-curation',
  AI_CURATION_STEP: (step: number) => `/ai-curation/${toSegment(step)}`,
  AI_CURATION_RESULT: '/ai-curation/result',
  EXPLORE: (params?: string) => `/explore${params ? `?${params}` : ''}`,
  LIKE: '/like',
  PROFILE: '/profile',
  RESERVATIONS: '/reservations',
  PHOTO_FINAL: (id: number) => `/photo-final/${toSegment(id)}`,
  PHOTO_FINAL_PHOTOS_REVIEW: (id: number, reviewId: number) =>
    `/photo-final/${toSegment(id)}/photos/${toSegment(reviewId)}`,
  PHOTOGRAPHER: (id: number) => `/photographer/${toSegment(id)}`,
  PORTFOLIO: (id: number) => `/portfolio/${toSegment(id)}`,
  PRODUCT: (productId: number) => `/product/${toSegment(productId)}`,
  PRODUCT_REVIEW: (productId: number, reviewId: number) =>
    `/product/${toSegment(productId)}/review/${toSegment(reviewId)}`,
  RESERVATION: (id: number) => `/reservation/${toSegment(id)}`,
  REVIEW_FORM: (id: number) => `/review-form/${toSegment(id)}`,
} as const;

export const PHOTOGRAPHERS_ROUTES = {
  PHOTOGRAPHERS_PROFILE: '/photographers/profile',
  PHOTOGRAPHERS_RESERVATIONS: '/photographers/reservations',
  PHOTOGRAPHERS_PAYMENT: (id: number) => `/photographers/payment/${toSegment(id)}`,
  PHOTOGRAPHERS_PAYMENT_ADD_PAYMENT: (id: number) =>
    `/photographers/payment/${toSegment(id)}/add-payment`,
  PHOTOGRAPHERS_RESERVATION: (id: number) => `/photographers/reservation/${toSegment(id)}`,
  PHOTOGRAPHERS_RESERVATION_PHOTOS_REVIEW: (id: number, reviewId: number) =>
    `/photographers/reservation/${toSegment(id)}/photos/${toSegment(reviewId)}`,
} as const;
