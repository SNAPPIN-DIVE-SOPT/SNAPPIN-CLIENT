'use client';

import Lottie from 'lottie-react';
import ImageSlide from '@/app/(auth)/_components/image-slide/ImageSlide';
import curationCoverAnimation from '@/assets/lotties/curationCover.json';

export default function LottieAnimation() {
  return (
    <div className='relative h-[38.7rem] w-full flex items-center'>
      <Lottie
        animationData={curationCoverAnimation}
        className='absolute top-0 left-0 z-50'
      />
      <ImageSlide />
    </div>
  );
}
