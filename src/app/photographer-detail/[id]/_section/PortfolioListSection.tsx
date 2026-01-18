import { PortfolioList } from '@/ui';
import { PORTFOLIO_LIST_MOCK } from '../mock';

type PortfolioListSectionProps = {
  photographerId: number;
}

export default function PortfolioListSection({ photographerId }: PortfolioListSectionProps) {
  // TODO: 포폴 목록 조회 API 연동 (request에 photographerId, cursor 전달)
  const mock = PORTFOLIO_LIST_MOCK;

  return (
    <section>
      {mock.portfolios.length === 0
        ? <div className='flex justify-center items-center min-h-[calc(100vh-29.9rem)] '>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>포트폴리오를 등록하지 않았어요
            </span>
          </div>
        : <PortfolioList portfolioList={mock.portfolios} />
      }
    </section>
  );
}