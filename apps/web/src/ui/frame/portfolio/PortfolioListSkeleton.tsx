import { cn } from '@snappin/design-system/lib';

type PortfolioFrameListSkeletonProps = {
  length?: number;
  className?: string;
};

export function PortfolioFrameSkeleton() {
  return (
    <div className='relative overflow-hidden'>
      <div className='bg-black-3 h-[26.6rem] w-full' />
      <div className='absolute right-0 bottom-0 flex w-full flex-col items-end gap-[0.8rem] p-[1.2rem]'>
        <div className='bg-black-4 h-[2rem] w-[2.4rem] shrink-0 rounded-[0.5rem]' />
      </div>
    </div>
  );
}

export default function PortfolioFrameListSkeleton({
  length = 6,
  className,
}: PortfolioFrameListSkeletonProps) {
  return (
    <div className={cn('grid w-full grid-cols-2 gap-[0.2rem]', className)}>
      {Array.from({ length }).map((_, index) => (
        <PortfolioFrameSkeleton key={index} />
      ))}
    </div>
  );
}
