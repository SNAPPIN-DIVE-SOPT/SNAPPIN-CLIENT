import PortfolioFrame, { type PortfolioFrameProps } from './PortfolioFrame';

export default function PortfolioList({ portfolios }: { portfolios: PortfolioFrameProps[] }) {
  return (
    <div className='grid w-full grid-cols-2 gap-[0.2rem]'>
      {portfolios.map((portfolio) => (
        <PortfolioFrame key={portfolio.id} {...portfolio} width='100%' />
      ))}
    </div>
  );
}
