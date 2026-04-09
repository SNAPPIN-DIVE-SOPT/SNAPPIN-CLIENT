import { cn } from '@snappin/design-system/lib';

type ProductFrameListSkeletonProps = {
  length?: number;
  className?: string;
};

export function ProductFrameSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='relative'>
        <div className='bg-black-3 h-[18.4rem] w-full' />
        <div className='absolute right-0 bottom-0 z-10 flex items-center p-[1rem]'>
          <div className='bg-black-4 h-[2rem] w-[2rem] shrink-0 rounded-[0.5rem]' />
        </div>
      </div>
      <div className='flex w-full flex-col items-start p-[1.2rem]'>
        <div className='mb-[0.8rem] flex w-full flex-col gap-[0.4rem]'>
          <div className='bg-black-4 h-[1.3rem] w-[68%]' />
          <div className='bg-black-4 h-[1.7rem] w-[42%]' />
        </div>
        <div className='mb-[0.7rem] flex w-full items-center gap-[0.2rem]'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='bg-black-4 h-[1.8rem] w-[3.6rem] rounded-[0.3rem]' />
          ))}
        </div>
        <div className='bg-black-4 h-[1.1rem] w-[78%]' />
      </div>
    </div>
  );
}

export default function ProductFrameListSkeleton({
  length = 6,
  className,
}: ProductFrameListSkeletonProps) {
  return (
    <div className={cn('grid w-full grid-cols-2 gap-[0.2rem]', className)}>
      {Array.from({ length }).map((_, index) => (
        <ProductFrameSkeleton key={index} />
      ))}
    </div>
  );
}
