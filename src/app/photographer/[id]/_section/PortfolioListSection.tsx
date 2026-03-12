'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { PortfolioList } from '@/ui';
import { useGetPortfolioList } from '../api';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { ROUTES } from '@/constants/routes/routes';

type PortfolioListSectionProps = {
  id: number;
}

export default function PortfolioListSection({ id }: PortfolioListSectionProps) {
  const { data, fetchNextPage, hasNextPage, dataUpdatedAt } = useGetPortfolioList(id);
  const { ref, inView } = useInView();

  const portfolioList = useMemo(() => {
    return data?.pages.flatMap(page => page.data?.portfolios ?? []) ?? [];
  }, [data?.pages]);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => {
    return ROUTES.PHOTOGRAPHER(id, { tab: 'PORTFOLIO' })
      .replace(/^\//, '')
      .replace('?', ':scroll?');
  }, [id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolioList.length, dataUpdatedAt], {
    enabled: !!data,
    resetOnKeyChange: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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