import { notFound } from 'next/navigation';
import { getOnBoardingStep } from '@/app/(auth)/on-boarding/[step]/constants/onBoardingSteps';
import { ClientFooter, OnBoardingFields } from '@/app/(auth)/on-boarding/[step]/components';

type PageProps = {
  params: Promise<{
    step: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { step } = await params;
  const currentStep = Number(step);
  const stepMeta = getOnBoardingStep(currentStep);

  if (!stepMeta) {
    notFound();
  }

  return (
    <>
      <section className='mt-[3.7rem] flex h-full flex-1 flex-col gap-[4.5rem] px-[3.2rem]'>
        <header className='flex flex-col gap-[1rem]'>
          <h1 className='title-20-sb whitespace-pre-line'>{stepMeta.title}</h1>
          {stepMeta.description && (
            <p className='caption-14-md text-black-6'>{stepMeta.description}</p>
          )}
        </header>
        <OnBoardingFields fields={stepMeta.fields} />
      </section>
      <ClientFooter step={stepMeta.step} triggerFields={stepMeta.triggerFields} />
    </>
  );
}
