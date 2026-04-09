import { Divider } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';

type DividerSize = 'small' | 'large';

type ProductListSkeletonProps = {
  length?: number;
  className?: string;
  thickness?: DividerSize;
};

type ProductCardSkeletonProps = {
  className?: string;
};

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('bg-black-1 flex flex-col gap-[1.6rem] px-[1.8rem] py-[1.4rem]', className)}>
      <div className='bg-black-1 flex flex-col items-start justify-center gap-[1rem] self-stretch'>
        <div className='flex gap-[1rem] w-full'>
          <div className='bg-black-3 relative w-[9rem] h-[9rem] rounded-[0.4rem]' />
          <div className='flex flex-col gap-[0.8rem] min-w-0'>
            <div className='flex flex-col gap-[0.4rem] text-black-10'>
              <div className='bg-black-3 relative w-[14rem] h-[1.3rem] rounded-[0.4rem]' />
              <div className='bg-black-3 relative w-[8rem] h-[2.1rem] rounded-[0.4rem]' />
            </div>
            <div className='flex flex-col gap-[0.8rem]'>
              <div className='bg-black-3 relative w-[12rem] h-[1.9rem] rounded-[0.4rem]' />
              <div className='bg-black-3 relative w-[10rem] h-[1.4rem] rounded-[0.4rem]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductListSkeleton({
  length = 15,
  className,
  thickness = 'large',
}: ProductListSkeletonProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {Array.from({ length: length }).map((_, i) => (
        <div key={i} className='flex flex-col'>
          <ProductCardSkeleton />
          {i < length - 1 && (
            <Divider thickness={thickness} color='bg-black-3' className='w-full' />
          )}
        </div>
      ))}
    </div>
  );
}
