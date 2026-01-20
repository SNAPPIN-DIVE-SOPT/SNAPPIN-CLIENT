export const USER_QUERY_KEY = {
  // AI 큐레이션
  AI_CURATION: ['ai-curation'],
  AI_CURATION_ALL: () => [...USER_QUERY_KEY.AI_CURATION, 'all'],
  AI_CURATION_RESULT: () => [...USER_QUERY_KEY.AI_CURATION, 'result'],

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
  PHOTOGRAPHER_PRODUCTS: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id, 'products'],
  PHOTOGRAPHER_PORTFOLIOS: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id, 'portfolios'],

  // 공간 카테고리
  CATEGORIES: ['categories'],

  // 무드 관련
  MOODS: ['moods'],
  MOODS_FILTER: (scope: 'guest' | 'user') => [...USER_QUERY_KEY.MOODS, 'filter', scope],

  // 예약 목록 조회
  RESERVATION: ['reservation'],
  RESERVATION_LISTS: () => [...USER_QUERY_KEY.RESERVATION, 'list'],
  RESERVATION_LIST: (tab: string) => [...USER_QUERY_KEY.RESERVATION_LISTS(), tab],

  // 예약 상세 조회
  RESERVATION_DETAILS: () => [...USER_QUERY_KEY.RESERVATION, 'details'],
  RESERVATION_DETAIL: (id: number) => [...USER_QUERY_KEY.RESERVATION_DETAILS(), id],

  // 장소 관련
  PLACES: ['places'],
  PLACES_SEARCH: (query: string) => [...USER_QUERY_KEY.PLACES, 'search', query],
} as const;
