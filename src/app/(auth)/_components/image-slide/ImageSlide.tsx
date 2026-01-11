'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageCarousel, TagChip } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { LOGIN_MOCK } from './ImageSlide.mock';

export default function ImageSlide() {
  const data = LOGIN_MOCK.portfolios;
  const [activeIndex, setActiveIndex] = useState(0);

  const center = data[activeIndex];
  const left = data[(activeIndex - 1 + data.length) % data.length];
  const right = data[(activeIndex + 1) % data.length];

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % data.length);

  const SIDE_OFFSET = 68;

  // ✅ interval deps 안정화 (goNext를 deps에 넣으면 매 렌더마다 interval 재생성될 수 있음)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(id);
  }, [data.length]);

  const centerKey = useMemo(() => `center-${activeIndex}`, [activeIndex]);

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
            className='rounded-[0.6rem]'
          />
        </div>

        {/* CENTER (crossfade + 살짝 이동) */}
        <div className='relative z-10 overflow-hidden rounded-[0.6rem]'>
          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={centerKey}
              initial={{ opacity: 0, x: 6, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -6, scale: 0.995 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
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
            </motion.div>
          </AnimatePresence>
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
            className='rounded-[0.6rem]'
          />
        </div>
      </div>
    </div>
  );
}
