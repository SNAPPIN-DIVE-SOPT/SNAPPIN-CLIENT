'use client';

import { Chip, CarouselCuration } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { useAuth } from '@/auth/hooks/useAuth';
import { loginCurationMock, notLoginCurationMock } from '../mock/curation.mock';
import { SectionHeader } from '../components';

export default function MoodCurationSection() {
  const { isLogIn } = useAuth();
  const mock = isLogIn ? loginCurationMock : notLoginCurationMock;
  const moods = isLogIn ? loginCurationMock.curatedMoods : notLoginCurationMock.popularMoods;
  return (
    <section className='scrollbar-hide flex flex-col gap-[1.6rem]'>
      <div className='flex flex-col gap-[0.5rem]'>
        <SectionHeader title='요즘 많이 찾는 무드 큐레이션' />
        <div className='flex items-end gap-[0.6rem]'>
          <div className='flex gap-[0.5rem]'>
            {moods.map((mood: MoodCode) => (
              <Chip
                key={mood}
                label={mood}
                chipClassName='px-[0.6rem] py-[0.3rem] border-[0.3px] border-black-10 '
                labelClassName='caption-12-md'
              />
            ))}
          </div>
          <p className='caption-14-md text-black-8'>스냅사진을 추천할게요</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[1.6rem]'>
        {mock.portfolios.map((portfolio) => (
          <CarouselCuration
            key={portfolio.id}
            images={portfolio.images.map((image) => ({
              src: image.imageUrl,
              alt: portfolio.photographerName,
            }))}
            tags={portfolio.moods}
            name={portfolio.photographerName}
          />
        ))}
      </div>
    </section>
  );
}
