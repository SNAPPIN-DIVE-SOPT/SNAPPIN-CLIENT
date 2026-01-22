'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import MoodChip from '../mood-chip/MoodChip';
import { BottomCTAButton } from '@/ui';
import {
  INTRO_TEXT,
  COMPLETE_TEXT,
  CTA,
  CHIPS_CONTAINER,
  CHIP_VARIANTS,
  CHIP_POSES,
  Phase,
} from './phaseAnimation';
import { MoodCode } from '@/types/moodCode';
import type { CreateMoodCurationResponse } from '@/swagger-api/data-contracts';

type MoodAnimationResultProps = { data: CreateMoodCurationResponse };

export default function MoodAnimationResult({ data }: MoodAnimationResultProps) {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('intro');

  const handleGoToSnap = () => {
    router.push('/explore');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center pt-[9rem]'>
      <div className='relative min-h-[10rem] w-full'>
        {/*  텍스트 애니메이션 */}
        <AnimatePresence
          mode='wait'
          onExitComplete={() => {
            if (phase === 'switching') setPhase('done');
          }}
        >
          {(phase === 'intro' || phase === 'chips') && (
            <motion.div
              key='intro-text'
              variants={INTRO_TEXT}
              initial='initial'
              animate='animate'
              exit='exit'
              className='absolute inset-0 flex flex-col items-center gap-[0.3rem]'
              onAnimationComplete={() => {
                if (phase === 'intro') {
                  setTimeout(() => {
                    setPhase('chips');
                  }, 700);
                }
              }}
            >
              <span className='caption-12-md text-black-7'>두구두구</span>
              <h1 className='title-23-eb text-black-10'>무드 큐레이션 결과는...</h1>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key='complete-text'
              variants={COMPLETE_TEXT}
              initial='initial'
              animate='animate'
              className='title-23-eb absolute inset-0 flex flex-col items-center gap-[0.5rem]'
            >
              <p>{data.userName}님은</p>

              <div className='flex items-center gap-[0.5rem]'>
                <div className='flex gap-[0.5rem]'>
                  {data.moods?.map((mood) => (
                    <div
                      key={mood.id}
                      className='caption-14-md text-black-10 border-black-10 rounded-[0.3rem] border px-[0.6rem] py-[0.4rem]'
                    >
                      {mood.name}
                    </div>
                  ))}
                </div>
                <p className='text-black-10'>무드를</p>
              </div>

              <p className='text-black-10'>선호하시네요!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 칩 애니메이션  */}
      {phase !== 'intro' && (
        <motion.div
          key='chips'
          variants={CHIPS_CONTAINER}
          initial='hidden'
          animate='show'
          className='mt-[4rem] flex flex-col items-center gap-[0.9rem]'
          onAnimationComplete={() => {
            if (phase === 'chips') {
              setTimeout(() => {
                setPhase('switching');
              }, 700);
            }
          }}
        >
          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[0]}>
            <MoodChip mood={data.moods?.[0]?.name as MoodCode} />
          </motion.div>

          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[1]}>
            <MoodChip mood={data.moods?.[1]?.name as MoodCode} />
          </motion.div>

          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[2]}>
            <MoodChip mood={data.moods?.[2]?.name as MoodCode} />
          </motion.div>
        </motion.div>
      )}

      {/* CTA 애니메이션 */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            key='cta'
            variants={CTA}
            initial='initial'
            animate='animate'
            className='fixed-center bottom-0 left-0 w-full transform-gpu will-change-transform'
          >
            <BottomCTAButton className='flex w-full flex-col gap-[0.7rem] px-[2rem] pb-[2rem]'>
              <BottomCTAButton.Single color='black' size='large' onClick={handleGoToSnap}>
                내 무드에 딱 맞는 스냅 보러가기
              </BottomCTAButton.Single>

              <BottomCTAButton.Single color='white' size='large' onClick={handleGoHome}>
                홈으로 가기
              </BottomCTAButton.Single>
            </BottomCTAButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
