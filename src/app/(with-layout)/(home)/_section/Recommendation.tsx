import { Author, InfiniteBanner, SectionHeader } from '../components';
import { recommendationMock } from '../mock/recommendation.mock';

const RecommendationSnapPlace = () => {
  const { places } = recommendationMock;
  return (
    <section className='scrollbar-hide mr-[-2rem] flex flex-col gap-[1.2rem]'>
      <SectionHeader
        title='트렌디한 스냅 명소'
        description='유저들이 많이 찾는 장소를 소개할게요'
      />
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
      <SectionHeader title='이런 작가는 어때요?' />
      <div className='scrollbar-hide flex gap-[0.8rem] overflow-x-auto'>
        {photographers.map((photographer) => (
          <Author key={photographer.id} {...photographer} />
        ))}
      </div>
    </section>
  );
};

export { RecommendationSnapPlace, RecommendationAuthor };
