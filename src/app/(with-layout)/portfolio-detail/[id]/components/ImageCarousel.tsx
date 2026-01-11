import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

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
    </div>
  );
}
