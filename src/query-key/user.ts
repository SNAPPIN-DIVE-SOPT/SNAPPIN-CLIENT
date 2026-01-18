export const USER_QUERY_KEY = {
  AI_CURATION: ['ai-curation'],
  AI_CURATION_QUESTIONS:() => [...USER_QUERY_KEY.AI_CURATION, 'questions'],
  AI_CURATION_QUESTION_STEP: (step: number) => [...USER_QUERY_KEY.AI_CURATION_QUESTIONS(), step],
  AI_CURATION_RESULT: () => [...USER_QUERY_KEY.AI_CURATION, 'result'],
} as const;
