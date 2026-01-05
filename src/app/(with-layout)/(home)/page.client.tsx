'use client';

import { useNavVisibility } from '@/hooks/useNavVisibility';
import Header from './components/header/Header';
import Image from 'next/image';
import homeBackground from '@/../public/imgs/mainImg.png';
import { MENU } from './constants/menu';
import { AuthorSection, MoodCurationSection, SnapPlaceSection } from './@section';

export default function PageClient() {
  const { isVisible } = useNavVisibility();

  return (
    <div className='relative mt-[-5rem] flex w-full flex-col'>
      <Header isVisible={isVisible} />
      <Image src={homeBackground} alt='home-background' />
      {/*  메뉴 영역 */}
      <div className='grid grid-cols-4 gap-x-[3rem] gap-y-[1.2rem] px-[2rem]'>
        {MENU.map((menu) => (
          <div key={menu.label} className='flex flex-col items-center gap-[0.6rem]'>
            {menu.icon}
            <span
              className='caption-12-md text-center'
              dangerouslySetInnerHTML={{ __html: menu.label }}
            />
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-[5.2rem] px-[2rem]'>
        {/*  트렌디한 스냅 명소 영역 */}
        <SnapPlaceSection />
        {/*  이런 작가는 어때요 영역 */}
        <AuthorSection />
        {/*  베너 영역 */}
        {/*  요즘 많이 찾는 무드 큐레이션  영역 */}
        <MoodCurationSection />
        <div className='h-[7.2rem]'></div>
      </div>
    </div>
  );
}
