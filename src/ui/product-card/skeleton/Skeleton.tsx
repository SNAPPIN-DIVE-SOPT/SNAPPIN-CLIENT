import { Divider } from '@/ui';
import { cn } from '@/utils/cn';
import { DividerSize } from '@/ui/divider/type/variant';

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
    <div className={cn('bg-black-1 flex w-full gap-[1.2rem] px-[2rem] py-[1.6rem]', className)}>
      <div className='bg-black-3 relative h-[10.2rem] w-[10.2rem] shrink-0' />
      <div className='flex flex-col justify-between'>
        <div className='flex w-full flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[1.7rem] w-full' />
          <div className='bg-black-3 h-[1.4rem] w-[12.7rem]' />
          <div className='bg-black-3 h-[1.4rem] w-[7.4rem]' />
        </div>
        <div className='bg-black-3 h-[2.2rem] w-[10.1rem]' />
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
