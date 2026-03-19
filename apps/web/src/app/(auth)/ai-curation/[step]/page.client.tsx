'use client';

import { useEffect } from 'react';
import StepLayout from './components/step-layout/StepLayout';
import ClientFooter from './components/client-footer/ClientFooter';
import { useGetAiCurationAll } from './api';
import { AiCurationStep } from './constants/steps';
import { useAiCuration } from '../hooks/useAiCuration';

type PageClientProps = {
  step: number;
};

export default function PageClient({ step }: PageClientProps) {
  const { setCurrentStep } = useAiCuration();

  useEffect(() => {
    setCurrentStep(step as AiCurationStep);
  }, [step, setCurrentStep]);

  const { data } = useGetAiCurationAll();
  const question = data?.[step - 1];
  const photos = question?.photos;

  return (
    <div className='flex h-full flex-col'>
      <StepLayout
        question={question?.question ?? { id: 0, contents: '', step: 0 }}
        photos={
          photos?.map((photo) => ({
            id: photo.id,
            imageUrl: photo.imageUrl,
            order: photo.order,
          })) ?? []
        }
      />
      <ClientFooter step={step} />
    </div>
  );
}
