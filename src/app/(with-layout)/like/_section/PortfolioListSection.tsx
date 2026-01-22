import { PortfolioList } from '@/ui';
import { useGetLikePortfolios } from '@/app/(with-layout)/like/api';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { useRef } from 'react';

export default function PortfolioListSection() {
  const { data: likedPortfolios } = useGetLikePortfolios();

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = 'like:portfolio:scroll';
  useScrollRestoreOnParent(anchorRef, scrollKey, [likedPortfolios.portfolios?.length], {
    enabled: true,
  });

  if (!likedPortfolios || likedPortfolios.portfolios?.length === 0)
    return <LikeEmpty tab='PORTFOLIO' />;

  return (
    <section className='px-[1rem] py-[1rem]'>
      <div ref={anchorRef} />
      <PortfolioList portfolioList={likedPortfolios.portfolios ?? []} />
    </section>
  );
}
