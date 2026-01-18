export const USER_QUERY_KEY = {
  AI_CURATION_QUESTIONS: ['ai-curation-questions'],
  AI_CURATION_QUESTION_STEP: (step: number) => [...USER_QUERY_KEY.AI_CURATION_QUESTIONS, step],
} as const;
