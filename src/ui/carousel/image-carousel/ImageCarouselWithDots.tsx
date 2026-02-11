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
import type { ImageCarouselProps } from './ImageCarousel';

export default function ImageCarouselWithDots({
  images,
  initialIndex,
  className,
  ...props
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex ?? 0);

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

  return (
    <div className={cn('relative aspect-[3/4] w-full overflow-hidden', className)} {...props}>
      <Carousel setApi={setApi} opts={{ startIndex: initialIndex }}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={`${img.src}-${idx}`}>
              <div className='relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden'>
                <Image
                  src={img.src}
                  alt={img.alt ?? `image-${img.src}`}
                  fill
                  className='object-cover'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
