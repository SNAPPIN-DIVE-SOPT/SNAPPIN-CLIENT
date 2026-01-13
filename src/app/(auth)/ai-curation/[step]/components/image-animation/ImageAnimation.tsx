'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAiCuration } from '../../../hooks/useAiCuration';

type ImageAnimationProps = {
  images: { id: number; imageUrl: string; order: number }[];
};

type Pose = {
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  rotate: number;
};

type PoseSet = { default: Pose; animation: Pose };

const POSE_KEYS = ['leftTop', 'rightTop', 'leftBottom', 'rightBottom'] as const;
type PoseKeys = (typeof POSE_KEYS)[number];

const POSES_ANIMATION: Record<PoseKeys, PoseSet> = {
  leftTop: {
    default: { left: '6vw', top: '4vw', rotate: -12 },
    animation: { left: '6vw', top: '4vw', rotate: -10 },
  },
  rightTop: {
    default: { right: '7vw', top: '8vw', rotate: 9.6 },
    animation: { right: '7vw', top: '8vw', rotate: 4.6 },
  },
  leftBottom: {
    default: { left: '6vw', top: '52vw', rotate: -6 },
    animation: { left: '6vw', top: '52vw', rotate: -2 },
  },
  rightBottom: {
    default: { right: '10vw', top: '54vw', rotate: 17 },
    animation: { right: '10vw', top: '54vw', rotate: 14 },
  },
};

export default function ImageAnimation({ images }: ImageAnimationProps) {
  const sorted = useMemo(() => images.slice().sort((a, b) => a.order - b.order), [images]);

  const [isAnimating, setIsAnimating] = useState(false);
  const { selectedByStep, currentStep, toggleImageId } = useAiCuration();

  const handleSelect = (id: number) => {
    toggleImageId(id);
    setIsAnimating((prev) => !prev);
  };

  return (
    <div className='relative flex w-full justify-center'>
      <div className='relative h-[41.5rem] w-full'>
        {sorted.map((img, idx) => {
          const poseKey = POSE_KEYS[idx % POSE_KEYS.length];
          const pose = POSES_ANIMATION[poseKey];

          return (
            <motion.button
              key={img.id}
              type='button'
              className={cn(
                'absolute h-[19.3rem] w-[14.5rem] overflow-hidden rounded-[0.6rem]',
                selectedByStep[currentStep] === img.id && 'border-neon-black z-10 border-[3px]',
                selectedByStep[currentStep] &&
                  selectedByStep[currentStep] !== img.id &&
                  'opacity-80 brightness-[0.6]',
              )}
              onClick={() => handleSelect(img.id)}
              initial={false}
              animate={isAnimating ? pose.animation : pose.default}
            >
              <Image
                src={img.imageUrl}
                alt='큐레이션 선택 이미지'
                fill
                className='object-cover'
                draggable={false}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
