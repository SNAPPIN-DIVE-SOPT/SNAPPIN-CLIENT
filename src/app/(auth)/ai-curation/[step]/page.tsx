import { notFound } from 'next/navigation';

import { AI_CURATION_STEPS, isAiCurationStep } from './constants/steps';
import ProgressBar from './components/progress-bar/ProgressBar';
import ClientFooter from './components/client-footer/ClientFooter';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step: AICurationStep } = await params;
  const step = AICurationStep;

  if (!step || !isAiCurationStep(step)) notFound();

  const stepInfo = AI_CURATION_STEPS[step];
  const { StepComponent, progress } = stepInfo;

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[4.7rem] pb-[2.1rem]'>
      <ProgressBar progress={progress} />
      <StepComponent />
      <ClientFooter step={Number(step)} />
    </div>
  );
}
