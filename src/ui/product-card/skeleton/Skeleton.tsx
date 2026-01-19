import { cn } from '@/utils/cn';

type PortfolioListSkeletonProps = {
  length?: number;
};

type ProductCardSkeletonProps = {
  className?: string;
};

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('flex gap-[1.2rem] w-full', className)}>
      <div className='shrink-0 relative w-[10.2rem] h-[10.2rem] bg-black-3' />
      <div className='flex flex-col justify-between'>
        <div className='flex w-full flex-col gap-[0.4rem]'>
          <div className='w-full h-[1.7rem] bg-black-3' />
          <div className='w-[12.7rem] h-[1.4rem] bg-black-3' />
          <div className='w-[7.4rem] h-[1.4rem] bg-black-3' />
        </div>
        <div className='w-[10.1rem] h-[2.2rem] bg-black-3' />
      </div>
    </div>
  );
}

export function PortfolioListSkeleton({ length = 15 }: PortfolioListSkeletonProps) {
  return (
    <div className='grid grid-cols-3 gap-[0.2rem]'>
      {Array.from({ length: length }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
