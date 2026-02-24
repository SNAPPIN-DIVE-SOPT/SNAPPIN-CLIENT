'use client';

import { useRef, useMemo } from 'react';
import { Divider } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import PortfolioDetailSkeleton from './PortfolioDetailSkeleton';
import { PhotographerSection, PortfolioSection, ProductSection } from '../../_section/index';
import { useGetPortfolioDetail } from '../../api';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { ROUTES } from '@/constants/routes/routes';

type PortfolioDetailContentProps = {
  id: number;
  isLogIn: boolean;
}

export default function PortfolioDetailContent({ id, isLogIn }: PortfolioDetailContentProps) {
  const { data, isPending } = useGetPortfolioDetail(id, isLogIn);
  const portfolioImages = data?.images?.map((image) => ({
    src: image,
    alt: data?.description ?? '',
  }));
  const productImage = {
    src: data?.productInfo?.imageUrl ?? '',
    alt: data?.productInfo?.title ?? '',
  };

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => `${ROUTES.PORTFOLIO(id).replace(/^\//, '')}:scroll`, [id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [data], { enabled: !!data });

  if (isPending) {
    return <PortfolioDetailSkeleton />;
  }

  return (
    <>
      <div ref={anchorRef} />
      <PortfolioSection
        id={data?.id ?? 0}
        description={data?.description ?? ''}
        images={portfolioImages ?? []}
        isLiked={data?.isLiked ?? false}
        likeCount={data?.likeCount ?? 0}
        snapCategory={data?.snapCategory ?? ''}
        place={data?.place ?? ''}
        startsAt={data?.startsAt ?? ''}
        moods={data?.moods as MoodCode[]}
      />
      <Divider thickness='large' color='bg-black-3' />
      <PhotographerSection
        id={data?.photographerInfo?.id ?? 0}
        name={data?.photographerInfo?.name ?? ''}
        imageUrl={data?.photographerInfo?.imageUrl ?? ''}
        bio={data?.photographerInfo?.bio ?? ''}
        specialties={data?.photographerInfo?.specialties ?? []}
        locations={data?.photographerInfo?.locations ?? []}
      />
      <Divider thickness='large' color='bg-black-3' />
      <ProductSection
        id={data?.productInfo?.id ?? 0}
        image={productImage}
        name={data?.productInfo?.title ?? ''}
        rate={data?.productInfo?.rate ?? 0}
        reviewCount={data?.productInfo?.reviewCount ?? 0}
        photographer={data?.productInfo?.photographer ?? ''}
        price={data?.productInfo?.price ?? 0}
        moods={data?.productInfo?.moods ?? []}
      />
    </>
  );
}
