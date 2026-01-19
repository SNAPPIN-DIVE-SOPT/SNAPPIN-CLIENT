'use client';

import { useRef } from 'react';
import IconReviewStar from './IconReviewStar';

type StarRatingProps = {
  maxLength: number;
  value: number;
  onChange: (next: number) => void;
};

const STAR_WRAPPER_SIZE = 140;
const ZERO_THRESHOLD = 4;

export default function StarRating({ maxLength, value, onChange }: StarRatingProps) {
  const rating = value;
  const isPointerDownRef = useRef(false);
  const startXRef = useRef<number | null>(null);

  const starContainerRef = useRef<HTMLDivElement>(null);
  const starWidth = STAR_WRAPPER_SIZE / maxLength;

  const calculateRating = (e: React.PointerEvent<HTMLDivElement>): number => {
    if (!starContainerRef.current) return 0;

    const { left } = starContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;

    if (x < ZERO_THRESHOLD) return 0;

    const starIndex = Math.floor((x - ZERO_THRESHOLD) / starWidth);

    return Math.max(0, Math.min(maxLength, starIndex + 1));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    isPointerDownRef.current = true;
    startXRef.current = e.clientX;

    const nextRating = calculateRating(e);

    if (rating === 1 && nextRating === 1) {
      onChange(0);
      isPointerDownRef.current = false;
      startXRef.current = null;
      return;
    }

    onChange(nextRating);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || startXRef.current === null) return;

    const deltaX = Math.abs(e.clientX - startXRef.current);

    if (deltaX > 4) {
      const nextRating = calculateRating(e);
      onChange(nextRating);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    isPointerDownRef.current = false;
    startXRef.current = null;
  };

  return (
    <div
      ref={starContainerRef}
      className='select flex cursor-pointer touch-none flex-row items-center gap-[0.5rem]'
      style={{ width: `${STAR_WRAPPER_SIZE}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {[...Array(maxLength)].map((_, i) => {
        const level: 0 | 1 = rating > i ? 1 : 0;
        return <IconReviewStar key={i} level={level} />;
      })}
    </div>
  );
}
