'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PortfolioList } from '@/ui/portfolio-list';
import { useGetPortfolioList } from '../api';

type PortfolioListSectionProps = {
  productId: number;
};

export default function PortfolioListSection({ productId }: PortfolioListSectionProps) {
  const { data, fetchNextPage, hasNextPage } = useGetPortfolioList(productId);
  const { ref, inView } = useInView();

  const portfolioList = data?.pages.flatMap((page) => page.data?.portfolios ?? []) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (portfolioList.length === 0) {
    return (
      <section>
        <div className='flex items-center justify-center pt-[8rem] pb-[15.8rem]'>
          <span className='caption-14-rg text-black-6 text-center'>
            아직 작가님이
            <br />
            포트폴리오를 등록하지 않았어요
          </span>
        </div>
      </section>
    );
  }

  // TODO: PortfolioFrameList로 교체
  return (
    <section>
      <PortfolioList portfolioList={portfolioList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}
