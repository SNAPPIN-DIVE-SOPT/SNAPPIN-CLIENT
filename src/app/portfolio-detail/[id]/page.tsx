'use client';

import { Divider } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { AuthorSection, PortfolioSection, ProductSection } from './_section/index';
import { Header } from './components/index';
import { PORTFOLIO_DETAIL_MOCK } from './mock/portfolioDetail.mock';
import { useNavVisibility } from '@/hooks/useNavVisibility';

type PageProps = {
  params: {
    id: string;
  }
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  const { isVisible } = useNavVisibility();

  // TODO: 포폴 상세 조회 API 연동 (request에 id 전달)
  const mock = PORTFOLIO_DETAIL_MOCK;
  const portfolioImages = mock.images.map((image, idx) => ({ src: image, alt: `${mock.description} 포트폴리오 이미지 ${idx}` }));
  const productImage = { src: mock.productInfo.imageUrl, alt: `${mock.productInfo.title} 상품 이미지`};

  return (
    <div className='mb-[8.4rem]'>
      <Header isVisible={isVisible} />
      <PortfolioSection
        id={mock.id}
        description={mock.description}
        images={portfolioImages}
        initialIsLiked={mock.isLiked}
        initialLikeCount={mock.likeCount}
        snapCategory={mock.snapCategory}
        place={mock.place}
        startsAt={mock.shootingTime.startsAt}
        moods={mock.moods as MoodCode[]}
      />
      <Divider thickness='large' color='bg-black-3' />
      <AuthorSection
        id={mock.photographerInfo.id}
        name={mock.photographerInfo.name}
        bio={mock.photographerInfo.bio}
        specialties={mock.photographerInfo.specialties}
        locations={mock.photographerInfo.locations}
      />
      <Divider thickness='large' color='bg-black-3' />
      <ProductSection
        id={mock.productInfo.id}
        image={productImage}
        name={mock.productInfo.title}
        rating={mock.productInfo.rate}
        reviewCount={mock.productInfo.reviewCount}
        author={mock.productInfo.photographer}
        price={mock.productInfo.price}
        tags={mock.productInfo.moods as MoodCode[]}
      />
    </div>
  );
}