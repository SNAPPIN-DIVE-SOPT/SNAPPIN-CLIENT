export type AiCurationStep = number;

export const TOTAL_STEP_COUNT = 5;

export const isAiCurationStep = (step: number): boolean => {
  return step >= 1 && step <= TOTAL_STEP_COUNT;
};

export const getProgress = (step: AiCurationStep) => {
  const clampedStep = Math.min(Math.max(step, 0), TOTAL_STEP_COUNT);
  return Math.round((clampedStep / TOTAL_STEP_COUNT) * 100);
};


