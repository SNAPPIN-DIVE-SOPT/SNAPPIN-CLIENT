import { cn } from '@/utils/cn';

type PortfolioSkeletonProps = {
  length?: number;
  className?: string;
};

export function PortfolioSkeleton() {
  return <div className='bg-black-3 aspect-square min-h-[11.2rem] min-w-[11.2rem] shrink-0' />;
}

export function PortfolioListSkeleton({ length = 15, className }: PortfolioSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-3 items-center justify-center gap-[0.2rem]', className)}>
      {Array.from({ length: length }).map((_, i) => (
        <PortfolioSkeleton key={i} />
      ))}
    </div>
  );
}
