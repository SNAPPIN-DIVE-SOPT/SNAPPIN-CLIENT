import { notFound } from 'next/navigation';
import StepShell from './StepShell';
import { getStepInfo, isAiCurationStep } from './constants/steps';
import ProgressBar from './components/progress-bar/ProgressBar';
import ClientFooter from './components/client-footer/ClientFooter';
import StepLayout from './components/step-layout/StepLayout';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step } = await params;
  const aiCurationStep = Number(step);

  if (!aiCurationStep || !isAiCurationStep(aiCurationStep)) {
    notFound();
  }

  const { question, photos, progress } = getStepInfo(aiCurationStep);

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[4.7rem] pb-[2.1rem]'>
      <ProgressBar progress={progress} />
      <StepShell step={aiCurationStep}>
        <StepLayout question={question} photos={photos} />
        <ClientFooter step={aiCurationStep} />
      </StepShell>
    </div>
  );
}
