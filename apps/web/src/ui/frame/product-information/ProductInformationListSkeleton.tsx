import { cn } from '@snappin/design-system/lib';

type ProductInformationFrameListSkeletonProps = {
  length?: number;
  className?: string;
};

export function ProductInformationFrameSkeleton() {
  return (
    <div className='relative overflow-hidden'>
      <div className='bg-black-3 h-[26.6rem] w-full' />
      <div className='absolute right-0 bottom-0 flex w-full flex-col items-center gap-[0.8rem] p-[1.2rem]'>
        <div className='flex w-full flex-col gap-[0.4rem]'>
          <div className='bg-black-4 h-[1.3rem] w-[70%]' />
          <div className='bg-black-4 h-[1.7rem] w-[45%]' />
        </div>
        <div className='flex w-full items-center justify-between gap-[0.8rem]'>
          <div className='bg-black-4 h-[2rem] w-[65%]' />
          <div className='bg-black-4 h-[2rem] w-[2.4rem] shrink-0 rounded-[0.5rem]' />
        </div>
      </div>
    </div>
  );
}

export default function ProductInformationFrameListSkeleton({
  length = 6,
  className,
}: ProductInformationFrameListSkeletonProps) {
  return (
    <div className={cn('grid w-full grid-cols-2 gap-[0.2rem]', className)}>
      {Array.from({ length }).map((_, index) => (
        <ProductInformationFrameSkeleton key={index} />
      ))}
    </div>
  );
}
