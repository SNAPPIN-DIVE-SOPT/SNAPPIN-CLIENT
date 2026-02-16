import { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import productPlaceholder from '@/../public/imgs/image-default.png';

type ProductListProps = {
  portfolioList: { id?: number; imageUrl?: string }[];
};

function PortfolioList({
  portfolioList,
  className,
  ...props
}: ProductListProps & React.HTMLAttributes<HTMLDivElement>) {
  const uniquePortfolioList = useMemo(() => {
    const seenPortfolioIds = new Set<number>();
    return portfolioList.filter((portfolio) => {
      if (portfolio.id == null) return false;
      if (seenPortfolioIds.has(portfolio.id)) return false;
      seenPortfolioIds.add(portfolio.id);
      return true;
    });
  }, [portfolioList]);

  return (
    <div
      className={cn(
        'grid shrink-0 grid-cols-3 gap-[0.2rem] overflow-hidden rounded-[0.4rem]',
        className,
      )}
      {...props}
    >
      {uniquePortfolioList.map((portfolio, idx) => (
        <Link
          href={`/portfolio/${portfolio.id}`}
          key={portfolio.id}
          className='relative aspect-square'
        >
          <Image
            fetchPriority={idx < 6 ? 'high' : 'auto'}
            loading={idx < 6 ? 'eager' : 'lazy'}
            src={portfolio.imageUrl ?? productPlaceholder}
            fill
            alt={`portfolio ${portfolio.id}`}
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            className='object-cover'
          />
        </Link>
      ))}
    </div>
  );
}

export default memo(PortfolioList);
