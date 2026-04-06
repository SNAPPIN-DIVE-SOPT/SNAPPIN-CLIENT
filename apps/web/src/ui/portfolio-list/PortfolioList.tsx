import { memo, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@snappin/design-system/lib';
import { PortfolioFrame } from '@/ui';

const PRODUCT_PLACEHOLDER = '/imgs/image-default.png';

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
      className={cn('grid shrink-0 grid-cols-2 gap-[0.2rem] overflow-hidden', className)}
      {...props}
    >
      {uniquePortfolioList.map((portfolio) => (
        <Link
          href={`/portfolio/${portfolio.id}`}
          key={portfolio.id}
          className='relative aspect-square'
        >
          <PortfolioFrame
            id={portfolio.id ?? 0}
            image={{
              src: portfolio.imageUrl ?? PRODUCT_PLACEHOLDER,
              alt: `portfolio ${portfolio.id}`,
            }}
            isLiked={false} // api 연동 시 수정
            likesCount={160}
          />
        </Link>
      ))}
    </div>
  );
}

export default memo(PortfolioList);
