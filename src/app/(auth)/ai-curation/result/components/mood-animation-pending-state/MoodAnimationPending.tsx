'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import CurationLoading from '@/assets/lotties/curationLoading.json';

const LOADING_EXIT = {
  opacity: 0,
  y: -48,
  filter: 'blur(2px)',
  transition: { duration: 0.5, ease: 'easeInOut' },
} as const;

export default function MoodAnimationPending() {
  return (
    <motion.div
      key='loading'
      className='flex h-dvh flex-col items-center justify-center'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
      exit={LOADING_EXIT}
    >
      <Lottie animationData={CurationLoading} className='h-[7rem] w-[7rem]' />
      <div className='mt-[3rem] flex flex-col items-center gap-[0.3rem]'>
        <span className='caption-12-md text-black-7'>두구두구</span>
        <h1 className='title-23-eb text-black-10'>무드 큐레이션 결과는...</h1>
      </div>
    </motion.div>
  );
}
