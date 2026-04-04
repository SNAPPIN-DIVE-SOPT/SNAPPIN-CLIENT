'use client';

import { useRef } from 'react';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { PORTFOLIO_MOCK } from '@/app/product/[id]/mocks/mock';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';
import { type PortfolioFrameProps } from '@/ui/frame/portfolio/PortfolioFrame';

const toPortfolioFrameProps = (
  portfolios: typeof PORTFOLIO_MOCK.portfolios = [],
): PortfolioFrameProps[] => {
  return portfolios.map(({ imageUrl, ...portfolio }) => ({
    ...portfolio,
    image: {
      src: imageUrl,
      alt: `포트폴리오 이미지 ${portfolio.id}`,
    },
  }));
};

export default function PortfolioListSection() {
  /*const { data: likedPortfolios } = useGetLikePortfolios();*/
  const portfolioList = toPortfolioFrameProps(PORTFOLIO_MOCK.portfolios);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = 'like:portfolio:scroll';
  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolioList.length], {
    enabled: true,
    resetOnKeyChange: true,
  });

  if (portfolioList.length === 0) return <LikeEmpty tab='PORTFOLIO' />;

  return (
    <section>
      <div ref={anchorRef} />
      <PortfolioList portfolios={portfolioList} />
    </section>
  );
}
