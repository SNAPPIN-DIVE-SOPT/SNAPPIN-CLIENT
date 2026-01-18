'use client';

import { Chip, CarouselCuration } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { useAuth } from '@/auth/hooks/useAuth';
import { SectionHeader } from '../components';
import { useGetPopularPortfoliosRecommendation, useGetPortfoliosRecommendation } from '../api';
import { GetPortfolioResponse } from '@/swagger-api/data-contracts';

export default function MoodCurationSection() {
  const { isLogIn } = useAuth();
  //TODO: 로그인 시 사용자 이름 조회 후 사용
  const userName="gkals"
  const { data } = useGetPortfoliosRecommendation(isLogIn ?? false);
  const { data: popularPortfolios } = useGetPopularPortfoliosRecommendation(!isLogIn);

  const portfolios = isLogIn ? data?.portfolios ?? [] : popularPortfolios?.portfolios ?? [];
  const moods = isLogIn ? data?.curatedMoods ?? [] : popularPortfolios?.popularMoods ?? [];


  const sectionHeaderTitle = isLogIn ? `${userName}님을 위한 큐레이션`:"요즘 많이 찾는 무드 큐레이션" ;
  return (
    <section className='scrollbar-hide flex flex-col gap-[1.6rem]'>
      <div className='flex flex-col gap-[0.5rem]'>
        <SectionHeader title={sectionHeaderTitle} />
        <div className='flex items-end gap-[0.6rem]'>
          <div className='flex gap-[0.5rem]'>
            {moods?.map((mood: string,index: number) => (
              <Chip
                key={index}
                label={mood as MoodCode}
                chipClassName='px-[0.6rem] py-[0.3rem] border-[0.3px] border-black-10 '
                labelClassName='caption-12-md'
              />
            ))}
          </div>
          <p className='caption-14-md text-black-8'>스냅사진을 추천할게요</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[1.6rem]'>
          {portfolios?.map((portfolio: GetPortfolioResponse) => (
          <CarouselCuration
            key={portfolio.id}
            images={portfolio.images?.map((image) => ({
              src: image.imageUrl ?? '',
              alt: portfolio.photographerName ?? '',
            })) ?? []}
            tags={portfolio.moods ?? []}
            name={portfolio.photographerName ?? ''}
          />
        ))}
      </div>
    </section>
  );
}
