export const USER_QUERY_KEY = {
    // AI 큐레이션
    AI_CURATION: ['ai-curation'],
    AI_CURATION_QUESTIONS:() => [...USER_QUERY_KEY.AI_CURATION, 'questions'],
    AI_CURATION_QUESTION_STEP: (step: number) => [...USER_QUERY_KEY.AI_CURATION_QUESTIONS(), step],
    AI_CURATION_RESULT: () => [...USER_QUERY_KEY.AI_CURATION, 'result'],

    // 추천 스냅 명소
    RECOMMENDATION: ['recommendation'],
    RECOMMENDATION_SNAP_PLACE: () => [...USER_QUERY_KEY.RECOMMENDATION, 'places'],

    // 추천 포트폴리오
    RECOMMENDATION_PORTFOLIOS: ['recommendation-portfolios'],
    RECOMMENDATION_PORTFOLIOS_PORTFOLIOS: () => [...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS, 'portfolios'],
    RECOMMENDATION_PORTFOLIOS_PORTFOLIOS_LOGIN: (isLogin?: boolean) => [...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS_PORTFOLIOS(), isLogin ? 'login' : 'not-login'],
  } as const;