'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useNavVisibility } from '@/hooks/useNavVisibility';
import { ClientHeader, FadeCarousel } from './components';
import { MENU } from './constants/menu';
import { RecommendationSnapPlace, RecommendationAuthor, MoodCurationSection } from './_section';

import homeBackground1 from '@/../public/imgs/image-main1.png';
import homeBackground2 from '@/../public/imgs/image-main2.png';
import homeBackground3 from '@/../public/imgs/image-main3.png';
import banner from '@/../public/imgs/banner.png';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

export default function PageClient() {
  const { isVisible } = useNavVisibility();
  const anchorRef = useRef<HTMLDivElement>(null);

  useScrollRestoreOnParent(
    anchorRef,
    `home-scroll`,
  );

  return (
    <div className='relative mb-[6rem] flex w-full flex-col'>
      <ClientHeader isVisible={isVisible} />
      <div ref={anchorRef}>
        <FadeCarousel
          images={[
            { src: homeBackground1.src, alt: 'home-background-1' },
            { src: homeBackground2.src, alt: 'home-background-2' },
            { src: homeBackground3.src, alt: 'home-background-3' },
          ]}
        />
        {/*  메뉴 영역 */}
        <nav className='grid grid-cols-4 gap-x-[2.8rem] gap-y-[2rem] px-[3.5rem] py-[4rem]'>
          {MENU.map((menu) => (
            <Link
              key={menu.label}
              href={menu.href}
              className='flex flex-col items-center gap-[0.6rem]'
            >
              {menu.icon}
              <span
                className='caption-12-md text-center'
                dangerouslySetInnerHTML={{ __html: menu.label }}
              />
            </Link>
          ))}
        </nav>

        <div className='flex flex-col gap-[5.2rem] px-[2rem]'>
          {/*  스냅 명소 추천 영역 */}
          <RecommendationSnapPlace />
          {/*  작가 추천 영역 */}
          <RecommendationAuthor />
          {/*  베너 영역 */}
          <Link href='https://pretty-shake-931.notion.site/Snappin-2eea9c9b4473802d9d2ddcb2a202bc18'>
            <Image src={banner} alt='banner' />
          </Link>
          {/*  요즘 많이 찾는 무드 큐레이션  영역 */}
          <MoodCurationSection />
        </div>
      </div>
    </div>
  );
}
