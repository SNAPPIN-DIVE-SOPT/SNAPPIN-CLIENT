import { PortfolioList } from '@/ui';

type PortfolioListSectionProps = {
  portfolios: { id: number, imageUrl: string }[];
}

export default function PortfolioListSection({ portfolios }: PortfolioListSectionProps) {
  return (
    <section>
      {portfolios.length === 0
        ? <div className='flex justify-center items-center min-h-[calc(100vh-29.9rem)] '>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>포트폴리오를 등록하지 않았어요
            </span>
          </div>
        : <PortfolioList portfolioList={portfolios} />
      }
      </section>
  );
}