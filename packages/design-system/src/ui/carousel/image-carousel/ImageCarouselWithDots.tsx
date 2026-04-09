'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ImageCarouselProps } from './ImageCarousel';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../base/Carousel';
import { cn } from '../../../lib/cn';
import { IconEllipse } from '../../../assets';

export default function ImageCarouselWithDots({
  images,
  initialIndex,
  className,
  ...props
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex ?? 0);
  const [imageMetaMap, setImageMetaMap] = useState<Record<string, { isLandscape: boolean }>>({});

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const target = e.target as HTMLImageElement;

    target
      .decode()
      .then(() => {
        const isLandscape = target.naturalWidth > target.naturalHeight;
        setImageMetaMap((prev) => ({ ...prev, [src]: { isLandscape } }));
      })
      .catch((err) => {
        console.error(`?대?吏(${src}) ?붿퐫???ㅽ뙣:`, err);
        setImageMetaMap((prev) => ({ ...prev, [src]: { isLandscape: false } }));
      });
  };

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
              <div
                className={cn(
                  'relative aspect-[3/4] w-full overflow-hidden',
                  imageMetaMap[img.src]?.isLandscape ? 'bg-black' : 'bg-black-3',
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt ?? `image-${img.src}`}
                  fill
                  className={cn(
                    imageMetaMap[img.src] ? 'opacity-100' : 'opacity-0',
                    imageMetaMap[img.src]?.isLandscape ? 'object-contain' : 'object-cover',
                  )}
                  onLoad={(e) => handleImageLoad(e, img.src)}
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
