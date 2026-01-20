import { MOCK_PORTFOLIOS } from '@/app/(with-layout)/explore/mocks/portfolio';
import { PortfolioList } from '@/ui';

export default function PortfolioListSection() {
  const isPortfolioListEmpty = MOCK_PORTFOLIOS.length === 0;

  if (isPortfolioListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );

  return (
    <section className='px-[1rem] py-[1rem]'>
      <PortfolioList portfolioList={MOCK_PORTFOLIOS} />
    </section>
  );
}
