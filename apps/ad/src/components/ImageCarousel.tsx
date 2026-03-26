import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/utils/cn';

type RemUnit = `${number}rem`;

type ImageCarouselProps = React.ComponentProps<typeof Image> & {
  imageHeight: RemUnit;
  imageWidth: RemUnit;
};

export default function ImageCarousel({
  src,
  alt,
  className,
  imageHeight,
  imageWidth,
  ...props
}: ImageCarouselProps) {
  return (
    <div
      style={{ height: imageHeight, width: imageWidth }}
      className={cn('relative overflow-hidden', className)}
    >
      <Image src={src} alt={alt} fill className='object-cover select-none' {...props} />
      <div
        className='pointer-events-none absolute inset-0 h-full w-full'
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 46.63%, #000 100%)',
        }}
      />
    </div>
  );
}
