export const USER_QUERY_KEY = {
    // AI 큐레이션
    AI_CURATION: ['ai-curation'],
    AI_CURATION_QUESTIONS:() => [...USER_QUERY_KEY.AI_CURATION, 'questions'],
    AI_CURATION_QUESTION_STEP: (step: number) => [...USER_QUERY_KEY.AI_CURATION_QUESTIONS(), step],
    AI_CURATION_RESULT: () => [...USER_QUERY_KEY.AI_CURATION, 'result'],

    // 추천 스냅 명소
    RECOMMENDATION: ['recommendation'],
    RECOMMENDATION_SNAP_PLACE: () => [...USER_QUERY_KEY.RECOMMENDATION, 'places'],
  } as const;