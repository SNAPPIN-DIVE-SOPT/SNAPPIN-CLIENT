'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, startTransition } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAiCuration } from '../../../hooks/useAiCuration';
import type { GetPhotoResponse } from '@/swagger-api/data-contracts';
import { useToast } from '@/ui/toast/hooks/useToast';

type ImageAnimationProps = {
  images: GetPhotoResponse[];
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
  const { error } = useToast();
  const sorted = useMemo(
    () => images.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [images],
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const { selectedByStep, currentStep, toggleImageId } = useAiCuration();

  // 이미지가 변경될 때마다 모든 이미지를 로딩 중 상태로 설정
  useEffect(() => {
    const imageIds = sorted.map((img) => img.id ?? 0).filter((id) => id !== 0);
    startTransition(() => {
      setLoadingImages(new Set(imageIds));
    });
  }, [sorted]);

  const handleSelect = (id: number, isLoading: boolean) => {
    if (isLoading) {
      error('이미지 로딩 중입니다. 잠시 후 다시 시도해주세요.', undefined, 'top-[2rem]');
      return;
    }
    toggleImageId(id);
    setIsAnimating((prev) => !prev);
  };

  const handleImageLoad = (id: number) => {
    setLoadingImages((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className='relative flex w-full justify-center'>
      <div className='relative h-[41.5rem] w-full'>
        {sorted.map((img, idx) => {
          const poseKey = POSE_KEYS[idx % POSE_KEYS.length];
          const pose = POSES_ANIMATION[poseKey];
          const imageId = img.id ?? 0;
          const isLoading = loadingImages.has(imageId);

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
              onClick={() => handleSelect(img.id ?? 0, isLoading)}
              initial={false}
              animate={isAnimating ? pose.animation : pose.default}
            >
              {isLoading && <div className='bg-black-8 absolute inset-0 animate-pulse' />}
              <Image
                unoptimized
                src={img.imageUrl ?? ''}
                alt='큐레이션 선택 이미지'
                fill
                className={cn(
                  'object-cover transition-opacity duration-300',
                  isLoading && 'opacity-0',
                )}
                draggable={false}
                onLoadingComplete={() => handleImageLoad(imageId)}
                onError={() => handleImageLoad(imageId)}
                priority
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
