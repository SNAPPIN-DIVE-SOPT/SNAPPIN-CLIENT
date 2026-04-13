import { notFound } from 'next/navigation';
import StepHeader from '@/app/(auth)/ai-curation/[step]/components/step-header/StepHeader';
import ClientFooter from '@/app/(auth)/ai-curation/[step]/components/client-footer/ClientFooter';
import ImageAnimation from '@/app/(auth)/ai-curation/[step]/components/image-animation/ImageAnimation';

type Props = {
  params: Promise<{ step: string }>;
};

export default async function Page({ params }: Props) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!stepNumber) {
    notFound();
  }

  return (
    <div className='bg-black-10 flex h-dvh flex-col px-[2rem] pt-[3rem] pb-[2rem]'>
      <StepHeader step={stepNumber} />
      <ImageAnimation step={stepNumber} />
      <ClientFooter step={stepNumber} />
    </div>
  );
}
