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
              src: "https://snappin-dev-images.s3.ap-northeast-2.amazonaws.com/portfolio/photo_graduation_1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260118T120148Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIASC23XLO7TIMEOLX4%2F20260118%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=eaa42c79cb323c33092557d5fc0d0e00e7e7c0621ce8c0cc88aff8165a853198",
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
