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
import { TagChip } from '@/ui/chip';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';

type CarouselCurationProps = {
  images: { src: string; alt?: string }[];
  tags: TagCode[];
  name: string;
  className?: string;
};

export default function CarouselCuration({ images, tags, name, className }: CarouselCurationProps) {
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
    <div className={cn('relative h-[36rem] w-[36rem] overflow-hidden rounded-[0.6rem]', className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div className='relative h-[36rem] w-[36rem]'>
                <Image
                  src={img.src}
                  alt={img.alt ?? `image-${img.src}`}
                  fill
                  sizes='36rem'
                  className='object-cover select-none'
                  priority={idx === 0}
                  draggable={false}
                />
                <div
                  className='pointer-events-none absolute inset-0 h-full w-full'
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 46.63%, #000 100%)',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 하단 컨텐츠 */}
      <div className='absolute bottom-[1.8rem] z-10 flex w-full flex-col items-center gap-[0.4rem] px-[1.2rem]'>
        <div className='flex w-full items-center justify-start gap-[0.4rem]'>
          {tags.map((tag, idx) => (
            <TagChip key={idx} label={tag} variant='transparent' />
          ))}
        </div>
        <div className='text-black-1 flex w-full items-baseline gap-[0.5rem]'>
          <span className='title-20-bd min-w-0 truncate text-start'>{name}</span>
          <span className='caption-14-md shrink-0 text-start whitespace-nowrap'>작가</span>
        </div>
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
