'use client';

import { STEP2_MOCK } from '../mock/steps.mock';
import ImageAnimation from '../components/image-animation/ImageAnimation';
import StepHeader from '../components/step-header/StepHeader';

export default function Step2() {
  const { question, photos } = STEP2_MOCK;
  return (
    <div className='flex flex-col gap-[6.2rem]'>
      <StepHeader step={question.step} title={question.contents} />
      <ImageAnimation images={photos} />
    </div>
  );
}
