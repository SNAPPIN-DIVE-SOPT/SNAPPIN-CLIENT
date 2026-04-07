export const AUTH_QUERY_KEY = {
  AUTH: ['auth'],
  ONBOARDING: () => [...AUTH_QUERY_KEY.AUTH, 'onboarding'],
  // AI 큐레이션
  AI_CURATION: ['ai-curation'],
  AI_CURATION_ALL: () => [...AUTH_QUERY_KEY.AUTH, 'all'],
  AI_CURATION_RESULT: () => [...AUTH_QUERY_KEY.AUTH, 'result'],
};
