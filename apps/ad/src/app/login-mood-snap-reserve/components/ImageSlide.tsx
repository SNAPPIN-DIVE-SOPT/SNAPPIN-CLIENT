'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ImageCarousel from '@/src/components/ImageCarousel'
import { IMAGE_SLIDE_MOCK } from './ImageSlide.mock';

const SIDE_OFFSET = 110;

const CARD_VARIANTS = {
  left: {
    x: `-${SIDE_OFFSET}%`,
    scale: 0.92,
    opacity: 0.8,
    zIndex: 0,
    filter: 'brightness(0.95)',
  },
  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
    zIndex: 10,
    filter: 'brightness(1)',
  },
  right: {
    x: `${SIDE_OFFSET}%`,
    scale: 0.92,
    opacity: 0.8,
    zIndex: 0,
    filter: 'brightness(0.95)',
  },
} as const;

export default function ImageSlide() {
  const data = IMAGE_SLIDE_MOCK.portfolios;
  const [activeIndex, setActiveIndex] = useState(0);

  const len = data.length;

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev - 1 + len) % len);
    }, 3000);
    return () => clearInterval(id);
  }, [len]);

  const leftIndex = (activeIndex - 1 + len) % len;
  const rightIndex = (activeIndex + 1) % len;

  const visible = useMemo(
    () =>
      [
        { pos: 'left', index: leftIndex },
        { pos: 'center', index: activeIndex },
        { pos: 'right', index: rightIndex },
      ].map((v) => ({ ...v, item: data[v.index] })),
    [activeIndex, leftIndex, rightIndex, data],
  );

  const center = data[activeIndex];

  return (
    <div className='relative w-full overflow-hidden'>
      <div className='relative mx-auto flex h-[35.7rem] items-center justify-center'>
        <AnimatePresence initial={false}>
          {visible.map(({ pos, index, item }) => (
            <motion.div
              key={index + item.imageUrl.toString() + item.photographerName}
              className='absolute top-1/2 -translate-y-1/2'
              variants={CARD_VARIANTS}
              animate={pos}
              initial={false}
              exit={{ opacity: 0, scale: 0.98 }}
              //애니메이션 속도 조절 : 키울 수록 느리게 이동
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            >
              <ImageCarousel
                src={item.imageUrl}
                alt={item.photographerName}
                imageWidth={pos === 'center' ? '24.2rem' : '20.2rem'}
                imageHeight={pos === 'center' ? '35.7rem' : '29.7rem'}
                className='rounded-[0.6rem]'
              />

              {/* 오버레이 */}
              <div className='pointer-events-none absolute bottom-[1.3rem] left-[1.2rem] z-40 flex flex-col gap-[0.8rem]'>
                <div className='flex gap-[0.6rem]'>
                  {center.moods.map((mood) => (
                    <TagChip key={mood} mood={mood} />
                  ))}
                </div>
                <p className='caption-12-md text-black-1'>{item.photographerName}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const TagChip = ({ mood }: { mood: string }) => {
  return (
    <div className='px-[0.6rem] py-[0.3rem] rounded-[0.3rem] shrink-0 bg-transparent border-[0.7px] border-neon-black'>
      <p className='caption-12-md text-neon-black'>{mood}</p>
    </div>
  )
}