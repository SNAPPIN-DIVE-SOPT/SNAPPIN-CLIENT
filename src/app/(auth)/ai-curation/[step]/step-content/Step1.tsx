import { STEP1_MOCK } from '../mock/steps.mock';
import StepHeader from '../components/step-header/StepHeader';
import ImageAnimation from '../components/image-animation/ImageAnimation';

export default function Step1() {
  const { question, photos } = STEP1_MOCK;
  return (
    <div className='flex flex-col gap-[6.2rem]'>
      <StepHeader step={question.step} title={question.contents} />
      <ImageAnimation images={photos} />
    </div>
  );
}
