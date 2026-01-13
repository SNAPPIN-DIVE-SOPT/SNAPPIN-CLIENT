'use client';

import ImageAnimation from '../image-animation/ImageAnimation';
import { padNumber } from '@/utils/padNumber';

type StepLayoutProps = {
  question: { step: number; contents: string };
  photos: { id: number; imageUrl: string; order: number }[];
};

export default function StepLayout({ question, photos }: StepLayoutProps) {
  return (
    <div className='flex flex-col gap-[6.2rem]'>
      <div className='flex flex-col gap-[0.9rem] pt-[3.5rem]'>
        <h1 className='title-20-bd text-neon-black'>{padNumber(Number(question.step))}</h1>
        <p className='title-20-bd text-black-1'>{question.contents}</p>
      </div>
      <ImageAnimation images={photos} />
    </div>
  );
}
