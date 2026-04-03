'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';
import { PORTFOLIO_MOCK } from '@/app/product/[id]/mocks/mock';
import { useGetPortfolioList } from '@/app/product/[id]/api';

type PortfolioListSectionProps = {
  productId: number;
};

export default function PortfolioListSection({ productId }: PortfolioListSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, fetchNextPage, hasNextPage } = useGetPortfolioList(productId);
  const { ref, inView } = useInView();

  // TODO: API 구현 완료되면 주석 풀기
  // const portfolioList = data?.pages.flatMap((page) => page.data?.portfolios ?? []) ?? [];
  const portfolioList = PORTFOLIO_MOCK.portfolios.map(({ imageUrl, ...rest }) => ({
    ...rest,
    image: { src: imageUrl, alt: '' }
  }));

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

  return (
    <section>
      <PortfolioList portfolios={portfolioList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}
