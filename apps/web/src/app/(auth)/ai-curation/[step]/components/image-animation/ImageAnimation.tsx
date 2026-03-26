'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, startTransition } from 'react';
import { cn } from '@snappin/design-system/lib/cn';
import type { GetPhotoResponse } from '@/swagger-api';
import { useToast } from '@/ui';
import { useGetAiCurationAll } from '../../api';
import { type STEP } from '../../constants/steps';
import { useAiCuration } from '../../../hooks/useAiCuration';

type ImageAnimationProps = {
  step: STEP;
};
export default function ImageAnimation({ step }: ImageAnimationProps) {
  const { data } = useGetAiCurationAll();
  //TODO: API 명세 확정되면 question은 목업으로 변경
  const question = data?.[step - 1];
  const photos = question?.photos;
  const { error } = useToast();
  const sorted = useMemo(
    () => photos?.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) || [],
    [photos],
  );

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
  };

  const handleImageLoad = (id: number) => {
    setLoadingImages((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className='mt-[3.6rem] flex w-full justify-center'>
      <div className='grid w-full grid-cols-2 gap-[0.4rem]'>
        {sorted.map((img) => {
          const imageId = img.id ?? 0;
          const isLoading = loadingImages.has(imageId);

          return (
            <button
              key={img.id}
              type='button'
              className={cn(
                'relative aspect-[3/4] w-full overflow-hidden rounded-[0.4rem] border-[3px] border-transparent',
                selectedByStep[currentStep] === img.id && 'border-neon-black z-10',
                selectedByStep[currentStep] &&
                  selectedByStep[currentStep] !== img.id &&
                  'opacity-80 brightness-[0.6]',
              )}
              onClick={() => handleSelect(img.id ?? 0, isLoading)}
            >
              {isLoading && <div className='bg-black-8 absolute inset-0 animate-pulse' />}
              <Image
                priority
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
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
