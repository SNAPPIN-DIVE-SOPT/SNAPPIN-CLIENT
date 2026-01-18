import { PortfolioList } from '@/ui';
import { MOCK_PORTFOLIOS } from '@/app/(with-layout)/like/mocks/portfolio';

export default function PortfolioListSection() {
  /* todo: 비 로그인 시 엠프티뷰 처리 */
  const isPortfolioListEmpty = MOCK_PORTFOLIOS.length === 0;

  if (isPortfolioListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>좋아요를 누른 포트폴리오가 없어요</h3>
        <span className='caption-14-md text-black-6'>
          &#39;탐색&#39;에서 다양한 포트폴리오를 확인해보세요
        </span>
      </section>
    );

  return (
    <section className='px-[1rem] py-[1rem]'>
      <PortfolioList portfolioList={MOCK_PORTFOLIOS} />
    </section>
  );
}
