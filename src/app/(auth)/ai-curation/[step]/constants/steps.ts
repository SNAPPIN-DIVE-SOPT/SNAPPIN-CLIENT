import { STEP1_MOCK, STEP2_MOCK, STEP3_MOCK, STEP4_MOCK, STEP5_MOCK } from '../mock/steps.mock';

export const AI_CURATION_STEPS = [
  STEP1_MOCK,
  STEP2_MOCK,
  STEP3_MOCK,
  STEP4_MOCK,
  STEP5_MOCK,
] as const;

export type AiCurationStep = (typeof AI_CURATION_STEPS)[number]['question']['step'];

export const TOTAL_STEP_COUNT = AI_CURATION_STEPS.length;

export const isAiCurationStep = (step: number): boolean => {
  return step >= 1 && step <= TOTAL_STEP_COUNT;
};

export const getStepInfo = (step: AiCurationStep) => {
  return {
    progress: Math.round((step / TOTAL_STEP_COUNT) * 100),
    question: AI_CURATION_STEPS[step - 1].question,
    photos: AI_CURATION_STEPS[step - 1].photos,
  };
};
