import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PortfolioList, PortfolioListSkeleton } from '@/ui';
import { useGetPortfolioList } from '../api';

type PortfolioListSectionProps = {
  id: number;
}

export default function PortfolioListSection({ id }: PortfolioListSectionProps) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetPortfolioList(Number(id));
  const { ref, inView } = useInView();

  const portfolioList = data?.pages.flatMap(page => page.data?.portfolios ?? []) ?? [];
  const isEmpty = portfolioList.length === 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isFetching && isEmpty) {
    return (
      <section className='mt-[4.6rem]'>
        <PortfolioListSkeleton />
      </section>
    );
  };

  if (isEmpty) {
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
      <PortfolioList portfolioList={portfolioList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}