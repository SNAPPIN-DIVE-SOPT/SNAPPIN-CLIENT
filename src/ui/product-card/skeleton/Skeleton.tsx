import { Divider } from '@/ui';
import { cn } from '@/utils/cn';

type ProductListSkeletonProps = {
  length?: number;
};

type ProductCardSkeletonProps = {
  className?: string;
};

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('flex gap-[1.2rem] w-full bg-black-1 px-[2rem] py-[1.6rem]', className)}>
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

export function ProductListSkeleton({ length = 15 }: ProductListSkeletonProps) {
  return (
    <div className='flex flex-col'>
      {Array.from({ length: length }).map((_, i) => (
       <div key={i} className='flex flex-col'>
        <ProductCardSkeleton/>
        {i < length - 1 && <Divider thickness='large' color='bg-black-3' className='w-full' />}
      </div>   
    ))}
    </div>
  );
}
