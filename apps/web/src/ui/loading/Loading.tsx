'use client';

import Lottie from 'lottie-react';
import { loadingAnimation } from '@snappin/design-system/lotties';

export default function Loading() {
  return <Lottie animationData={loadingAnimation} className='h-[7rem] w-[7rem]' />;
}
