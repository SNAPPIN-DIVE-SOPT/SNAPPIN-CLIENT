'use client';

import { useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortfolioList, PortfolioListSkeleton } from '@/ui';
import { useGetPortfolioList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { pickAllowedParams } from '@/app/(with-layout)/explore/utils/query';

export default function PortfolioListSection() {
  const sp = useSearchParams();
  const scrollKey = useMemo(() => {
    const allowed = pickAllowedParams(new URLSearchParams(sp.toString()));
    // 키 순서를 완전히 고정해 같은 조건이면 항상 동일한 storage key를 만든다.
    allowed.delete('tab');
    const normalized = new URLSearchParams();
    normalized.set('tab', 'PORTFOLIO');
    allowed.forEach((value, key) => normalized.append(key, value));
    return `explore:portfolio:scroll?${normalized.toString()}`;
  }, [sp]);
  const query = useGetPortfolioList(new URLSearchParams(sp.toString()));

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
      <div ref={anchorRef} />
      <PortfolioList portfolioList={portfolios} />

      <div ref={sentinelRef} className='h-[1px]' />

      {query.isFetchingNextPage ? <PortfolioListSkeleton length={3} /> : null}
    </section>
  );
}
