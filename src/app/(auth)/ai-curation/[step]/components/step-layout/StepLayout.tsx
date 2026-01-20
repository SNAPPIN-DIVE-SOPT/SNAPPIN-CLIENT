'use client';

import ImageAnimation from '../image-animation/ImageAnimation';
import { padNumber } from '@/utils/padNumber';
import type { GetQuestionResponse } from '@/swagger-api/data-contracts';
import type { GetPhotoResponse } from '@/swagger-api/data-contracts';

type StepLayoutProps = {
  question: GetQuestionResponse;
  photos: GetPhotoResponse[];
};

export default function StepLayout({ question, photos }: StepLayoutProps) {
  return (
    <div className='flex flex-col gap-[6.2rem]'>
      <div className='flex flex-col gap-[0.9rem] pt-[3.5rem]'>
        <h1 className='title-20-bd text-neon-black'>
          {question?.step ? padNumber(question.step) : ''}
        </h1>
        <p className='title-20-bd text-black-1'>{question?.contents}</p>
      </div>
      <ImageAnimation images={photos ?? []} />
    </div>
  );
}
