export const USER_QUERY_KEY = {
  // 추천 스냅 명소
  RECOMMENDATION: ['recommendation'],
  RECOMMENDATION_SNAP_PLACE: () => [...USER_QUERY_KEY.RECOMMENDATION, 'places'],

  // 추천 포트폴리오
  RECOMMENDATION_PORTFOLIOS: ['recommendation-portfolios'],
  RECOMMENDATION_PORTFOLIOS_PORTFOLIOS: () => [
    ...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS,
    'portfolios',
  ],
  RECOMMENDATION_PORTFOLIOS_PORTFOLIOS_LOGIN: (isLogin?: boolean) => [
    ...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS_PORTFOLIOS(),
    isLogin ? 'login' : 'not-login',
  ],

  // 포트폴리오
  PORTFOLIO: ['portfolio'],
  PORTFOLIO_LIST: (query: string) => [...USER_QUERY_KEY.PORTFOLIO, 'list', query],
  PORTFOLIO_DETAIL: (id: number, isLogIn: boolean) => [
    ...USER_QUERY_KEY.PORTFOLIO,
    id,
    isLogIn ? 'login' : 'not-login',
  ],

  WISH: ['wish'],
  WISHED_PORTFOLIOS: () => [...USER_QUERY_KEY.WISH, 'portfolios'],
  WISHED_PRODUCTS: () => [...USER_QUERY_KEY.WISH, 'products'],

  // 작가
  PHOTOGRAPHER: ['photographer'],
  PHOTOGRAPHER_DETAIL: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id],
  PHOTOGRAPHER_PRODUCTS: (id: number, isLogIn: boolean) => [
    ...USER_QUERY_KEY.PHOTOGRAPHER,
    id,
    'products',
    isLogIn ? 'login' : 'not-login'
  ],
  PHOTOGRAPHER_PORTFOLIOS: (id: number, isLogIn: boolean) => [
    ...USER_QUERY_KEY.PHOTOGRAPHER,
    id,
    'portfolios',
    isLogIn ? 'login' : 'not-login'
  ],

  // 공간 카테고리
  CATEGORIES: ['categories'],

  // 무드 관련
  MOODS: ['moods'],
  MOODS_FILTER: (scope: 'guest' | 'user') => [...USER_QUERY_KEY.MOODS, 'filter', scope],

  // 예약 목록 조회, 상세 조회
  RESERVATION: ['reservation'],
  RESERVATION_LISTS: () => [...USER_QUERY_KEY.RESERVATION, 'list'],
  RESERVATION_LIST: (tab: string) => [...USER_QUERY_KEY.RESERVATION_LISTS(), tab],
  RESERVATION_DETAILS: () => [...USER_QUERY_KEY.RESERVATION_LISTS(), 'details'],
  RESERVATION_DETAIL: (id: number) => [...USER_QUERY_KEY.RESERVATION_DETAILS(), id],

  // 장소 관련
  PLACES: ['places'],
  PLACES_SEARCH: (query: string) => [...USER_QUERY_KEY.PLACES, 'search', query],

  // 상품
  PRODUCT: ['product'],
  PRODUCT_DETAIL: (id: number, isLogIn: boolean) => [
    ...USER_QUERY_KEY.PRODUCT,
    id,
    isLogIn ? 'login' : 'not-login',
  ],
  PRODUCT_PORTFOLIOS: (id: number, isLogIn: boolean) => [
    ...USER_QUERY_KEY.PRODUCT,
    id,
    'portfolios',
    isLogIn ? 'login' : 'not-login'
  ],
  PRODUCT_REVIEWS: (id: number) => [...USER_QUERY_KEY.PRODUCT, id, 'reviews'],
  PRODUCT_LIST: (query: string) => [...USER_QUERY_KEY.PRODUCT, 'list', query],
  PRODUCT_AVAILABLE_TIME: (id: string, date: string) => [
    ...USER_QUERY_KEY.PRODUCT,
    id,
    date,
    'available-time',
  ],
  PRODUCT_AVAILABLE_PEOPLE_RANGE: (id: string) => [...USER_QUERY_KEY.PRODUCT, id, 'people-range'],
  PRODUCT_AVAILABLE_DURATION_TIME: (id: string) => [...USER_QUERY_KEY.PRODUCT, id, 'duration-time'],
  PRODUCT_CLOSE_DATES: (id: string, formatDate: string) => [
    ...USER_QUERY_KEY.PRODUCT,
    id,
    formatDate,
    'close-dates',
  ],
  PRODUCT_RECOMMENDATION: (moodId?: string) => [
    ...USER_QUERY_KEY.PRODUCT,
    'recommendation',
    moodId,
  ],

  // 리뷰
  REVIEW: ['review'],
  REVIEW_DETAIL: (id: number) => [...USER_QUERY_KEY.REVIEW, id],
} as const;

//이거 써라
export const PRODUCT_QUERY_KEY = {
  all: ['product'] as const,

  LISTS: () => [...PRODUCT_QUERY_KEY.all, 'list'],
  LIST: (filter: string) => [...PRODUCT_QUERY_KEY.LISTS(), filter],

  DETAILS: () => [...PRODUCT_QUERY_KEY.all, 'detail'],
  DETAIL: (id: number, isLogin: boolean) => [
    ...PRODUCT_QUERY_KEY.DETAILS(),
    id,
    isLogin ? 'login' : 'not-login',
  ],

  LIKES: () => [...PRODUCT_QUERY_KEY.all, 'like'],
  LIKE: (id: number) => [...PRODUCT_QUERY_KEY.LIKES(), id],
} as const;

//이거 쓰라고
export const PORTFOLIO_QUERY_KEY = {
  all: ['portfolio'] as const,

  LISTS: () => [...PORTFOLIO_QUERY_KEY.all, 'list'],
  LIST: (filter: string) => [...PORTFOLIO_QUERY_KEY.LISTS(), filter],

  DETAILS: () => [...PORTFOLIO_QUERY_KEY.all, 'detail'],
  DETAIL: (id: number, isLogin: boolean) => [
    ...PORTFOLIO_QUERY_KEY.DETAILS(),
    id,
    isLogin ? 'login' : 'not-login',
  ],

  LIKES: () => [...PORTFOLIO_QUERY_KEY.all, 'like'],
  LIKE: (id: number) => [...PORTFOLIO_QUERY_KEY.LIKES(), id],
} as const;
