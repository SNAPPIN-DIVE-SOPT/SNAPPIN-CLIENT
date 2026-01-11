'use client';

import Link from 'next/link';
import { ImageCarousel } from '@/ui';

type Item = {
  id: number;
  href: string;
  imageUrl: string;
  name: string;
};

type InfiniteBannerProps = {
  items: Item[];
  durationSec?: number;
};

export default function InfiniteBanner({ items, durationSec = 18 }: InfiniteBannerProps) {
  const loopItems = [...items, ...items];

  return (
    <div
      className='relative w-full overflow-hidden'
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ ['--duration' as any]: `${durationSec}s` }}
    >
      <div className='infinite-track flex w-max gap-[0.4rem]'>
        {loopItems.map((item, idx) => (
          <Link key={`${item.id}-${idx}`} href={item.href} className='relative shrink-0'>
            <ImageCarousel
              src={item.imageUrl}
              alt={`${item.name} 이미지`}
              imageWidth={`11.8rem`}
              imageHeight={`11.8rem`}
              className='rounded-[0.6rem] object-cover'
            />
            <span className='caption-12-md text-black-1 absolute bottom-[1.1rem] left-[1.2rem]'>
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .infinite-track {
          animation: marquee var(--duration) linear infinite;
          will-change: transform;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .infinite-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
