import { Author, InfiniteBanner } from '../components';
import { recommendationMock } from '../mock/recommendation.mock';

const RecommendationSnapPlace = () => {
  const { places } = recommendationMock;
  return (
    <section className='scrollbar-hide flex flex-col gap-[1.2rem]'>
      <div className='flex flex-col gap-[0.2rem]'>
        <h2 className='font-18-bd text-black-10'>트렌디한 스냅 명소</h2>
        <h3 className='caption-14-md text-black-8'>유저들이 많이 찾는 장소를 소개할게요</h3>
      </div>
      <InfiniteBanner
        items={places.map((place) => ({
          //TODO: 검색 결과 페이지 연결
          href: `/`,
          imageUrl: place.imageUrl,
          id: place.id,
          name: place.name,
        }))}
        durationSec={20}
      />
    </section>
  );
};

const RecommendationAuthor = () => {
  const { photographers } = recommendationMock;
  return (
    <section className='scrollbar-hide flex flex-col gap-[0.8rem]'>
      <h2 className='font-18-bd text-black-10'>이런 작가는 어때요?</h2>
      <div className='scrollbar-hide flex gap-[0.8rem] overflow-scroll'>
        {photographers.map((photographer) => (
          <Author key={photographer.id} {...photographer} />
        ))}
      </div>
    </section>
  );
};

export { RecommendationSnapPlace, RecommendationAuthor };
