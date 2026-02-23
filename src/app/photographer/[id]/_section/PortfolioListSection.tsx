'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { PortfolioList, PortfolioListSkeleton } from '@/ui';
import { useGetPortfolioList } from '../api';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

type PortfolioListSectionProps = {
  id: string;
}

export default function PortfolioListSection({ id }: PortfolioListSectionProps) {
  const { data, isPending, fetchNextPage, hasNextPage, dataUpdatedAt } = useGetPortfolioList(id);
  const { ref, inView } = useInView();

  const portfolioList = useMemo(() => {
    return data?.pages.flatMap(page => page.data?.portfolios ?? []) ?? [];
  }, [data?.pages]);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const scrollKey = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('tab', 'PORTFOLIO');
    return `photographer/${id}:scroll?${sp.toString()}`;
  }, [searchParams, id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolioList.length, dataUpdatedAt], {
    enabled: true,
    resetOnKeyChange: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <section className='mt-[17.1rem]'>
        <PortfolioListSkeleton />
      </section>
    );
  };

  if (portfolioList.length === 0) {
    return (
      <section>
        <div className='flex justify-center items-center min-h-[calc(100dvh-9.5rem-7.2rem)]'>
          <span className='caption-14-rg text-black-6 text-center'>
            아직 작가님이<br/>포트폴리오를 등록하지 않았어요
          </span>
        </div>
      </section>
    );
  };

  return (
    <section className='mt-[17.1rem]'>
      <div ref={anchorRef} />
      <PortfolioList portfolioList={portfolioList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}