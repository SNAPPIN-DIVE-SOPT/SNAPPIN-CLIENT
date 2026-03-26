import { notFound } from 'next/navigation';
import { type STEP } from './constants/steps';
import { isAiCurationStep } from './utils/steps';
import StepHeader from './components/step-header/StepHeader';
import ClientFooter from './components/client-footer/ClientFooter';
import ImageAnimation from './components/image-animation/ImageAnimation';

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
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[3rem] pb-[2rem]'>
      <StepHeader step={aiCurationStep as STEP} />
      <ImageAnimation step={aiCurationStep as STEP} />
      <ClientFooter step={aiCurationStep as STEP} />
    </div>
  );
}
