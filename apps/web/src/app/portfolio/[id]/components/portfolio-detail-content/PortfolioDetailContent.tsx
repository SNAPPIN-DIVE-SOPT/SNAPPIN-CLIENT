'use client';

import { useRef, useMemo } from 'react';
import { Divider } from '@snappin/design-system';
import { PhotographerSection, PortfolioSection, ProductSection } from '../../_section';
import { useGetPortfolioDetail } from '../../api';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { ROUTES } from '@/constants/routes/routes';
import { MoodCode } from '@snappin/shared/types';

type PortfolioDetailContentProps = {
  id: number;
  isLogIn: boolean;
};

export default function PortfolioDetailContent({ id, isLogIn }: PortfolioDetailContentProps) {
  const { data } = useGetPortfolioDetail(id, isLogIn);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => `${ROUTES.PORTFOLIO(id).replace(/^\//, '')}:scroll`, [id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [data], { enabled: !!data });

  return (
    <>
      <div ref={anchorRef} />
      <PortfolioSection
        id={data?.id ?? 0}
        description={data?.description ?? ''}
        images={data?.images ?? []}
        isLiked={data?.isLiked ?? false}
        likeCount={data?.likeCount ?? 0}
        place={data?.place ?? ''}
        moods={data?.moods as MoodCode[]}
      />
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
        imageUrl={data?.productInfo?.imageUrl ?? ''}
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
