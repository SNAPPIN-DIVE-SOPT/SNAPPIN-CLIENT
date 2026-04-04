import { Author, InfiniteBanner, SectionHeader } from '../components';
import { useGetRecommendation } from '../api';
import { GetRecommendationPhotographerInfoResponse } from '@/swagger-api';

const RecommendationSnapPlace = () => {
  const { data: places, isPending } = useGetRecommendation();

  return (
    <section className='scrollbar-hide mr-[-2rem] flex flex-col gap-[1.6rem]'>
      <SectionHeader
        title='트렌디한 스냅 명소'
        description='유저들이 많이 찾는 장소를 소개할게요'
      />
      {isPending ? (
        <RecommendationSnapPlaceSkeleton />
      ) : (
        <InfiniteBanner items={places?.places ?? []} durationSec={20} />
      )}
    </section>
  );
};

const RecommendationSnapPlaceSkeleton = () => {
  return (
    <div className='flex w-full gap-[0.4rem]'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='relative shrink-0'>
          <div className='bg-black-3 h-[11.8rem] w-[11.8rem] rounded-[0.6rem]' />
          <div className='bg-black-4 absolute bottom-[1.1rem] left-[1.2rem] h-[1.7rem] w-[6.1rem]' />
        </div>
      ))}
    </div>
  );
};

const RecommendationAuthor = () => {
  const { data } = useGetRecommendation();

  return (
    <section className='scrollbar-hide flex flex-col gap-[0.8rem]'>
      <SectionHeader title='이런 작가는 어때요?' />
      <div className='scrollbar-hide flex gap-[0.8rem] overflow-x-auto'>
        {data?.photographers?.map((photographer: GetRecommendationPhotographerInfoResponse) => (
          <Author
            key={photographer.id}
            id={photographer.id ?? 0}
            name={photographer.name ?? ''}
            profileImageUrl={photographer.profileImageUrl ?? ''}
            isNew={photographer.isNew ?? false}
            bio={photographer.bio ?? ''}
            specialties={photographer.specialties ?? []}
          />
        ))}
      </div>
    </section>
  );
};

export { RecommendationSnapPlace, RecommendationAuthor };
