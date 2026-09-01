import { cn } from '@snappin/design-system/lib';

type ProductCardSkeletonProps = {
  className?: string;
};

export function CardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('bg-black-1 flex flex-col gap-[1.6rem] px-[1.8rem] py-[1.4rem]', className)}>
      <div className='bg-black-1 flex flex-col items-start justify-center gap-[1rem] self-stretch'>
        <div className='flex w-full gap-[1rem]'>
          <div className='bg-black-3 relative h-[9rem] w-[9rem] rounded-[0.4rem]' />
          <div className='flex min-w-0 flex-col gap-[0.8rem]'>
            <div className='text-black-10 flex flex-col gap-[0.4rem]'>
              <div className='bg-black-3 relative h-[1.3rem] w-[14rem] rounded-[0.4rem]' />
              <div className='bg-black-3 relative h-[2.1rem] w-[8rem] rounded-[0.4rem]' />
            </div>
            <div className='flex flex-col gap-[0.8rem]'>
              <div className='bg-black-3 relative h-[1.9rem] w-[12rem] rounded-[0.4rem]' />
              <div className='bg-black-3 relative h-[1.4rem] w-[10rem] rounded-[0.4rem]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
