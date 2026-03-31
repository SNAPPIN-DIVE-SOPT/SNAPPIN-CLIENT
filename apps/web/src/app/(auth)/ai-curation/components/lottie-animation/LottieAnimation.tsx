'use client';

import Lottie from 'lottie-react';
import { ImageSlide } from '@snappin/design-system';
import { IMAGE_SLIDE_MOCK } from '@snappin/shared/mocks';
import { curationCoverAnimation } from '@snappin/design-system/lotties';

export default function LottieAnimation() {
  return (
    <div className='relative flex h-[38.7rem] w-full items-center'>
      <Lottie animationData={curationCoverAnimation} className='absolute top-0 left-0 z-50' />
      <ImageSlide data={IMAGE_SLIDE_MOCK.portfolios} />
    </div>
  );
}
