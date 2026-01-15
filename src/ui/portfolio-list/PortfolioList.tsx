import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';

type ProductListProps = {
  portfolioList: { id: number; imageUrl: string }[];
};

export default function PortfolioList({
  portfolioList,
  className,
  ...props
}: ProductListProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('grid shrink-0 grid-cols-3 gap-[0.2rem]', className)} {...props}>
      {portfolioList.map((portfolio) => (
        <Link
          href={`/portfolio-detail/${portfolio.id}`}
          key={portfolio.id}
          className='relative aspect-square'
        >
          <Image
            src={portfolio.imageUrl}
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
