'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { GetPortfolioCardResponseV2 } from '@/swagger-api';
import { useGetPortfolioList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { toExploreSearchParams } from '@/app/(with-layout)/explore/utils/query';
import { useAuth } from '@/auth/hooks/useAuth';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import type { PortfolioFrameProps } from '@/ui/frame/portfolio/PortfolioFrame';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';

const toPortfolioFrameProps = (
  portfolios: GetPortfolioCardResponseV2[] = [],
): PortfolioFrameProps[] => {
  return portfolios
    .filter((portfolio): portfolio is GetPortfolioCardResponseV2 & { id: number } => portfolio.id != null)
    .map((portfolio) => ({
      id: portfolio.id,
      isLiked: portfolio.isLiked ?? false,
      likesCount: portfolio.likeCount ?? 0,
      image: {
        src: portfolio.imageUrl || '/imgs/default-image.png',
        alt: `포트폴리오 이미지 ${portfolio.id}`,
      },
    }));
};

export default function PortfolioListSection() {
  const { isLogIn } = useAuth();
  const sp = useSearchParams();

  if (isLogIn === null) return null;

  return <PortfolioListSectionContent isLogIn={isLogIn} searchParams={sp.toString()} />;
}

function PortfolioListSectionContent({
  isLogIn,
  searchParams,
}: {
  isLogIn: boolean;
  searchParams: string;
}) {
  const scrollKey = useMemo(() => {
    const allowed = toExploreSearchParams(new URLSearchParams(searchParams));

    allowed.delete('tab');

    const normalized = new URLSearchParams();
    normalized.set('tab', 'PORTFOLIO');
    allowed.forEach((value, key) => normalized.append(key, value));

    return `explore:portfolio:scroll?${normalized.toString()}`;
  }, [searchParams]);
  const query = useGetPortfolioList(new URLSearchParams(searchParams), isLogIn);
  const portfolios = useMemo(() => {
    return query.data.pages.flatMap((page) => page.data?.portfolios ?? []);
  }, [query.data.pages]);
  const portfolioList = toPortfolioFrameProps(portfolios);
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    onLoadMore: query.fetchNextPage,
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolios.length, query.dataUpdatedAt], {
    enabled: true,
    resetOnKeyChange: true,
  });

  if (portfolioList.length === 0) {
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );
  }

  return (
    <section className='py-[0.2rem]'>
      <div ref={anchorRef} />
      <PortfolioList portfolios={portfolioList} />
      <div ref={sentinelRef} className='h-[1px]' />
    </section>
  );
}
