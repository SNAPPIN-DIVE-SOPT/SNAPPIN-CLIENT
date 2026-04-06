'use client';

import { PORTFOLIO_MOCK } from '@/app/product/[id]/mocks/mock';
import type { PortfolioFrameProps } from '@/ui/frame/portfolio/PortfolioFrame';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';
/*import { useSearchParams } from 'next/navigation';*/
/*import { useMemo, useRef } from 'react';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { toExploreSearchParams } from '@/app/(with-layout)/explore/utils/query';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useGetPortfolioList } from '@/app/(with-layout)/explore/api';*/

const toPortfolioFrameProps = (
  portfolios: typeof PORTFOLIO_MOCK.portfolios = [],
): PortfolioFrameProps[] => {
  return portfolios.map(({ imageUrl, ...portfolio }) => ({
    ...portfolio,
    image: {
      src: imageUrl,
      alt: `포트폴리오 이미지 ${portfolio.id}`,
    },
  }));
};

export default function PortfolioListSection() {
  /*const sp = useSearchParams();*/
  /*const scrollKey = useMemo(() => {
    const allowed = toExploreSearchParams(new URLSearchParams(sp.toString()));
    // 키 순서를 완전히 고정해 같은 조건이면 항상 동일한 storage key를 만든다.
    allowed.delete('tab');
    const normalized = new URLSearchParams();
    normalized.set('tab', 'PORTFOLIO');
    allowed.forEach((value, key) => normalized.append(key, value));
    return `explore:portfolio:scroll?${normalized.toString()}`;
  }, [sp]);*/
  const portfolioList = toPortfolioFrameProps(PORTFOLIO_MOCK.portfolios);

  /*const query = useGetPortfolioList(new URLSearchParams(sp.toString()));

  const portfolios = useMemo(() => {
    return query.data.pages.flatMap((page) => page.data?.portfolios ?? []);
  }, [query.data.pages]);

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
*/
  const isPortfolioListEmpty = portfolioList.length === 0;
  console.log('portfolioList', portfolioList);

  if (isPortfolioListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );

  return (
    <section className='py-[0.2rem]'>
      {/*<div ref={anchorRef} />*/}
      <PortfolioList portfolios={portfolioList} />

      {/*<div ref={sentinelRef} className='h-[1px]' />*/}

      {/*{query.isFetchingNextPage ? <PortfolioListSkeleton length={3} /> : null}*/}
    </section>
  );
}
