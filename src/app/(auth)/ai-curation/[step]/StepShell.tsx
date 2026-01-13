'use client';

import { useEffect } from 'react';
import type { AiCurationStep } from './constants/steps';
import { useAiCuration } from '../hooks/useAiCuration';

type StepShellProps = {
  step: AiCurationStep;
  children: React.ReactNode;
};
export default function StepShell({ step, children }: StepShellProps) {
  const { setCurrentStep } = useAiCuration();

  useEffect(() => {
    setCurrentStep(step);
  }, [step, setCurrentStep]);

  return <>{children}</>;
}
