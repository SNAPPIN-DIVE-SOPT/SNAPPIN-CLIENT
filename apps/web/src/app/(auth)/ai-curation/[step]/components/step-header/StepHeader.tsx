import { formatNumber } from '@snappin/shared/lib';
import { STEP_QUESTION } from '@/app/(auth)/ai-curation/[step]/constants/steps';
import { getProgress } from '@/app/(auth)/ai-curation/[step]/utils/steps';

type StepHeaderProps = {
  step: number;
};

export default function StepHeader({ step }: StepHeaderProps) {
  const progress = getProgress(step);

  return (
    <div className='flex flex-col gap-[1.2rem]'>
      <div className='bg-black-8 h-[0.6rem] w-full rounded-[0.6rem]'>
        <div
          className='bg-neon-black h-[0.6rem] rounded-[0.6rem]'
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className='flex flex-col gap-[0.4rem]'>
        <h1 className='title-20-sb text-neon-black'>{formatNumber(step)}</h1>
        <p className='title-20-bd text-black-1'>{STEP_QUESTION}</p>
      </div>
    </div>
  );
}
