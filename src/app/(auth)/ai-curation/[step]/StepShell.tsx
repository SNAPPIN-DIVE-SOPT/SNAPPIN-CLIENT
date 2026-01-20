'use client';

import { useEffect } from 'react';
import type { AiCurationStep } from './constants/steps';
import { useAiCuration } from '../hooks/useAiCuration';
import StepLayout from './components/step-layout/StepLayout';
import ClientFooter from './components/client-footer/ClientFooter';
import { useGetAiCuration } from '../api';
import ProgressBar from './components/progress-bar/ProgressBar';
import { getProgress } from './constants/steps';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useRouter } from 'next/navigation';

type StepShellProps = {
  step: AiCurationStep;
};

export default function StepShell({ step }: StepShellProps) {

  const { setCurrentStep } = useAiCuration();

  const { data, isPending, isError } = useGetAiCuration(step);

  const { error } = useToast();
  const router = useRouter();

  useEffect(() => {
    setCurrentStep(step);
  }, [step, setCurrentStep]);


  useEffect(() => {
    if (!isPending && (isError || !data)) {
      error('잠시 후 다시 시도해주세요.');
      router.replace('/ai-curation'); 
    }
  }, [isPending, isError, data, error, router]);


  if (isPending || isError || !data) {
    return <ProgressBar progress={getProgress(step)} />;
  }


  return (
    <>
      <ProgressBar progress={getProgress(step)} />
      <StepLayout key={step} question={data.question ?? {}} photos={data.photos ?? []}  />
      <ClientFooter step={step} />
    </>
  );
}