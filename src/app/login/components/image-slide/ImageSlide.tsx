'use client';

import { LOGIN_MOCK } from './ImageSlide.mock';
import ImageCarousel from '@/ui/carousel/image-carousel/ImageCarousel';
import { useState } from 'react';
import TagChip from '@/ui/chip/tag-chip/TagChip';
import { MoodCode } from '@/types/moodCode';

export default function ImageSlide() {
  const data = LOGIN_MOCK.portfolios;
  const [activeIndex, setActiveIndex] = useState(0);

  const center = data[activeIndex];
  const left = data[(activeIndex - 1 + data.length) % data.length];
  const right = data[(activeIndex + 1) % data.length];

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % data.length);
  const SIDE_OFFSET = 68;

  return (
    <div className='relative w-full overflow-hidden'>
      <div className='relative flex items-center justify-center'>
        {/* LEFT */}
        <div
          className='absolute inset-y-0 left-0 flex items-center overflow-hidden opacity-80'
          style={{ transform: `translateX(-${SIDE_OFFSET}%)` }}
        >
          <ImageCarousel
            src={left.imageUrl}
            alt={left.photographerName}
            imageWidth='20.2rem'
            imageHeight='29.7rem'
            onClick={goPrev}
            className='cursor-pointer rounded-[0.6rem]'
          />
        </div>

        {/* CENTER */}
        <div className='relative z-10 overflow-hidden rounded-[0.6rem]'>
          <ImageCarousel
            src={center.imageUrl}
            alt={center.photographerName}
            imageWidth='24.2rem'
            imageHeight='35.7rem'
          />
          <div className='absolute bottom-[1.3rem] left-[1.2rem] z-40 flex flex-col gap-[0.8rem]'>
            <div className='flex gap-[0.6rem]'>
              {center.moods.map((mood) => (
                <TagChip key={mood} variant='transparent' label={mood as MoodCode} />
              ))}
            </div>
            <p className='caption-12-md text-black-1'>{center.photographerName}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className='absolute inset-y-0 right-0 flex items-center overflow-hidden opacity-80'
          style={{ transform: `translateX(${SIDE_OFFSET}%)` }}
        >
          <ImageCarousel
            src={right.imageUrl}
            alt={right.photographerName}
            imageWidth='20.2rem'
            imageHeight='29.7rem'
            onClick={goNext}
            className='cursor-pointer rounded-[0.6rem]'
          />
        </div>
      </div>
    </div>
  );
}
