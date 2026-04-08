export const AUTH_QUERY_KEY = {
  AUTH: ['auth'],
  // 온보딩
  ONBOARDING: () => [...AUTH_QUERY_KEY.AUTH, 'onboarding'],
  // AI 큐레이션
  AI_CURATION: () => [...AUTH_QUERY_KEY.AUTH, 'ai-curation'],
  AI_CURATION_ALL: () => [...AUTH_QUERY_KEY.AI_CURATION(), 'all'],
  AI_CURATION_RESULT: () => [...AUTH_QUERY_KEY.AI_CURATION(), 'result'],
};
