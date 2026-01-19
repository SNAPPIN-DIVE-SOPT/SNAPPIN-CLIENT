import { PortfolioList } from '@/ui';
import { useGetLikePortfolios } from '@/app/(with-layout)/like/api';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import PortfolioListSkeleton from '@/ui/skeletone/portfolio/PortfolioListSkeleton';


export default function PortfolioListSection() {
  const { data: likedPortfolios,isPending } = useGetLikePortfolios();
  console.log(isPending);
  
  if (isPending) return <PortfolioListSkeleton />;

  if (!likedPortfolios || likedPortfolios.portfolios?.length === 0) return <LikeEmpty tab='PORTFOLIO' />;
  return (
    <section className='px-[1rem] py-[1rem]'>
      <PortfolioList portfolioList={likedPortfolios.portfolios ?? []} />
    </section>
  );
}
