import { PortfolioList } from '@/ui';
import { PORTFOLIO_LIST_MOCK } from '../mock';

type PortfolioListSectionProps = {
  productId: string;
}

export default function PortfolioListSection({ productId }: PortfolioListSectionProps) {
  // TODO: 포폴 목록 조회 API 연동 (request에 productId, cursor 전달)
  const portfolioListMock = PORTFOLIO_LIST_MOCK.data;

  return (
    <section>
      {portfolioListMock.portfolios.length === 0
        ?
          <div className='flex justify-center items-center py-[8rem]'>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>포트폴리오를 등록하지 않았어요
            </span>
          </div>
        : <PortfolioList portfolioList={portfolioListMock.portfolios} />
      }
    </section>
  );
}