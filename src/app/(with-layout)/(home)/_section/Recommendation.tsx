import { Author, InfiniteBanner, SectionHeader } from '../components';
import { useGetRecommendation } from '../api/index';
  
const RecommendationSnapPlace = () => {
  const { data: places ,isPending} = useGetRecommendation();

  return (
    <section className='scrollbar-hide mr-[-2rem] flex flex-col gap-[1.6rem]'>
      <SectionHeader
        title='트렌디한 스냅 명소'
        description='유저들이 많이 찾는 장소를 소개할게요'
      />
      {
        isPending ? <RecommendationSnapPlaceSkeleton /> : (
          <InfiniteBanner
            items={places?.places ?? []}
            durationSec={20}
          />
        )
      }
    </section>
  );
};

const RecommendationSnapPlaceSkeleton = () => {
  return (
      <div className='w-full flex gap-[0.4rem]'>
        {Array.from({ length: 3}).map((_, index) => (
          <div key={index} className='relative shrink-0'>
            <div key={index} className='w-[11.8rem] h-[11.8rem] bg-black-3 rounded-[0.6rem]' />
            <div className='w-[6.1rem] h-[1.7rem] bg-black-4 absolute bottom-[1.1rem] left-[1.2rem]'/>  
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
        {data?.photographers?.map((photographer,index) => (
          <Author key={index} id={photographer.id??0} name={photographer.name ?? ''} profileImageUrl={photographer.profileImageUrl ?? ''} isNew={false} bio={photographer.bio ?? ''} specialties={photographer.specialties ?? []} />
        ))}
      </div>
    </section>
  );
};

export { RecommendationSnapPlace, RecommendationAuthor };

