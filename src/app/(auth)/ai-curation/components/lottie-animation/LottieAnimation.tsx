'use client';

import Lottie from 'lottie-react';
import ImageSlide from '@/app/(auth)/_components/image-slide/ImageSlide';
import curationCoverAnimation from '@/assets/lotties/curationCover.json';

export default function LottieAnimation() {
  return (
    <div className='relative h-[40.7rem] w-full'>
      <Lottie
        animationData={curationCoverAnimation}
        className='absolute top-[-5rem] left-0 z-50 h-full w-full'
      />
      <ImageSlide />
    </div>
  );
}
