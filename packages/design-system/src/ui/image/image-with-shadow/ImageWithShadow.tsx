import React from 'react';
import Image from 'next/image';
import { cn } from '@snappin/design-system/lib/cn';

type RemUnit = `${number}rem`;

type ImageWithShadowProps = React.ComponentProps<typeof Image> & {
  imageHeight: RemUnit;
  imageWidth: RemUnit;
};

export default function ImageWithShadow({
  src,
  alt,
  className,
  imageHeight,
  imageWidth,
  ...props
}: ImageWithShadowProps) {
  return (
    <div
      style={{ height: imageHeight, width: imageWidth }}
      className={cn('relative overflow-hidden', className)}
    >
      <Image {...props} src={src} alt={alt} fill className='object-cover select-none' />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 h-full w-full'
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 46.63%, #000 100%)',
        }}
      />
    </div>
  );
}

