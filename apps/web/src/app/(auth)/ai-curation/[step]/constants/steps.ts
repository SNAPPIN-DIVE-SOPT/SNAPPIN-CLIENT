export const STEP_QUESTIONS = [
  { step: 1, contents: '어떤 장소의 무드를 선호하시나요?' },
  { step: 2, contents: '얼마나 자연스러운 나를 담고 싶으신가요?"' },
  { step: 3, contents: '어떤 질감의 사진을 좋아하나요?' },
  { step: 4, contents: '어떤 색감의 사진을 선호하시나요?' },
  { step: 5, contents: '어떤 분위기의 사진을 선호하시나요?' },
] as const;

export const TOTAL_STEP_COUNT = STEP_QUESTIONS.length;
export type STEP = (typeof STEP_QUESTIONS)[number]['step'];
