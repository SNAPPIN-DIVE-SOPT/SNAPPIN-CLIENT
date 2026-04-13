import { TOTAL_STEP } from '@/app/(auth)/ai-curation/[step]/constants/steps';

export const getProgress = (step: number) => {
  const clampedStep = Math.min(Math.max(step, 0), TOTAL_STEP);
  return Math.round((clampedStep / TOTAL_STEP) * 100);
};
