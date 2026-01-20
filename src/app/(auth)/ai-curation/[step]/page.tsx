import { notFound } from 'next/navigation';
import StepShell from './StepShell';
import { isAiCurationStep } from './constants/steps';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step } = await params;
  const aiCurationStep = Number(step);

  if (!aiCurationStep || !isAiCurationStep(aiCurationStep)) {
    notFound();
  }

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[4.7rem] pb-[2.1rem]'>
      <StepShell step={aiCurationStep} />
    </div>
  );
}
