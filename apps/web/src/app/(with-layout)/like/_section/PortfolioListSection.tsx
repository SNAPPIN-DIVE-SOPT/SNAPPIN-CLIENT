'use client';

import { useRef } from 'react';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';
import { type PortfolioFrameProps } from '@/ui/frame/portfolio/PortfolioFrame';
import { useGetLikePortfolios } from '@/app/(with-layout)/like/api';
import { LIKE_SCROLL_KEY } from '@/app/(with-layout)/like/constants/scroll';

const toPortfolioFrameProps = (
  portfolios: { id?: number; imageUrl?: string; likeCount?: number }[] = [],
): PortfolioFrameProps[] => {
  return portfolios.map((portfolio) => ({
    id: portfolio.id ?? 0,
    isLiked: true,
    likesCount: portfolio.likeCount ?? 0,
    image: {
      src: portfolio.imageUrl || '/imgs/default-image.png',
      alt: `작가 포트폴리오 ${portfolio.id ?? 0}`,
    },
  }));
};

export default function PortfolioListSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, dataUpdatedAt } =
    useGetLikePortfolios();
  const portfolioList = toPortfolioFrameProps(
    data.pages.flatMap((page) => page.data?.portfolios ?? []),
  );
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const anchorRef = useRef<HTMLDivElement | null>(null);

  useScrollRestoreOnParent(
    anchorRef,
    LIKE_SCROLL_KEY.PORTFOLIO,
    [portfolioList.length, dataUpdatedAt],
    {
      enabled: !!data,
      resetOnKeyChange: true,
    },
  );

  if (portfolioList.length === 0) return <LikeEmpty tab='PORTFOLIO' />;

  return (
    <section>
      <div ref={anchorRef} />
      <PortfolioList portfolios={portfolioList} />
      <div ref={sentinelRef} className='h-[0.1rem]' />
    </section>
  );
}
