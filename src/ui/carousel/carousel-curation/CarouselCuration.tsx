'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/ui/carousel/base/Carousel';
import { ImageCarousel } from '@/ui/carousel';
import { IconEllipse } from '@/assets';
import { TagChip } from '@/ui/chip';

type CarouselCurationProps = {
  images: { src: string; alt?: string }[];
  tags: string[];
  name: string;
  className?: string;
};

export default function CarouselCuration({ images, tags, name, className }: CarouselCurationProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    const onPointerDown = () => {
      setIsDragging(true);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    const onSettle = () => {
      setIsDragging(false);
    };

    onSelect();

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    api.on('pointerDown', onPointerDown);
    api.on('pointerUp', onPointerUp);
    api.on('settle', onSettle);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
      api.off('pointerDown', onPointerDown);
      api.off('pointerUp', onPointerUp);
      api.off('settle', onSettle);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className={cn('relative h-[36rem] w-[36rem] overflow-hidden rounded-[0.6rem]', className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={`image-${img.src}-${idx}`}>
              <ImageCarousel
                src={img.src}
                alt={img.alt ?? `image-${img.src}`}
                imageHeight='36rem'
                imageWidth='36rem'
                priority={idx === 0}
                draggable={false}
                className='rounded-[0.6rem]'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 하단 텍스트 / 인디케이터 */}
      <div
        className={cn(
          'absolute bottom-[1.8rem] z-10 flex w-full flex-col items-center gap-[0.4rem] px-[1.2rem]',
          'transition-opacity duration-200',
          isDragging && 'pointer-events-none opacity-30',
        )}
      >
        {/* 태그 */}
        <div className='flex w-full items-center justify-start gap-[0.4rem]'>
          {tags.map((tag, idx) => (
            <TagChip key={idx} label={tag} variant='transparent' />
          ))}
        </div>

        {/* 이름 */}
        <div className='text-black-1 flex w-full items-baseline gap-[0.5rem]'>
          <span className='title-20-bd min-w-0 truncate text-start'>{name}</span>
          <span className='caption-14-md shrink-0 text-start whitespace-nowrap'>작가</span>
        </div>

        {/* 인디케이터 */}
        <div className='flex w-full items-center justify-center gap-[0.6rem]'>
          {images.map((_, i) => {
            const active = i === selectedIndex;
            return (
              <IconEllipse
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  'cursor-pointer transition-colors',
                  active ? 'text-black-1' : 'text-black-6',
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
