'use client';

import { useNavVisibility } from './hooks/useNavVisibility';
import Header from './components/header/Header';
import Image from 'next/image';
import homeBackground from '@/../public/imgs/mainImg.png';
import { MENU } from './constants/menu';
import { RecommendationSnapPlace, RecommendationAuthor, MoodCurationSection } from './@section';
import Link from 'next/link';
import banner from '@/../public/imgs/banner.png';

export default function PageClient() {
  const { isVisible } = useNavVisibility();

  return (
    <div className='relative mb-[6rem] flex w-full flex-col'>
      <Header isVisible={isVisible} />
      <Image src={homeBackground} alt='home-background' />
      {/*  메뉴 영역 */}
      <div className='grid grid-cols-4 gap-x-[2.8rem] gap-y-[2rem] px-[3.5rem] py-[4rem]'>
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
      </div>
      <div className='flex flex-col gap-[5.2rem] px-[2rem]'>
        {/*  스냅 명소 추천 영역 */}
        <RecommendationSnapPlace />
        {/*  작가 추천 영역 */}
        <RecommendationAuthor />
        {/*  베너 영역 */}
        {/* TODO: 베너 클릭 시 노션 페이지 연결 */}
        <Link href='/'>
          <Image src={banner} alt='banner' />
        </Link>
        {/*  요즘 많이 찾는 무드 큐레이션  영역 */}
        <MoodCurationSection />
      </div>
    </div>
  );
}
