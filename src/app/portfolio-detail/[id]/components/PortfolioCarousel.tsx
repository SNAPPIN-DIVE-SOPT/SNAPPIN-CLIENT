'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/ui/carousel/base/Carousel';
import { IconEllipse } from '@/assets';

type PortfolioCarouselProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export default function PortfolioCarousel({ images, className }: PortfolioCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className={cn('relative w-full aspect-square overflow-hidden', className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={`image-${img.src}-${idx}`}>
              <div className={cn('relative w-full aspect-square overflow-hidden', className)}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover select-none'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 하단 컨텐츠 */}
      <div className='absolute bottom-[1.8rem] z-10 flex w-full flex-col items-center gap-[0.4rem] px-[1.2rem]'>
        <div className='flex w-full items-center justify-center gap-[0.6rem]'>
          {images.map((_, i) => {
            const active = i === selectedIndex;
            return (
              <IconEllipse
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn('cursor-pointer', active ? 'text-black-1' : 'text-black-6')}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}