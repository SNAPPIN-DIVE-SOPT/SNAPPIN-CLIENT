'use client';

import Image from 'next/image';

type PhotoBoxProps = {
  imageSrc: string;
  imageAlt: string;
};

export default function PhotoBox({ imageSrc, imageAlt }: PhotoBoxProps) {
  return (
    <div className='bg-black-10 relative h-[48rem] w-full overflow-hidden'>
      <Image src={imageSrc} alt={imageAlt} fill sizes='100vw' className='object-contain' />
    </div>
  );
}
