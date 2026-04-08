type Params = Record<string, string>;

export const ROUTES = {
  HOME: '/',
  LOGIN: (params?: Params) => `/login${params ? getQueryParams(params) : ''}`,
  AI_CURATION: '/ai-curation',
  AI_CURATION_STEP: (step: number) => `/ai-curation/${step}`,
  AI_CURATION_RESULT: '/ai-curation/result',
  ON_BOARDING: (step: number) => `/on-boarding/${step}`,
  ON_BOARDING_FINAL: '/on-boarding/final',
  EXPLORE: (params?: Params) => `/explore${params ? getQueryParams(params) : ''}`,
  LIKE: '/like',
  PROFILE: '/profile',
  RESERVATIONS: '/reservations',
  PHOTOGRAPHER: (id: number, params?: Params) =>
    `/photographer/${id}${params ? getQueryParams(params) : ''}`,
  PORTFOLIO: (id: number) => `/portfolio/${id}`,
  PRODUCT: (productId: number, params?: Params) =>
    `/product/${productId}${params ? getQueryParams(params) : ''}`,
  PRODUCT_REVIEW: (productId: number, reviewId: number) =>
    `/product/${productId}/review/${reviewId}`,
  RESERVATION: (id: number) => `/reservation/${id}`,
  RESERVATION_FORM: (productId: number) => `/product/${productId}/reservation-form`,
  REVIEW_FORM: (id: number) => `/review-form/${id}`,
} as const;

export const PHOTOGRAPHERS_ROUTES = {
  PROFILE: '/photographers/profile',
  RESERVATIONS: (params?: Params) =>
    `/photographers/reservations${params ? getQueryParams(params) : ''}`,
  PAYMENT: (id: number) => `/photographers/payment/${id}`,
  PAYMENT_ADD_PAYMENT: (id: number) => `/photographers/payment/${id}/add-payment`,
  RESERVATION: (id: number) => `/photographers/reservation/${id}`,
  RESERVATION_PHOTOS_REVIEW: (id: number, reviewId: number) =>
    `/photographers/reservation/${id}/photos/${reviewId}`,
} as const;

const getQueryParams = (params: Params) => {
  const query = `?${new URLSearchParams(params).toString()}`;
  return query;
};
