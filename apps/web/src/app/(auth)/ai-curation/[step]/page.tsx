import { notFound } from 'next/navigation';
import { type STEP } from '@/app/(auth)/ai-curation/[step]/constants/steps';
import { isAiCurationStep } from '@/app/(auth)/ai-curation/[step]/utils/steps';
import StepHeader from '@/app/(auth)/ai-curation/[step]/components/step-header/StepHeader';
import ClientFooter from '@/app/(auth)/ai-curation/[step]/components/client-footer/ClientFooter';
import ImageAnimation from '@/app/(auth)/ai-curation/[step]/components/image-animation/ImageAnimation';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step } = await params;
  const aiCurationStep = Number(step) as STEP;

  if (!aiCurationStep || !isAiCurationStep(aiCurationStep)) {
    notFound();
  }

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[3rem] pb-[2rem]'>
      <StepHeader step={aiCurationStep} />
      <ImageAnimation step={aiCurationStep} />
      <ClientFooter step={aiCurationStep} />
    </div>
  );
}
