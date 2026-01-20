import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortfolioListSkeleton } from '@/ui';
import { useGetPortfolioList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';

const PortfolioList = dynamic(() => import('@/ui/portfolio-list/PortfolioList'), { ssr: false });

export default function PortfolioListSection() {
  const sq = useSearchParams();
  const query = useGetPortfolioList(new URLSearchParams(sq.toString()));

  const portfolios = useMemo(() => {
    return query.data.pages.flatMap((page) => page.data?.portfolios ?? []);
  }, [query.data.pages]);

  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    onLoadMore: query.fetchNextPage,
  });

  const isPortfolioListEmpty = portfolios.length === 0;

  if (isPortfolioListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );

  return (
    <section className='px-[1rem] py-[1rem]'>
      <PortfolioList portfolioList={portfolios} />

      {/* 다음 페이지 로딩 트리거 */}
      <div ref={sentinelRef} className='h-[1px]' />

      {/* 다음 페이지 로딩 중 표시(선택) */}
      {query.isFetchingNextPage ? <PortfolioListSkeleton length={3} /> : null}
    </section>
  );
}
