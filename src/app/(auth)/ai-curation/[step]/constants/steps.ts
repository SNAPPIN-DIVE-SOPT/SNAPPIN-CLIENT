import { Step1, Step2, Step3, Step4, Step5 } from '../step-content';

export const AI_CURATION_STEPS = {
  '1': {
    progress: 20,

    StepComponent: Step1,
  },
  '2': {
    progress: 40,
    StepComponent: Step2,
  },
  '3': {
    progress: 60,
    StepComponent: Step3,
  },
  '4': {
    progress: 80,
    StepComponent: Step4,
  },
  '5': {
    progress: 100,
    StepComponent: Step5,
  },
} as const;

type AiCurationStep = keyof typeof AI_CURATION_STEPS;

export const isAiCurationStep = (step: string): step is AiCurationStep => {
  return step in AI_CURATION_STEPS;
};
