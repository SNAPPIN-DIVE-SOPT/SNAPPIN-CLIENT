import { TagChip } from '@/ui/chip';

import { loginCurationMock, notLoginCurationMock } from '../mock/portfoliosRecommendation.mock';
import CarouselCuration from '@/ui/carousel/carousel-curation/CarouselCuration';

export default function MoodCurationSection() {
  //TODO: 로그인 여부 확인
  const isLogin = true;
  const mock = isLogin ? loginCurationMock : notLoginCurationMock;

  return (
    <div className='scrollbar-hide flex flex-col gap-[1.6rem]'>
      <div className='flex flex-col gap-[0.5rem]'>
        <span className='font-18-bd text-black-10'>요즘 많이 찾는 무드 큐레이션</span>
        <div className='flex items-end gap-[0.6rem]'>
          <div className='flex gap-[0.5rem]'>
            {mock.moods.map((mood) => (
              <TagChip key={mood} variant='neon' label={mood} />
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
            tags={mock.moods}
            name={portfolio.photographerName}
          />
        ))}
      </div>
    </div>
  );
}
