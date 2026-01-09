'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import Logo from '@/assets/components/Logo';
import { ButtonSearchBar } from '@/ui';

type FadeCarouselProps = {
  images: { src: string; alt?: string }[];
};

const INTERVAL_MS = 3000;
const FADE_DURATION_MS = 600;

export default function FadeCarousel({ images }: FadeCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, INTERVAL_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [total]);

  if (total === 0) return null;

  return (
    <div className='relative overflow-hidden'>
      <div className='relative h-[44rem] w-full'>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              'absolute inset-0 transition-opacity ease-in-out',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            <Image
              src={img.src}
              alt={img.alt ?? `메인 배너 이미지-${img.src}`}
              fill
              className='object-cover'
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* overlay */}
      <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-between bg-black/40 px-[2rem] py-[2.2rem]'>
        <Logo className='text-neon-white' width={318} height={67} />
        <div className='flex w-full flex-col items-center gap-[3.2rem]'>
          <div className='flex flex-col items-center gap-[0.4rem]'>
            <h1 className='title-20-bd text-black-1'>가장 나다운 스냅 촬영</h1>
            <p className='caption-14-rg text-black-1 text-center'>
              나만의 무드 태그로 내 취향에 딱 맞는
              <br />
              스냅 촬영을 예약해보세요
            </p>
          </div>
          {/* TODO: 검색 페이지 연결 */}
          <Link href='/' className='w-full'>
            <ButtonSearchBar
              headline='어떤 스냅 작가를 찾고 있나요?'
              supportingText='스냅 종류, 촬영 장소, 촬영 날짜로 정교한 검색'
              className='border-black-1 w-full rounded-[6rem] border bg-white/15 backdrop-blur-[7.5px]'
              iconClassName='text-black-1'
              headlineClassName='text-black-1'
              supportingTextClassName='text-black-1'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
