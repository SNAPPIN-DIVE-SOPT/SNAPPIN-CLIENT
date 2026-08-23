import { TOTAL_STEP } from '@/app/(auth)/ai-curation/[step]/constants/steps';

/**
 * 현재 단계를 전체 단계 대비 진행률(%)로 변환합니다.
 * @param step 현재 단계 번호
 * @returns 0~100 사이의 진행률 (정수로 반올림)
 * @example const progress = getProgress(2); // TOTAL_STEP이 4면 50
 */
export const getProgress = (step: number) => {
  const clampedStep = Math.min(Math.max(step, 0), TOTAL_STEP);
  return Math.round((clampedStep / TOTAL_STEP) * 100);
};
