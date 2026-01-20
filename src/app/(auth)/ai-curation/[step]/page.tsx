import { notFound } from 'next/navigation';
import { getProgress, isAiCurationStep } from './constants/steps';
import ProgressBar from './components/progress-bar/ProgressBar';
import PageClient from './page.client';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step } = await params;
  const aiCurationStep = Number(step);

  if (!aiCurationStep || !isAiCurationStep(aiCurationStep)) {
    notFound();
  }

  const progress = getProgress(aiCurationStep);

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[4.7rem] pb-[2.1rem]'>
      <ProgressBar progress={progress} />
      <PageClient step={aiCurationStep} />
    </div>
  );
}
