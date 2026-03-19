'use client';

import Lottie from 'lottie-react';
import curationCoverAnimation from '@snappin/design-system/assets/lotties/curationCover.json';
import ImageSlide from '@/app/(auth)/_components/image-slide/ImageSlide';

export default function LottieAnimation() {
  return (
    <div className='relative flex h-[38.7rem] w-full items-center'>
      <Lottie animationData={curationCoverAnimation} className='absolute top-0 left-0 z-50' />
      <ImageSlide />
    </div>
  );
}
